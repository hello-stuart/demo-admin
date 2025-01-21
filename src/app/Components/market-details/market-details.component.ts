import { Component, ElementRef, HostListener, Inject, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';
import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ShortNumberPipe } from '../pipes/short-number.pipe';
import { EventsBannerComponent } from "../../theme/svg/all-svgs/events-banner/events-banner.component";
import { CountdownBetStartPipe } from "../pipes/countdown-bet-start.pipe";
import { CountdownPipe } from '../pipes/count-down.pipe';
import { ScorecardsComponent } from './scorecards/scorecards.component';
import { CONFIG } from '../../../../config';
import { ConditionhandlerService } from '../../Services/conditionhandler.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MainService } from '../../services/main.service';

declare var _: any;

@Component({
  selector: 'app-market-details',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, ShortNumberPipe, DecimalPipe, CountdownPipe, NgClass, EventsBannerComponent, CountdownBetStartPipe, ScorecardsComponent,],
  templateUrl: './market-details.component.html',
  styleUrl: './market-details.component.css'
})
export class MarketDetailsComponent {

  opendInfoId: any = [];
  isTabDesk: any
  loader: boolean = true;
  selectedType = 'ODD';
  isStartStream = false;
  isScoreCard = true;
  isScore: any;
  isOPenCard = false;
  sportId: any;
  previousSport: any;
  selectedMarket: any = 'All';
  selectedFancyMarket = 'Popular';
  MarketData: any = [];
  matchOddsData: any = [];
  event_id = "";
  gameName: any;
  runnerPrice: any;
  matchOddsDataUpdated: any;
  bookmakersData: any = [];
  AllMarketList: any = [];
  marketId: any;
  betType: any;
  isValueBetsSlip: any;
  eventid: any;
  isBetsSlipOpened: any = '';
  betplaceObj: any;
  isMobile: any;
  isDesktop: any;
  matchedBetList: any = [];
  matchedOddsPl: any = [];
  FancyPl: any = [];
  SportsbookPl: any = [];
  BookmakersPl: any = [];
  AllFancyMarkets: any = [];
  AllFancyMarketsFiltered: any = [];
  isMuted: boolean = true;
  marketlistFancy: any = [];
  cashoutValue: any = [];
  sportbookSubscription: any;
  fancySubscription: any;
  bookmakerSubscription: any;
  rulesInfo: any;
  fancyBook: any;
  cashOutAPIData: any;
  sportObj: any;
  public intrvlCashOut: number = 0;
  type: any;
  index: any;
  token: string = '';
  previousEventId: string = '';
  subscription!: Subscription;
  clicked: boolean = false;
  streamShowValidation: boolean = true;
  userBalance: any;
  userDetail: any;
  isCollapsed = true;
  showBetslip = false;
  betslipData: any = {};
  sportbookData: any = []
  streamingStatus: any;
  activeTabForStream: any = 'showStats';
  watchLiveAndScoreCard: boolean = false;
  MatchStats: boolean = false;
  isShowWatchTv: boolean = true;
  cbsPL: any = {};
  fancyPl: any = {};
  partnershipFlag: boolean = false;
  plTimeInterval: any;


