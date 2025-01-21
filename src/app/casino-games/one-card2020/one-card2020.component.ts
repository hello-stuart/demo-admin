import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoPlayerComponent } from '../../Components/video-player/video-player.component';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { MainService } from '../../services/main.service';
import { ResultbarComponent } from "../../Components/resultbar/resultbar.component";
import { ToastrService } from 'ngx-toastr';
import { CONFIG } from '../../../../config';

@Component({
  selector: 'app-one-card2020',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent, ResultbarComponent],
  templateUrl: './one-card2020.component.html',
  styleUrl: './one-card2020.component.css'
})
export class OneCard2020Component {

  subscription!: Subscription;
  subscription2!: Subscription
  public message = {
    type: "1",
    id: ""
  };
  _roomId;
  game: any;
  timer: any;
  theme: any;
  counter = 0;
  loader: any;
  eventid: any;
  betType: any;
  marketId: any;
  Box0Size: any;
  userCount: any;
  eventName: any;
  split_arr: any;
  marketArray: any;
  BoxlineSize: any;
  changeValue: any;
  gameroundId: any;
  betplaceObj: any;
  RoundWinner: any;
  playerACards: any;
  playerBCards: any;
  selectedCell: any;
  resultcounter = 0;
  casinoPl: any = [];
  oddEvenBoxSize: any;
  isValueBetsSlip = 0;
  getRoundId: any = '';
  runnersName: any = {};
  isBetsSlipOpened = "";
  Boxline1: string = '0%';
  Boxline2: string = '0%';
  evenBox: string = '0%';
  betSlip: string = "game";
  oddBox: string = '0%';
  totalMatchedBets: any;
  winnerMarketArray: any;
  betSelectedPlayer: any;
  modifiedItemsWinner: any = [];
  currentRunnerPrice: any;
  Box: any = [
    '0%',
    '0%',
    '0%',
    '0%',
    '0%',
    '0%',
    '0%',
    '0%',
    '0%',
    '0%',
  ];

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private encyDecy: EncryptDecryptService,
    private toaster: ToastrService,
  ) {
    this.eventid = this.route.snapshot.params['id'];
    this._roomId = '';
    this.message.id = this.eventid;
  }
  ngOnInit(): void {
    this.encyDecy.generateEncryptionKey('', this.message);
    this.subscription = this.encyDecy.getMarketData().subscribe((marketData: any = []) => {
      if (marketData) {
        this.getRoundId = localStorage.getItem('roundID');
        let objMarket = JSON.parse(marketData);
        if (Array.isArray(objMarket.data)) {
          if (objMarket.type == "1") {
            this.marketArray = objMarket.data[0]?.marketArr;
            this.game = objMarket.data[0];
            this.game = this.marketArray ? this.marketArray : objMarket.data[0]?.marketArr;
            this.eventName = objMarket.data[0]?.eventName;
            this.userCount = objMarket?.user_count;
            this.backendService.setUserCount(this.userCount);
            this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
            this.Box0Size = this.marketArray[0].runners[0].price.back[0].size;
            this.BoxlineSize = this.marketArray[1].runners[0].price.back[0].size;
            this.oddEvenBoxSize = this.marketArray[2].runners[0].price.back[0].size;
          }
          this.handleEventResponse(objMarket, 0)
        }
        else {
          this.handleEventResponse(objMarket, 0)
        }
        if (this.game) {
          this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
          this.marketArray = this.game.marketArr
          this.gameroundId = this.game.roundId;
          this.game.eventName = this.eventName ? this.eventName : this.game.eventName;
          this.backendService.updateRoundId(this.game);
          if (this.getRoundId != this.game.roundId || this.getRoundId == '') {
            localStorage.setItem('roundID', this.game.roundId)
            this.casinoPl = [];
            this.getResults();
            this.selectedCell = '';
            this.betSelectedPlayer = '';
            this.Box = [
              '0%',
              '0%',
              '0%',
              '0%',
              '0%',
              '0%',
              '0%',
              '0%',
              '0%',
              '0%',
            ];
            this.Boxline1 = '0%';
            this.Boxline2 = '0%';
            this.evenBox = '0%';
            this.oddBox = '0%';
          }
          this.playerACards = this.game?.cardsArr?.PLAYER_A;
          this.playerBCards = this.game?.cardsArr?.PLAYER_B;
          this.winnerMarketArray = this.game.marketArr ? this.game.marketArr[0] : ''
          this.modifiedItemsWinner = [...this.winnerMarketArray?.runners];
          const firstItem = this.modifiedItemsWinner.shift();
          this.modifiedItemsWinner.push(firstItem);
          this.runnersName = this.winnerMarketArray.runnersName;
        }
        if (objMarket.type == "3") {
          this.userCount = objMarket?.user_count;
          this.backendService.setUserCount(this.userCount);
        }
      }
    });
    this.getResults();
    this.getAllMarketProfitLoss();
  }
  handleEventResponse(objMarket: any, index: any) {

    if (Array.isArray(objMarket)) {
      objMarket.forEach((objMarketRes: any) => {
        this.marketObjManager(objMarketRes);
        return
      })
    } else {
      let objMarketRes = objMarket;
      this.marketObjManager(objMarketRes)
      return
    }
  }
  marketObjManager(objMarket: any) {
    if (objMarket && objMarket.type == "1") {
      if ('data' in objMarket && this.counter == 0 && objMarket.data.marketArr && objMarket.data._id) {
        this.marketArray = objMarket.data.marketArr;
        this.game = this.marketArray ? this.marketArray : objMarket.data;
        this.game = objMarket.data;
        this.eventName = objMarket.data.eventName;
        this.counter = 1;
        this.Box0Size = this.marketArray[0].runners[0].price.back[0].size;
        this.BoxlineSize = this.marketArray[1].runners[0].price.back[0].size;
        this.oddEvenBoxSize = this.marketArray[2].runners[0].price.back[0].size;
      }
      else {
        if ('marketArr' in objMarket?.data) {
          if (Array.isArray(objMarket.data.marketArr)) {
            this.game.marketArr = objMarket?.data?.marketArr;;
          }
        }
        // for single market change
        if ('cardsArr' in objMarket?.data) {
          if (!Array.isArray(objMarket.data.cardsArr)) {
            this.game.cardsArr = objMarket?.data?.cardsArr;
          }
        }
        if ('roundId' in objMarket) {
          this.game.roundId = objMarket?.roundId;
        }
        if ('roundId' in objMarket.data) {
          this.game.roundId = objMarket?.data?.roundId;
        }
        if ('status' in objMarket?.data) {
          this.game.status = objMarket?.data?.status;
        }
        if ('resultsArr' in objMarket?.data) {
          if (this.casinoPl && this.casinoPl[this.winnerMarketArray?.marketId]) {
            if (this.casinoPl[this.winnerMarketArray?.marketId][this.winnerMarketArray.runners[0].selectionId] > 0) {
              this.betSelectedPlayer = this.winnerMarketArray.runners[0].selectionId
            }
            if (this.casinoPl[this.winnerMarketArray?.marketId][this.winnerMarketArray.runners[1].selectionId] > 0) {
              this.betSelectedPlayer = this.winnerMarketArray.runners[1].selectionId
            }
          }
          // for video results
          for (let key in objMarket?.data?.resultsArr[0]?.runners) {
            if (objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {
              this.RoundWinner = objMarket?.data?.resultsArr[0]?.runnersName[key];
              this.backendService.setResultData(this.RoundWinner);
            }
            if (key == this.betSelectedPlayer && objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {
              setTimeout(() => {
                this.backendService.setResultSparkData(true);
              }, 1000);
            }
          }
          setTimeout(() => {
            this.RoundWinner = null;
            this.backendService.setResultData(this.RoundWinner);

          }, 5000)
        }
        var key_str = Object.keys(objMarket?.data)[0];
        if (key_str.includes('.')) {
          this.split_arr = key_str.split('.');
          Object.entries(objMarket.data).forEach(([, value]) => this.changeValue = value)
          let marketIndex = parseInt(this.split_arr[1]);
          let runnersIndex = this.split_arr[3];
          let backIndex = this.split_arr[6];
          if (this.split_arr[7] == 'size') {
            if (marketIndex == 0) {
              let percnt = ((this.changeValue / this.Box0Size) * 100);
              if (runnersIndex == 0) {
                this.Box[9] = -1 * (percnt - 100) + '%';
              }
              else {
                this.Box[runnersIndex - 1] = -1 * (percnt - 100) + '%';
              }
            }
            if (marketIndex == 1) {
              let percnt = ((this.changeValue / this.BoxlineSize) * 100);
              if (runnersIndex == 0) {
                this.Boxline1 = -1 * (percnt - 100) + '%';
              }
              else {
                this.Boxline2 = -1 * (percnt - 100) + '%';
              }
            }
            if (marketIndex == 2) {
              let percnt = ((this.changeValue / this.oddEvenBoxSize) * 100);
              if (runnersIndex == 0) {
                this.oddBox = -1 * (percnt - 100) + '%';

              }
              else {
                this.evenBox = -1 * (percnt - 100) + '%';
              }
            }
            this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size = this.changeValue;
          }
          if (this.split_arr[7] == 'price') {
            this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].price = this.changeValue;
          }
        }
      }
    }

    if (objMarket && objMarket.type == "3") {
      this.userCount = objMarket?.user_count;
      this.backendService.setUserCount(this.userCount);
    }
  }
  intoNumber(str: any) {
    str.replace('%', '');
    let num = parseFloat(str).toFixed(1)
    return num
  }
  getEventOdds() {
    this.backendService.getCasinoEventOdds(this.eventid).subscribe((res: any) => {
      if (res.meta.status_code == 200) {
        this.game = res?.data;
        this.marketArray = this.game?.marketArr
        this.playerACards = this.game?.cardsArr?.PLAYER_A;
        this.playerBCards = this.game?.cardsArr?.PLAYER_B;
        this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : ''
        this.runnersName = this.winnerMarketArray.runnersName;
      }
      else {
        this.toaster.error(res.meta.message, '', {
          positionClass: 'toast-top-center',
        });
      }
    })
  }

  trackByFn(index: any, item: any) {
    return index;
  }
  ngAfterViewInit() {
  }

  getMatchedBets(value: any) {
    this.totalMatchedBets = value;
  }
  getMatchedBetsActive(value: any) {
    this.betSlip = value;
  }

  openBetslip(marketId: any, selectionId: any, betType: any, price: any, min: any, max: any, status?: any, marketname?: any) {
    if (status == 'SUSPEND') {
      return
    }
    this.isBetsSlipOpened = selectionId;
    this.marketId = marketId;
    this.selectedCell = selectionId;
    this.betType = betType
    this.isValueBetsSlip = 0;
    this.betplaceObj = {
      marketId: marketId,
      selectionId: selectionId,
      betType: betType,
      price: price,
      eventId: this.eventid,
      roomId: this._roomId,
      minValue: min,
      maxValue: max,
      marketName: marketname,
      status: status
    }
  }

  ChangeValueBetSlip(isValueBetsSlip: any) {
    this.isValueBetsSlip = isValueBetsSlip;
  }
  getAllMarketProfitLoss() {
    this.selectedCell = '';
    this.isValueBetsSlip = 0;
    this.backendService.getCasinoPLURL(this.eventid).subscribe((res: any) => {
      if (res.meta.status == true) {
        this.casinoPl = res.pl;
      }
    });
  }
  getResults() {
    this.backendService.getAllRecordsByPost(CONFIG.getCasinoResultURL, { eventId: this.eventid })
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.backendService.updateResultstream(data.data)
        },
        (error: any) => {
          let responseData = error;
        });
  }
  getValueBetSlip(isValueBetsSlip: any) {
    this.isValueBetsSlip = isValueBetsSlip.stake;
    this.currentRunnerPrice = isValueBetsSlip.price;
  }

  // UNSUBSCRIBING ALL SUBSCRIPTIONS  
  ngOnDestroy(): void {
    let message = {
      type: "2",
      id: ""
    };
    this.encyDecy.sendMessageToSocket(message);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
  capitalize(value: string): string {
    if (!value) return '';
    return value.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}