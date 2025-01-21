import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { VideoPlayerComponent } from '../../Components/video-player/video-player.component';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { MainService } from '../../services/main.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CONFIG } from '../../../../config';
import { ResultbarComponent } from "../../Components/resultbar/resultbar.component";

@Component({
  selector: 'app-kbc',
  standalone: true,
  imports: [VideoPlayerComponent, NgFor, NgIf, NgClass, ResultbarComponent],
  templateUrl: './kbc.component.html',
  styleUrl: './kbc.component.css'
})
export class KbcComponent implements OnInit {
  /* Subscription*/
  subscription!: Subscription | undefined;
  subscription2!: Subscription | undefined;
  /* Indicating observables*/

  /* Global scope*/
  @Output() totalRecords = new EventEmitter<any>();
  public message = {
    type: "1",
    id: ""
  };
  /* declare arrays*/
  casinoPl: any = [];
  matchedBets: any = [];
  marketArray: any = [];
  /* declare obj*/
  runnersName: any = {};
  /* declare strings*/
  getRoundId: any = '';
  currentTab: string = '';
  currentTabB: string = '';
  currentTabC: string = '';
  currentTabD: string = '';
  /* declare var with asssign */
  counter = 0;
  resultcounter = 0;
  counttt: any = 0;
  /* declare unknown*/
  _roomId;
  game: any;
  theme: any;
  timer: any;
  loader: any;
  eventid: any;
  marketId: any;
  eventName: any;
  modalData: any;
  split_arr: any;
  stackValue: any;
  gameroundId: any;
  resultArray: any;
  RoundWinner: any;
  playerBCards: any;
  selectedCell: any;
  isIPhoneUser: any;
  playerACards: any;
  winningAmount: any;
  isBetslipClose: any;
  changeValue: unknown;
  totalMatchedBets: any;
  winnerMarketArray: any;
  currentRunnerPrice: any;
  isActive: any;
  selectedQuestion: any = [];
  selectionQuestionId: any = {
    Q1: '',
    Q2: '',
    Q3: '',
    Q4: '',
    Q5: ''
  };
  Card: any;
  constructor(
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private backendService: BackendService,
    private mainService: MainService,
    private encyDecy: EncryptDecryptService) {
    this.eventid = this.route.snapshot.params['id'];
    this._roomId = '';
    this.message.id = this.eventid;
  }
  ngOnInit(): void {
    this.getResults();
    this.route.params.subscribe(params => {
      let routeText = params['id'];
    });
    this.backendService.getResultstream().subscribe(data => {
      this.resultArray = data;
    });
    this.subscription2 = this.backendService.getBetPlace().subscribe((data: any) => {
      if (data) {
        this.loader = data.loader;
        if (data.profitlossCall == true && data.loader == false) {
          this.marketId = '';
          this.selectionQuestionId = {
            Q1: '',
            Q2: '',
            Q3: '',
            Q4: '',
            Q5: ''
          };
        }
      }
    });
    this.encyDecy.generateEncryptionKey('', this.message);
    this.subscription = this.encyDecy.getMarketData().subscribe((marketData: any = []) => {
      if (marketData) {
        this.getRoundId = localStorage.getItem('roundID');
        let objMarket = JSON.parse(marketData);
        if (Array.isArray(objMarket.data)) {
          if (objMarket.type == "1" && objMarket.data[0].marketArr.length > 0) {
            this.marketArray = objMarket.data[0].marketArr;
            this.game = objMarket.data[0];
            this.game.marketArr = this.marketArray ? this.marketArray : objMarket.data[0].marketArr;
            this.eventName = objMarket.data[0].eventName;
            this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
            this.handleEventResponse(objMarket, 0);
          }
        }
        else {
          this.handleEventResponse(objMarket, 0);
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
            this.selectionQuestionId = {
              Q1: '',
              Q2: '',
              Q3: '',
              Q4: '',
              Q5: ''
            };
          }
          if (this.game.status == 'SUSPEND') {
            this.selectionQuestionId = {
              Q1: '',
              Q2: '',
              Q3: '',
              Q4: '',
              Q5: ''
            };
          }
          this.Card = this.game?.cardsArr?.card;
          this.winnerMarketArray = this.game.marketArr ? this.game.marketArr[0] : ''
          this.runnersName = this.winnerMarketArray.runnersName;
          this.marketArray = this.game.marketArr;
        }
      }
    });
  }
  getEventOdds() {
    this.backendService.getCasinoEventOdds(this.eventid).subscribe((res: any) => {
      if (res.meta.status_code == 200) {
        this.game = res?.data;
        this.marketArray = this.game?.marketArr
        this.playerACards = this.game?.cardsArr?.PLAYER_A;
        this.playerBCards = this.game?.cardsArr?.PLAYER_B;
        this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : ''
        this.runnersName = this.winnerMarketArray?.runnersName;
      }
      else {
        this.toaster.error(res?.meta?.message, '', {
          positionClass: 'toast-top-right',
        });
      }
    })
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
    if (objMarket && objMarket?.type == "1") {
      if ('data' in objMarket && this?.counter == 0 && objMarket?.data?.marketArr && objMarket?.data?._id) {
        this.marketArray = objMarket?.data?.marketArr;
        this.game = this?.marketArray ? this?.marketArray : objMarket?.data;
        this.game = objMarket?.data;
        this.eventName = objMarket?.data?.eventName;
        this.counter = 1;
      }
      else {
        if ('marketArr' in objMarket?.data) {
          if (Array.isArray(objMarket?.data?.marketArr)) {
            // this.marketArray = objMarket.updatedData.marketArr;
            this.game.marketArr = objMarket?.data?.marketArr;;
          }
        }
        if ('cardsArr' in objMarket?.data) {
          if (!Array.isArray(objMarket?.data?.cardsArr)) {
            this.game.cardsArr = objMarket?.data?.cardsArr;
          }
        }
        if ('roundId' in objMarket) {

          this.game.roundId = objMarket?.roundId;
        }
        if ('roundId' in objMarket?.data) {
          this.game.roundId = objMarket?.data?.roundId;
        }
        if ('status' in objMarket?.data) {
          this.game.status = objMarket?.data?.status;
        }
        if ('resultsArr' in objMarket?.data) {
          if (this?.casinoPl && this?.casinoPl[this?.winnerMarketArray?.marketId]) {
            if (this.casinoPl[this?.winnerMarketArray?.marketId][this.winnerMarketArray?.runners[0]?.selectionId] > 0) {
              this.winningAmount = this?.casinoPl[this?.winnerMarketArray?.marketId][this?.winnerMarketArray?.runners[0]?.selectionId];
            }
            if (this.casinoPl[this?.winnerMarketArray?.marketId][this?.winnerMarketArray.runners[1]?.selectionId] > 0) {
              this.winningAmount = this?.casinoPl[this.winnerMarketArray?.marketId][this?.winnerMarketArray?.runners[1]?.selectionId];

            }
          }
          for (let key in objMarket?.data?.resultsArr[0]?.runners) {
            if (objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {
              this.RoundWinner = objMarket?.data?.resultsArr[0]?.runnersName[key];
              this.backendService.setResultData(this?.RoundWinner);
            }
            if (objMarket?.data?.resultsArr[0]?.runners[key] == 'WINNER') {
              setTimeout(() => {
                this.backendService.setResultSparkData(true);
              }, 1000);
            }
          }
          setTimeout(() => {
            this.RoundWinner = null;
            this.winningAmount = null
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
            this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size = this.changeValue;
          }
          if (this.split_arr[7] == 'price') {
            this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].price = this.changeValue;
          }
          if (this.split_arr[4] == 'status') {
            this.marketArray[marketIndex].runners[runnersIndex].status = this.changeValue;
          }
        }
      }
    }

  }
  trackByFn(index: any, item: any) {
    return index;
  }
  emptyObjQuestion() {
    this.selectionQuestionId = {
      Q1: '',
      Q2: '',
      Q3: '',
      Q4: '',
      Q5: ''
    };
  }
  getResults() {
    this.backendService.getAllRecordsByPost(CONFIG.getCasinoResultURL, { eventId: this.eventid })
      .pipe(first())
      .subscribe(
        data => {
          this.backendService.updateResultstream(data.data)
        },
        error => {
          let responseData = error;
        });
  }
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