  constructor(
    @Inject('firebaseProjectCricket') private cricketFirestore: AngularFirestore,
    @Inject('firebaseProjectTennis') private tennisFirestore: AngularFirestore,
    @Inject('firebaseProjectOther') private otherFirestore: AngularFirestore,
    @Inject('firebaseProjectSoccer') private soccerFirestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private backendService: BackendService,
    private conditionhandlerService: ConditionhandlerService,
    private renderer: Renderer2, private elementRef: ElementRef,
    // @Inject('firebaseProjectCricket') private cricketFirestore: AngularFirestore,
    // @Inject('firebaseProjectTennis') private tennisFirestore: AngularFirestore,
    // @Inject('firebaseProjectOther') private otherFirestore: AngularFirestore,
    // @Inject('firebaseProjectSoccer') private soccerFirestore: AngularFirestore,
    private mainService: MainService, private toaster: ToastrService) {

    this.conditionhandlerService.getInnerWidth().subscribe((resp: any) => {
      if (resp < 1200) {
        this.isDesktop = false;
      } else {
        this.isDesktop = true;
      }
    });

    this.route.params.subscribe(params => {
      this.sportId = params['id'];
      this.event_id = params['eventId'];
      this.gameName = params['tournamentName'];
      this.sportObj = {
        event_id: this.event_id,
        sportId: this.sportId,
      }
      if (this.previousSport != this.sportId || this.previousEventId != this.event_id || !params['gameId'] || params['gameId'] != undefined) {
        this.unsubscribeFirebase()
      }
      this.previousSport = this.sportId;
      this.previousEventId = this.event_id;
      this.getMarketList();

      // this.InitialStartupApiCalls();
    });


  }
  ngOnInit(): void {
    this.getfancyMarketList();
    setTimeout(() => {
      this.checkUserForStream();
    }, 1);
    this.token = localStorage.getItem('token') as string;
    localStorage.setItem('lastActiveSport', this.sportId);
    this.conditionhandlerService.getInnerWidth().subscribe((resp: any) => {
      if (resp < 1024) {
        this.isDesktop = false;
      } else {
        this.isDesktop = true;
      }
      if (resp > 668) {
        this.isTabDesk = false;

      } else {
        this.isTabDesk = true;
      }
    });
    this.subscription = this.backendService.getBetPlace().subscribe((data: any) => {

      if (data) {
        this.clicked = false;
        this.loader = data.loader;

        if (data.profitlossCall == true && data.loader == false) {

          this.ProfitLossBalance();
          this.isBetsSlipOpened = '';
        }

        if (data.profitlossCall == false && data.loader == false) {
          this.isBetsSlipOpened = '';
          this.isValueBetsSlip = 0;
        }
      }

    });


  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy() {

    this.unsubscribeFirebase();
    this.subscription.unsubscribe();

  }
  unsubscribeFirebase() {
    if (this.betfairSubscription) {
      this.betfairSubscription.unsubscribe();
    }
    if (this.bookmakerSubscription) {
      this.bookmakerSubscription.unsubscribe()
    }
    if (this.fancySubscription) {
      this.fancySubscription.unsubscribe()
    }
    if (this.sportbookSubscription) {
      this.sportbookSubscription.unsubscribe()
    }
    window.clearInterval(this.plTimeInterval);
  }
  getfancyMarketList() {
    this.mainService.getDataFromServices(CONFIG.fancyMarketList, CONFIG.fancyMarketListTime, { key: CONFIG.siteKey }).subscribe((data: any) => {
      this.marketlistFancy = data.data.fancy;
    });
  }

  betfairSubscription: any;

  getBetfairDataFirebase(projectDynamic?: any) {

    let arry: any[] = [];

    this.betfairSubscription = projectDynamic.collection('Betfair', (ref: any) => ref.where('exEventId', '==', this.event_id))
      .stateChanges()
      .subscribe((changes: any) => {
        changes.forEach((change: any) => {
          const pt: any = change.payload.doc.data();
          const currentid = change.payload.doc.id;

          switch (change.type) {
            case 'added':
              const indexAdded = this.AllMarketList.findIndex((obj: any) => obj.exMarketId === pt.exMarketId);
              if (indexAdded !== -1) {
                this.updateMarketData(this.AllMarketList[indexAdded], pt);
              } else {
                this.AllMarketList.push(pt);
                this.changeOddsMarket(this.selectedMarket, '');
              }
              break;

            case 'modified':
              const indexModified = this.AllMarketList.findIndex((obj: any) => obj.exMarketId === pt.exMarketId);
              if (indexModified !== -1) {
                this.updateMarketData(this.AllMarketList[indexModified], pt);
              }
              break;

            case 'removed':
              this.AllMarketList = this.AllMarketList.filter((fancyMarket: any) => fancyMarket.exMarketId !== pt.exMarketId);
              this.changeOddsMarket(this.selectedMarket, '');
              break;
          }
        });
      });
  }

  getBookmakerDataFirebase(projectDynamic: any) {
    let arry: any[] = [];

    this.bookmakerSubscription = projectDynamic.collection('Bookmakers', (ref: any) => ref.where('exEventId', '==', this.event_id))
      .stateChanges()
      .subscribe((changes: any) => {
        changes.forEach((change: any) => {
          const pt: any = change.payload.doc.data();

          switch (change.type) {
            case 'added':
              const indexAdded = this.findIndexByExMarketId(pt.exMarketId);
              if (indexAdded !== -1) {
                this.updateMarketData(this.AllMarketList[indexAdded], pt);
              } else {
                this.AllMarketList.push(pt);
                this.changeOddsMarket(this.selectedMarket, '');
              }
              break;

            case 'modified':
              const indexModified = this.findIndexByExMarketId(pt.exMarketId);
              if (indexModified !== -1) {
                this.updateMarketData(this.AllMarketList[indexModified], pt);
              }
              break;

            case 'removed':
              this.AllMarketList = this.AllMarketList.filter((market: any) => market.exMarketId !== pt.exMarketId);
              this.changeOddsMarket(this.selectedMarket, '');
              break;
          }
        });
      });
  }
  getFancyDataFirebase(projectDynamic: any) {

    let count = 1;
    this.fancySubscription = projectDynamic.collection('Fancy', (ref: any) => {
      return ref
        .where('exEventId', '==', this.event_id)
        .where('isClosed', '==', 0)
        .orderBy('sequence', 'asc')
    }).stateChanges()
      .subscribe((changes: any) => {
        let count = 1;
        changes.forEach((change: any) => {
          const pt: any = change.payload.doc.data();
          switch (change.type) {
            case 'added':
              if (count === 1) {
                this.closeFancyMarkets();
                count++;
              }
              this.updateOrAddFancyMarket(pt);
              break;
            case 'modified':
              this.updateFancyMarket(pt);
              break;
            case 'removed':
              this.removeFancyMarket(pt);
              break;
          }
        });
      });
  }
  updateMarketData(existingMarket: any, newMarket: any) {
    existingMarket.oddsData.status = newMarket.oddsData.status;
    existingMarket.oddsData.inPlay = newMarket.oddsData.inPlay;
    existingMarket.oddsData.totalMatched = newMarket.oddsData.totalMatched;
    existingMarket.min = newMarket.min;
    existingMarket.max = newMarket.max;
    existingMarket.news = newMarket.news;
    existingMarket.oddsData.runners = newMarket.oddsData.runners;

    if (this.marketId == newMarket.exMarketId &&
      (newMarket?.oddsData?.status !== 'ONLINE' && newMarket?.oddsData?.status !== 'OPEN')) {
      this.isBetsSlipOpened = '';
      this.isValueBetsSlip = 0;
    }
  }
  findIndexByExMarketId(exMarketId: string): number {
    return this.AllMarketList.findIndex((obj: any) => obj.exMarketId === exMarketId);
  }
  closeFancyMarkets() {
    this.AllFancyMarkets.forEach((data: any) => {
      if (data.oddsType === 'FANCY') {
        data.oddsData.status = 'CLOSED';
      }
    });
  }
  updateOrAddFancyMarket(pt: any) {
    const index = this.AllFancyMarkets.findIndex((obj: any) => obj.exMarketId === pt.exMarketId);
    if (index !== -1) {
      this.updateFancyMarketData(this.AllFancyMarkets[index], pt);
    } else {
      this.AllFancyMarkets.push(pt);

    }
    this.changeFancyMarket(this.selectedFancyMarket, true);

  }
  hasStream(data: any) {

    this.isShowWatchTv = data;
  }
  updateFancyMarket(pt: any) {
    this.AllFancyMarkets.forEach((data: any) => {
      if (data.exMarketId === pt.exMarketId) {
        this.updateFancyMarketData(data, pt);
      }
    });
  }
  updateFancyMarketData(existingMarket: any, newMarket: any) {
    existingMarket.oddsData.status = newMarket.oddsData.status;
    existingMarket.oddsData.inPlay = newMarket.oddsData.inPlay;
    existingMarket.oddsData.totalMatched = newMarket.oddsData.totalMatched;
    existingMarket.min = newMarket.min;
    existingMarket.max = newMarket.max;
    existingMarket.news = newMarket.news;
    existingMarket.oddsData = newMarket.oddsData;
    if (this.marketId === newMarket.exMarketId &&
      (newMarket?.oddsData?.status !== 'ONLINE' && newMarket?.oddsData?.status !== 'OPEN')) {
      this.isBetsSlipOpened = '';
      this.isValueBetsSlip = 0;
    }
  }
  removeFancyMarket(pt: any) {
    this.AllFancyMarkets = this.AllFancyMarkets.filter((fancyMarket: any) => fancyMarket.exMarketId !== pt.exMarketId);
    this.changeFancyMarket(this.selectedFancyMarket, true);
  }
  getSportbookDataFirebase(projectDynamic: any) {
    this.sportbookSubscription = projectDynamic.collection('Sportsbook', (ref: any) => {
      return ref
        .where('exEventId', '==', this.event_id)
        .where('isClosed', '==', 0)
    }).stateChanges().subscribe((changes: any) => {
      changes.forEach((change: any) => {
        const pt: any = change.payload.doc.data();
        switch (change.type) {
          case 'added':
            this.updateOrAddFancyMarket(pt);
            break;
          case 'modified':
            this.updateFancyMarket(pt);
            break;
          case 'removed':
            this.removeFancyMarket(pt);
            break;
        }
      });
    });
  }

  getMarketList() {
    // getMarketList
    var req = {
      "eventId": this.event_id,
      "sportId": this.sportId,
      "key": CONFIG.siteKey
    }
    this.backendService.getAllRecordsByPost(CONFIG.getMarketsEventList, req).subscribe((record: any) => {
      this.MarketData = record.data;
      this.isScore = this.MarketData?.isScore;
      this.isOPenCard = this.isScore;
      this.loader = false;
      this.matchOddsData = this.MarketData.matchOddsData;
      this.sportbookData = this.MarketData.sportsbookData;
      if (this.sportId == 1) {
        this.matchOddsData = this.matchOddsData.sort(this.customSortByMarketType)
      }
      this.AllMarketList = [...this.matchOddsData, ...this.MarketData.bookmakersData];
      this.AllFancyMarkets = [...this.MarketData.fancyData, ...this.MarketData.binaryData, ...this.MarketData.sportsbookData];
      this.bookmakersData = this.MarketData.bookmakersData;
      this.AllMarketList.sort((a: any, b: any) => a.sequence - b.sequence);

      let runFirebaseCall = this.AllFancyMarkets.length > 0 || this.AllMarketList.length > 0;

      if (!runFirebaseCall) {
        this.toaster.error('No Markets are active', "Sorry");
        const endpoint = (this.sportId == '7' || this.sportId == '4339') ? CONFIG.racingEventsList : CONFIG.getAllEventsList;
        this.mainService.getDataFromServices(endpoint, -1, { key: CONFIG.siteKey }).subscribe((data: any) => { });
        this.router.navigateByUrl('/');
      } else {
        this.InitialStartupApiCalls();
      }

      this.changeOddsMarket('All', '');
      this.changeFancyMarket('popular', false);

      const token = localStorage.getItem('token');
      if (token) {
        switch (this.sportId) {
          case '4':
            this.getBetfairDataFirebase(this.cricketFirestore);
            this.getBookmakerDataFirebase(this.cricketFirestore);
            this.getFancyDataFirebase(this.cricketFirestore);
            this.getSportbookDataFirebase(this.cricketFirestore);
            break;

          case '2':
            this.getBetfairDataFirebase(this.tennisFirestore);
            this.getBookmakerDataFirebase(this.tennisFirestore);
            this.getFancyDataFirebase(this.tennisFirestore);
            this.getSportbookDataFirebase(this.tennisFirestore);
            break;

          case '1':
            this.getBetfairDataFirebase(this.soccerFirestore);
            this.getBookmakerDataFirebase(this.soccerFirestore);
            this.getFancyDataFirebase(this.soccerFirestore);
            this.getSportbookDataFirebase(this.soccerFirestore);
            break;

          default:
            this.getBetfairDataFirebase(this.otherFirestore);
            this.getBookmakerDataFirebase(this.otherFirestore);
            this.getFancyDataFirebase(this.otherFirestore);
            this.getSportbookDataFirebase(this.otherFirestore);
            break;
        }
        this.storeCBSPlMaster();
        this.storeFancyPlMaster();
        this.plTimeInterval = window.setInterval(() => {
          this.storeCBSPlMaster();
          this.storeFancyPlMaster()
        }, CONFIG.plCallsTime);
      }



    }, (error: any) => {
      this.loader = false;
    })
  }

  customSortByMarketType = (a: any, b: any) => {
    const marketTypeA = a.createdAt.toUpperCase();
    const marketTypeB = b.createdAt.toUpperCase();

    if (marketTypeA < marketTypeB) {
      return -1;
    }
    if (marketTypeA > marketTypeB) {
      return 1;
    }
    return 0;
  };
  callFunctionOnClickNearBottom(thresholdFromBottom: number, callback: () => void) {
    window.addEventListener("click", (event) => {
      if (!this.clicked) {
        const viewportHeight = window.innerHeight;
        const clickY = event.clientY;

        if (viewportHeight - clickY <= thresholdFromBottom) {
          this.clicked = true;
          callback();
        }
      }
    });


    window.addEventListener("touchend", (event) => {
      if (!this.clicked && event && event.touches && event.touches.length > 0) {
        const viewportHeight = window.innerHeight;
        const touchY = event.touches[0].clientY;

        if (viewportHeight - touchY <= thresholdFromBottom) {
          this.clicked = true;
          callback();
        }
      }
    });


  }

  scrollToBetslip() {

    const element = document.getElementById("betslip");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }
  }

