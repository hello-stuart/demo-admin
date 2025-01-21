import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoPlayerComponent } from "../../Components/video-player/video-player.component";
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { ToastrService } from 'ngx-toastr';
import { CONFIG } from '../../../../config';
import { ResultbarComponent } from "../../Components/resultbar/resultbar.component";

@Component({
  selector: 'app-lottery',
  standalone: true,
  imports: [VideoPlayerComponent, ResultbarComponent],
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.css'
})
export class LotteryComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  subscription2!: Subscription;
  public message = {
    type: "1",
    id: ""
  };
  public messageResult = {
    type: "3",
    id: ""
  };
  eventid: any;
  myVideo: any = null;
  marketArray: any;
  rulesBox: any;
  game: any;
  _roomId;
  timer: any;
  winnerMarketArray: any;
  playerACards: any;
  playerBCards: any;
  gameroundId: any;
  Card: any;
  split_arr: any;
  changeValue: unknown;
  eventName: any;
  counter = 0;
  RoundWinner: any;
  getRoundId: any = '';
  selectedCell: string = '';
  yesSelectedArray: any = [];
  noSelectedArray: any = [];
  noSelectedCardArray: any = [];
  yesSelectedCardArray: any = [];
  betplaceObjset: any;
  isbetInProcess: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private backendService: BackendService, 
    private encyDecy: EncryptDecryptService,
  ) {
    this.eventid = this.route.snapshot.params['id'];
    this._roomId = '';
    this.message.id = this.eventid;
    this.messageResult.id = this.eventid;
  }
  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
  ngOnInit(): void {
    setTimeout(() => {
    }, 2000);
    this.encyDecy.generateEncryptionKey('', this.message);
    this.subscription = this.encyDecy.getMarketData().subscribe((marketData: any = []) => {
      if (marketData) {
        this.getRoundId = localStorage.getItem('roundID');
        let objMarket = JSON.parse(marketData);
        if (Array.isArray(objMarket.data)) {
          if (objMarket.type == "1") {
            this.marketArray = objMarket.data[0].marketArr;
            this.game = objMarket.data[0];
            this.game.marketArr = this.marketArray ? this.marketArray : objMarket?.data[0]?.marketArr;
            this.eventName = objMarket?.data[0]?.eventName;
            this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
            function extractNumeric(str: any) {
              const matches = str.match(/\d+(\.\d+)?/);
              return matches ? parseFloat(matches[0]) : null;
            }
            for (let key in this.winnerMarketArray.runnersName) {
              if (this.winnerMarketArray.runnersName.hasOwnProperty(key)) {
                this.winnerMarketArray.runnersName[key] = extractNumeric(this.winnerMarketArray.runnersName[key]);
              }
            }
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
            this.getResults();
            this.selectedCell = '';
          }
          if (this.game.status == 'SUSPEND') {
            this.backendService.setBetSlipPlaceData({});
            this.yesSelectedArray = [];
            this.noSelectedArray = [];
            this.yesSelectedCardArray = [];
            this.noSelectedCardArray = [];
          }
          this.Card = this.game?.cardsArr?.card;
          this.winnerMarketArray = this.game.marketArr ? this.game.marketArr[0] : ''
          this.marketArray = this.game?.marketArr;
        }
      }
    });
    this.getResults();
  }
  handleEventResponse(objMarket: any, index: any) {
    if (Array.isArray(objMarket)) {
      objMarket.forEach((objMarketRes: any) => {
        this.marketObhManager(objMarketRes);
        return
      })
    } else {
      let objMarketRes = objMarket;
      this.marketObhManager(objMarketRes)
      return
    }
  }
  marketObhManager(objMarket: any) {
    if (objMarket) {
      if (objMarket.type == "1") {
        if ('data' in objMarket && this.counter == 0 && objMarket.data.marketArr && objMarket.data._id) {
          this.marketArray = objMarket.data.marketArr;
          this.game = this.marketArray ? this.marketArray : objMarket.data;
          this.game = objMarket.data;
          this.eventName = objMarket.data.eventName;
          this.counter = 1;
        }
        else {
          if ('marketArr' in objMarket?.data) {
            if (Array.isArray(objMarket.data.marketArr)) {
              this.game.marketArr = objMarket.data.marketArr;;
            }
          }
          if ('cardsArr' in objMarket?.data) {
            if (!Array.isArray(objMarket.data.cardsArr)) {
              this.game.cardsArr = objMarket.data.cardsArr;
            }
          }
          if ('roundId' in objMarket) {
            this.game.roundId = objMarket.roundId;
          }
          if ('status' in objMarket?.data) {
            this.game.status = objMarket.data.status;
          }
          if ('resultsArr' in objMarket?.data) {
            for (let key in objMarket?.data?.resultsArr[0]?.runners) {
              if (objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {
                this.RoundWinner = objMarket?.data?.resultsArr[0]?.runnersName[key];
                this.backendService.setResultData(this.RoundWinner);
              }
              if (  objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {
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
          var key_str = Object.keys(objMarket.data)[0];
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
          }
        }
      }
    }
  }
  formatValue(value: any): number {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      return parseInt('0.00');
    }
    const formattedValue = numericValue % 1 !== 0 ? numericValue.toFixed(2) : numericValue.toString();
    return parseInt(formattedValue);
  }
  isKeyStringWithNo(key: any): boolean {
    return typeof key === 'string' && key.includes('NO');
  }
  isKeyStringWithYes(key: any): boolean {
    return typeof key === 'string' && key.includes('YES');
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
  boxes: number[] = [5, 10, 15, 20, 25, 50, 75];
  cardList: any = [
    { card: 'A', selectionId: '1' },
    { card: '2', selectionId: '2' },
    { card: '3', selectionId: '3' },
    { card: '4', selectionId: '4' },
    { card: '5', selectionId: '5' },
    { card: '6', selectionId: '6' },
    { card: '7', selectionId: '7' },
    { card: '8', selectionId: '8' },
    { card: '9', selectionId: '9' },
    { card: '10', selectionId: '0' },
  ]
  
}
