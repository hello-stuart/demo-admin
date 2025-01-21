import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VideoPlayerComponent } from '../../Components/video-player/video-player.component';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { ShortNumberPipe } from '../../Components/pipes/short-number.pipe';
import { ToastrService } from 'ngx-toastr';
import { CONFIG } from '../../../../config';
import { ResultbarComponent } from "../../Components/resultbar/resultbar.component";

@Component({
  selector: 'app-three-card-judgement',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent, ShortNumberPipe, ResultbarComponent],
  templateUrl: './three-card-judgement.component.html',
  styleUrl: './three-card-judgement.component.css'
})
export class ThreeCardJudgementComponent {
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
  _roomId;
  game: any;
  Card: any;
  timer: any;
  counter = 0;
  eventid: any;
  marketId: any;
  rulesBox: any;
  eventName: any;
  split_arr: any;
  marketArray: any;
  resultArray: any;
  RoundWinner: any;
  gameroundId: any;
  playerBCards: any;
  playerACards: any;
  myVideo: any = null;
  selectedResult: any;
  changeValue: unknown;
  getRoundId: any = '';
  runnersName: any = {};
  winnerMarketArray: any;
  selectedcards: any = [];
  currentRunnerPrice: any;
  selectedCell: string = '';
  noSelectedArray: any = [];
  yesSelectedArray: any = [];
  isselectedcard: any = true;
  noSelectedCardArray: any = [];
  yesSelectedCardArray: any = [];
  activeSlides: any | undefined;
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
  ngOnInit(): void {
    this.encyDecy.generateEncryptionKey('', this.message);
    this.subscription = this.encyDecy.getMarketData().subscribe((marketData: any = []) => {
      if (marketData) {
        this.getRoundId = localStorage.getItem('roundID');
        let objMarket = JSON.parse(marketData);
        if (Array.isArray(objMarket.data)) {
          if (objMarket.type == "1") {
            this.marketArray = objMarket.data[0].marketArr;
            this.game = objMarket.data[0];
            this.game.marketArr = this.marketArray ? this.marketArray : objMarket.data[0].marketArr;
            this.eventName = objMarket.data[0].eventName;
            this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
            this.marketId = this.winnerMarketArray.marketId;
            function extractNumeric(str: any) {
              const matches = str.match(/\d+(\.\d+)?/);
              return matches ? parseFloat(matches[0]) : null;
            }
            for (let key in this.winnerMarketArray.runnersName) {
              if (this.winnerMarketArray.runnersName.hasOwnProperty(key)) {
                this.winnerMarketArray.runnersName[key] = extractNumeric(this.winnerMarketArray.runnersName[key]);
              }
            }
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
            this.getResults();
            this.selectedCell = '';
          }
          if (this.game.status == 'SUSPEND') {
            this.backendService.setBetSlipPlaceData({});
            this.yesSelectedArray = [];
            this.noSelectedArray = [];
            this.yesSelectedCardArray = [];
            this.noSelectedCardArray = [];
            this.selectedcards = [];
          }
          this.Card = this.game?.cardsArr?.card;
          this.winnerMarketArray = this.game.marketArr ? this.game.marketArr[0] : ''
          this.runnersName = this.winnerMarketArray?.runnersName;
          this.marketArray = this.game?.marketArr;
        }
      }
    });
    this.getResults();
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
  getEventOdds() {
    this.backendService.getCasinoEventOdds(this.eventid).subscribe((res: any) => {
      if (res.meta.status_code == 200) {
        this.game = res?.data;
        this.marketArray = this.game?.marketArr
        this.playerACards = this.game?.cardsArr?.PLAYER_A;
        this.playerBCards = this.game?.cardsArr?.PLAYER_B;
        this.winnerMarketArray = this.game?.marketArr ? this.game.marketArr[0] : ''
        this.runnersName = this.winnerMarketArray.runnersName;
      }
      else {
        this.toaster.error(res.meta.message, '', {
          positionClass: 'toast-top-center',
        });
      }
    })
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
}