  checkUserForStream() {
    const userDetailString = localStorage.getItem('userDetail');
    // this.backendService.getBalanceExpo().pipe(first()).subscribe((data: any) => {

    //   let exposure =  data.exposure < 0 ? (data.exposure * -1) : data.exposure ;
    //   this.userBalance = data.balance + exposure


    //   // if (this.userBalance < 100 ) {
    //   //   this.streamShowValidation = false;
    //   // }

    // },
    // (error) => {
    //   console.error("Error fetching balance:", error);
    // },)

    this.userDetail = userDetailString ? JSON.parse(userDetailString) : {};
    if (this.userDetail?.userName == 'diamonddemo') {
      this.streamShowValidation = false;
    }
    else {
      this.streamShowValidation = true;
    }


  }

  checkLoggin() {
    this.token = localStorage.getItem('token') || '';
    if (!this.token) {
      this.router.navigate(['/login']);
      return
    }
    const userDetailString = localStorage.getItem('userDetail');
    this.userDetail = userDetailString ? JSON.parse(userDetailString) : {};

    if (this.userDetail?.userName == 'diamonddemo') {
      this.toaster.error('Sorry for inconvenience Use real ID to watch streaming.', '', {
        positionClass: 'toast-top-right',
      });
      return
    }
    // if (this.userBalance < 100) {
    //   this.toaster.error('To watch streaming, a minimum balance of 100 is required.', '', {
    //     positionClass: 'toast-top-right',
    //   });
    //   return
    // }
    // else {
    //   this.streamShowValidation = true;
    //   if (!this.isOPenCard) {
    //     this.isOPenCard = !this.isOPenCard;
    //   }
    // }
  }

  openBetslip(marketId: any, selectionId: any, betType: any, price: any, min: any, max: any, marketType: any, eventName?: any, size?: any, index?: any, mType?: any, isSuperFancy?: any) {

    if (price == 0) {
      this.isBetsSlipOpened = '';
      this.marketId = '';
      return
    }

    window.clearInterval(this.intrvlCashOut);
    this.cashoutValue = [];

    setTimeout(() => {
      const element = document.getElementById('betslip');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (isVisible) {
        } else {
          this.scrollToBetslip()
        }
      }

    }, 50);
    this.callFunctionOnClickNearBottom(190, this.scrollToBetslip);
    if (this.sportId == '7' || this.sportId == '4339') {
      marketType = mType;
    }
    if (mType == 'MATCH_ODDS') {
      marketType = mType
    }

    //
    this.isBetsSlipOpened = selectionId;
    this.marketId = marketId;
    this.type = betType;
    this.betType = marketType;
    this.isValueBetsSlip = 0;
    this.runnerPrice = price;
    this.index = index;

    this.betplaceObj = {
      marketId: marketId,
      selectionId: selectionId,
      betType: betType,
      price: price,
      eventId: this.eventid,
      eventName: eventName,
      minValue: min,
      maxValue: max,
      sportId: this.sportId,
      type: marketType,
      size: size,
      index: index,
      marketTpe: mType,
      isSuperFancy: isSuperFancy
    }
    this.showBetslip = true;

    this.mainService.setOds(this.betplaceObj);
  }
  getLocalDateTime(date: Date) {
    var res = new Date(date);
    return moment(res, "YYYY MM DD hh:mm").format('YYYY/MM/DD hh:mm:ss');
  }
  currentRunnerPrice: any;

  getValueBetSlip(isValueBetsSlip: any) {
    this.isValueBetsSlip = isValueBetsSlip.stake;
    this.currentRunnerPrice = isValueBetsSlip.price;
  }

  InitialStartupApiCalls() {
    let token = localStorage.getItem('token')
    if (token) {
      this.isValueBetsSlip = 0;
      this.getMatchedBetList();

      var req = {
        "eventId": this.event_id,
        "sportId": this.sportId,
      }
      // this.getMatchedOddsPl(req);
      // this.getBookMakerPl(req);
      if (this.sportId !== '2' && this.sportId !== '1' && this.sportId !== '4339' && this.sportId !== '7') {
        // this.getFancyPl(req);
        // this.getSportBookPl(req);
      }
    }

  }
  ProfitLossBalance() {
    let token = localStorage.getItem('token')
    if (token) {
      this.isValueBetsSlip = 0;
      this.getMatchedBetList();

      var req = {
        "eventId": this.event_id,
        "sportId": this.sportId,
      }

      if (this.betType == 'MATCH_ODDS') {
        // this.getMatchedOddsPl(req);
      }

      if (this.betType == 'FANCY') {
        // this.getFancyPl(req);
      }

      if (this.betType == 'BOOKMAKERS') {
        // this.getBookMakerPl(req);
      }

      if (this.betType == 'SPORTSBOOK') {
        // this.getSportBookPl(req);
      }

    }

  }

  getMatchedBetList() {
    let req = {
      eventId: this.event_id,
      sportId: this.sportId
    }
    this.backendService.getAllRecordsByPost(CONFIG.eventMatchedBetList, req).subscribe((record: any) => {
      this.matchedBetList = record.data;


    }, (error: any) => {

    })
  }

  // getMatchedOddsPl(req: any) {

  //   this.backendService.getAllRecordsByPost(CONFIG.getMatchOddsPl, req)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         this.matchedOddsPl = data.pl;

  //       },
  //       error => {
  //         let responseData = error;
  //       });


  // }

  // getFancyPl(req: any) {
  //   this.backendService.getAllRecordsByPost(CONFIG.getFancyPl, req)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         this.FancyPl = data.fancyPl;

  //       },
  //       error => {
  //         let responseData = error;
  //       });

  // }

  // getBookMakerPl(req: any) {
  //   this.backendService.getAllRecordsByPost(CONFIG.getBookmakersPl, req)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         this.BookmakersPl = data.pl;

  //       },
  //       error => {
  //         let responseData = error;
  //       });
  // }

  // getSportBookPl(req: any) {
  //   this.backendService.getAllRecordsByPost(CONFIG.getSportsbookPl, req)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         this.SportsbookPl = data.pl;

  //       },
  //       error => {
  //         let responseData = error;
  //       });
  // }

  trackByFn(index: any) {
    return index;
  }
  ShowMarketManager(marketId: any) {
    if (this.isMobile) {
      if (marketId == this.selectedMarket) {
        return true
      }
      else {
        return false
      }
    }
    else {
      return true
    }
  }

  centerScrollableDiv(tableFlag: any) {

    const centeredDiv = document.getElementById(tableFlag);
    const container = document.getElementById('fancyul');

    if (centeredDiv) {
      // Calculate the center position
      const centerX = centeredDiv.offsetLeft + centeredDiv.offsetWidth / 2;
      // Continue with the rest of your code
    }
  }


  changeFancyMarket(tableFlag: any, onChangeData?: any) {
    const element = document.getElementById(tableFlag);
    if (element && !onChangeData) {
      setTimeout(() => {
        const elementRect = element.getBoundingClientRect();
        const isElementVisible = (
          elementRect.top >= 0 &&
          elementRect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );

        if (isElementVisible && this.isMobile) {
          this.centerScrollableDiv(tableFlag);
          // element.scrollIntoView({ behavior: "smooth", block: "center", inline: 'center' });
        }
      }, 0);
    }

    this.selectedFancyMarket = tableFlag;

    if (tableFlag == 'SPORTSBOOK' || tableFlag == 'Sportsbook') {
      if (!onChangeData) {
        // this.getSportbookDataFirebase(this.getFirestoreBySportId(this.sportId));
      }
      this.AllFancyMarketsFiltered = this.filterAndSortFancyMarkets('SPORTSBOOK');
    } else {
      if (this.sportbookSubscription) {
        this.sportbookSubscription.unsubscribe();
      }

      if (tableFlag == 'popular') {
        this.AllFancyMarketsFiltered = this.filterAndSortFancyMarkets('FANCY', 'FANCY');

        return;
      } else {
        this.AllFancyMarketsFiltered = this.filterAndSortFancyMarkets(tableFlag);

      }
    }
  }

  // private getFirestoreBySportId(sportId: string): any {
  //   switch (sportId) {
  //     case '4':
  //       return this.cricketFirestore;
  //     case '2':
  //       return this.tennisFirestore;
  //     case '1':
  //       return this.soccerFirestore;
  //     default:
  //       return this.otherFirestore;
  //   }
  // }

  private filterAndSortFancyMarkets(type: string, subType?: string): any[] {
    return this.AllFancyMarkets
      .filter((market: any) => {
        const isClosed = market?.oddsData?.status === 'CLOSED';
        if (type === 'SPORTSBOOK') {
          return market.tableFlag === type && !isClosed;
        } else if (type === 'FANCY' && subType === 'FANCY') {
          return market.oddsType === type && !isClosed;
        } else {
          return market.marketType !== 'Linemarket' && market.oddsType === type &&
            (subType === 'Fancy' ? market.marketType === type : market.marketType === subType) && !isClosed;
        }
      })
      .sort((a: any, b: any) => a.sequence - b.sequence);
  }

  changeOddsMarket(marketid: any, tableFlag: any, onChangeOddData?: any) {
    const element = document.getElementById(marketid);
    if (element && this.isMobile && onChangeOddData == 1) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 0);
    }
    this.selectedMarket = marketid;

    if (marketid == 'Popular') {
      this.matchOddsDataUpdated = this.filterAndSortMatchOdds('popular');

      return;
    }

    if (marketid == 'All') {
      this.matchOddsDataUpdated = this.sortAllMarketList();
    } else {
      this.matchOddsDataUpdated = this.filterAndSortMatchOdds(marketid, tableFlag);

    }
  }

  private filterAndSortMatchOdds(marketid: any, tableFlag?: any): any[] {
    return this.AllMarketList.filter((market: any) => {
      const isClosed = market?.oddsData?.status === 'CLOSED';
      if (marketid === 'popular') {
        return market.popular && !isClosed;
      } else if (marketid === 'All') {
        return !isClosed;
      } else {
        return market.exMarketId === marketid && tableFlag === market.marketType && !isClosed;
      }
    }).sort((a: any, b: any) => a.sequence - b.sequence);
  }

  private sortAllMarketList(): any[] {
    const matchOddsData = this.AllMarketList.filter((market: any) => market?.oddsData?.status !== 'CLOSED');
    const matchOdds = matchOddsData.filter((market: any) => market.marketType === 'MATCH_ODDS' && market.marketName == 'Match Odds');
    const bookmakers = matchOddsData.filter((market: any) => market.marketType === 'Bookmakers' || market.marketName.includes('Bookmaker'));
    const otherMarkets = matchOddsData.filter((market: any) => market.marketType !== 'MATCH_ODDS' && market.marketType !== 'Bookmakers').sort((a: any, b: any) => a.sequence - b.sequence);

    return [...matchOdds, ...bookmakers, ...otherMarkets];
  }

  checkJursy(value: any) {
    if (value) {
      return true
    }
    else {
      return false
    }
  }


  getElementByClass(className: string): HTMLElement | null {
    return this.elementRef.nativeElement.querySelector(`.${className}`);
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {

    for (const item of this.opendInfoId) {
      const element = document.getElementById(item);

      if (element?.classList.value.includes('show')) {
        const index = this.opendInfoId.indexOf(item);

        if (index > -1) {
          // Value is present in the array, so remove it
          this.opendInfoId.splice(index, 1);

        }
        this.renderer.removeClass(element, 'show');
      }
    }
  }

  gameRules(sportId: any) {
    this.backendService.getAllRecordsByPost(CONFIG.getSportsRule, { sportId: sportId, key: CONFIG.siteKey })
      .pipe(first())
      .subscribe(
        data => {

          this.rulesInfo = data.data;
        },
        error => {
          let responseData = error;
        });
  }


  // fancyPL(sportID: any, marketId: any) {
  //   this.backendService.getAllRecordsByPost(CONFIG.marketFancyBook, { sportId: sportID, marketId: marketId })
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         let dataFancyPl = data.data;
  //         this.fancyBook = Object.entries(dataFancyPl).map(([key, value]) => ({ key, value }));
  //       },
  //       error => {
  //         let responseData = error;
  //       });
  // }

  calculateCashOut(exMarketId: any, oddType: any) {
    window.clearInterval(this.intrvlCashOut)
    this.cashOutOnInterval(exMarketId, oddType)
    this.intrvlCashOut = window.setInterval(() => {
      this.cashOutOnInterval(exMarketId, oddType)
    }, 1000);

  }
  cashOutOnInterval(exMarketId: any, oddType: any) {
    this.cashoutValue = []

    for (let i = 0; i < this.AllMarketList.length; i++) {
      if (this.AllMarketList[i].exMarketId == exMarketId) {

        let runnerArr = this.AllMarketList[i].oddsData.runners;
        let userProfitLoss;
        if (oddType == 'MATCH_ODDS') {
          userProfitLoss = this.matchedOddsPl[exMarketId];
        }
        else {
          userProfitLoss = this.BookmakersPl[exMarketId];
        }

        let getOddsTeam = _.map(runnerArr, function (val: any) {

          let SelBackPri = val["price"]["back"][0]["price"];
          let SelLayPri = val["price"]["lay"][0]["price"];
          let getSelId = val["selectionId"];

          return {
            "selectionId": getSelId,
            "backOdds": SelBackPri,
            "layOdds": SelLayPri
          }
        });


        let getFavSelection = _.minBy(getOddsTeam, "backOdds");
        let finalFavoriteSelection = getFavSelection["selectionId"];

        if (getFavSelection["backOdds"] == 0 || getFavSelection["layOdds"] == 0) {
          this.cashoutValue = [];
          window.clearInterval(this.intrvlCashOut)
          this.toaster.error('Cash Out is not possible on this odds.', '', {
            positionClass: 'toast-top-right',
          });
          return;
        }

        let getFavPl = userProfitLoss[finalFavoriteSelection];

        let cashOutStake = 0;
        let resPrice = 0;
        let resSide = "";

        let getPlFilter = _.filter(userProfitLoss, function (val: any) {
          if (val < 0) {
            return val;
          }
        });


        if (getPlFilter.length == 2 || getPlFilter.length == 0) {
          let getOtherSel = _.omit(userProfitLoss, finalFavoriteSelection);
          let OthselectionData = _.keys(getOtherSel)[0];
          let PlProfitData = _.values(userProfitLoss);
          let subPl = Math.abs(_.subtract(PlProfitData[0], PlProfitData[1]));
          if (getFavPl > userProfitLoss[OthselectionData]) {

            cashOutStake = parseFloat(Number(subPl / getFavSelection["layOdds"]).toFixed(2));
            resPrice = getFavSelection["layOdds"];
            resSide = "LAY";

          } else {

            cashOutStake = parseFloat(Number(subPl / getFavSelection["backOdds"]).toFixed(2));
            resPrice = getFavSelection["backOdds"];
            resSide = "BACK";

          }
        } else {
          let getTotalPlSum = _.sumBy(_.values(userProfitLoss), function (v: any) { return Math.abs(v); });

          if (getFavPl > 0) {
            cashOutStake = parseFloat(Number(getTotalPlSum / getFavSelection["layOdds"]).toFixed(2));
            resPrice = getFavSelection["layOdds"];
            resSide = "LAY";
          } else {
            cashOutStake = parseFloat(Number(getTotalPlSum / getFavSelection["backOdds"]).toFixed(2));
            resPrice = getFavSelection["backOdds"];
            resSide = "BACK";
          }
        }

        let cashoutValueFinal;
        if (resSide == 'BACK') {
          let cal = (resPrice * 100) - 100;
          let totalProfit = Math.ceil((cal / 100) * cashOutStake);
          cashoutValueFinal = (getFavPl + totalProfit).toFixed(2);
        }
        if (resSide == 'LAY') {
          let cal = (resPrice * 100) - 100;
          let totalProfit = Math.ceil((cal / 100) * cashOutStake);
          cashoutValueFinal = (getFavPl - totalProfit).toFixed(2);
        }

        this.cashoutValue[exMarketId] = cashoutValueFinal;
        if (oddType == 'MATCH_ODDS') {
          this.cashOutAPIData = {
            'marketId': exMarketId,
            'matchMe': false,
            'price': resPrice,
            'selectionId': finalFavoriteSelection,
            'side': resSide,
            'sportId': this.sportId,
            'stake': cashOutStake,
            'type': "MATCH_ODDS"
          }
        }
        else {
          this.cashOutAPIData = {
            'index': 0,
            'marketId': exMarketId,
            'matchMe': false,
            'price': resPrice,
            'selectionId': finalFavoriteSelection,
            'side': resSide,
            'sportId': this.sportId,
            'stake': cashOutStake,
            'type': "BOOKMAKERS"
          }
        }

      }
    }
  }
  // onCashOutConfirm() {
  //   if (!this.cashOutAPIData.stake) {
  //     this.toaster.error('Cash Out not Possible on this Price', '', {
  //       positionClass: 'toast-top-right',
  //     });
  //     return;
  //   }

  //   this.loader = true;

  //   $('.btn-placebet').prop('disabled', true);

  //   this.backendService.getAllRecordsByPost(CONFIG.placebet, this.cashOutAPIData)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         if (data.meta.status == true) {

  //           $('.btn-placebet').prop('disabled', false);
  //           this.cashoutValue = [];
  //           window.clearInterval(this.intrvlCashOut)
  //           this.ProfitLossBalance();
  //           var req = {
  //             "eventId": this.event_id,
  //             "sportId": this.sportId,
  //           }
  //           if (this.cashOutAPIData.type == 'MATCH_ODDS') {
  //             this.getMatchedOddsPl(req);
  //           }
  //           else {
  //             this.getBookMakerPl(req);
  //           }

  //           this.getUserBalance();

  //           this.loader = false;
  //           this.toaster.success(data.meta.message, '', {
  //             positionClass: 'toast-top-right',
  //           });

  //         }
  //       },
  //       error => {

  //         $('.quick_bet-wrap .btn-send').prop('disabled', false);

  //         this.loader = false;

  //         $('.btn-placebet').prop('disabled', false);
  //         if (error.error.meta) {
  //           let errorObject = error.error.meta.message;
  //           if (typeof errorObject === 'object') {
  //             for (var key of Object.keys(errorObject)) {
  //               this.toaster.error(errorObject[key].message, '', {
  //                 positionClass: 'toast-top-right',
  //               });
  //               return;
  //             }
  //           } else {
  //             this.toaster.error(errorObject, '', {
  //               positionClass: 'toast-top-right',
  //             });
  //             return;
  //           }

  //         } else {
  //           this.toaster.error('Hey, looks like something went wrong.', '', {
  //             positionClass: 'toast-top-right',
  //           });
  //           return;
  //         }

  //       });
  // }

  // getUserBalance() {
  //   this.backendService.getAllRecordsByPost(CONFIG.userBalance, {})
  //     .pipe(first())
  //     .subscribe(
  //       (data:any) => {

  //         if (data.meta.status == true) {
  //           let availBalance = (data.data.bankBalance - data.data.exposure).toFixed(2)
  //           $('.userTotalBalance').text(availBalance);
  //           $('.userTotalExposure').text(data.data.exposure);
  //           const Balance = {
  //             balance: availBalance,
  //             exposure: data.data.exposure
  //           }
  //           this.backendService.setBalanceExpo(Balance);
  //         }
  //       },
  //       (error:any) => {
  //         let responseData = error;
  //       });
  // }
  muteAudio() {
    this.isMuted = !this.isMuted;

  }
  infoIdsManager(id: any) {
    if (this.opendInfoId.length == 0) {
      this.opendInfoId.push(id);
      return
    }
    const index = this.opendInfoId.indexOf(id);

    if (index > -1) {
      this.opendInfoId.splice(index, 1);

    } else {
      this.opendInfoId.push(id);

    }
  }


  showLoading() {
    this.loader = true;
  }

  hideLoading() {
    this.loader = false;
  }


  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  handleShowBetslipChange(showBetslip: boolean) {
    this.showBetslip = showBetslip;
  }
  gotoroute() {
    this.router.navigateByUrl('/')
  }
  convertToDate(eventTime: string | null): Date {
    return eventTime ? new Date(eventTime) : new Date(); // If eventTime is null, fallback to current date
  }


  // saud code TS for watch live & match stats
  matchStatsStatus() {
    let token = localStorage.getItem('token')
    if (token) {
      if (this.MatchStats == false && this.watchLiveAndScoreCard == false) {
        this.MatchStats = true;
        this.watchLiveAndScoreCard = false;
      }
    }

  }

  watchLiveStatus() {
    let token = localStorage.getItem('token')
    if (token) {
      if (this.streamingStatus?.isStreaming) {
        this.watchLiveAndScoreCard = true;
        this.MatchStats = false;
      }
      else {
        this.toaster.error(' We apologize, but streaming is not currently available. ', '', {
          positionClass: 'toast-top-center',
        });
      }
    }
    else {
      this.toaster.error('Please Login before to Watch Score', '', {
        positionClass: 'toast-top-center',
      });
    }
  }
  expandedMarket: any;
  isMarketExpanded(marketName: string): boolean {
    // Logic to determine if the specific market is expanded
    return this.expandedMarket === marketName; // Replace this with your actual condition
  }

  generateUniqueId(index: number): string {
    return `matchOdds_${index}`;
  }
  absValue(x: any) {
    return Math.abs(x)
  }
  hasProfitAndLoss(value: any): boolean {
    if (typeof value === 'object' && value !== null) {
      return value.hasOwnProperty('PROFIT') && value.hasOwnProperty('LOSS');
    }
    return false;
  }
  storeCBSPlMaster() {
    let req = {
      "eventId": this.event_id,
      "partnership": this.partnershipFlag
    }
    this.mainService.getAllRecordsByPost(CONFIG.storeCBSPlMaster, req)
      .pipe(first())
      .subscribe(
        data => {
          this.cbsPL = data.pl;

        },
        error => {
          let responseData = error.error;
          this.mainService.ErrorNotification_Manager(responseData);
        });
  }
  storeFancyPlMaster() {
    let req = {
      "eventId": this.event_id,
      "partnership": this.partnershipFlag
    }
    this.mainService.getAllRecordsByPost(CONFIG.storeFancyPlMaster, req)
      .pipe(first())
      .subscribe(
        data => {
          this.fancyPl = data.pl;

        },
        error => {
          let responseData = error.error;
          this.mainService.ErrorNotification_Manager(responseData);
        });
  }


  liveTvOpen() {
    this.toaster.error(' We apologize, but streaming is not currently available. ', '', {
      positionClass: 'toast-top-center',
    });
  }

}

