import { Component } from '@angular/core';
import { VideoPlayerComponent } from "../../Components/video-player/video-player.component";
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { CommonModule } from '@angular/common';
import { ShortNumberPipe } from '../../Components/pipes/short-number.pipe';
import { ToastrService } from 'ngx-toastr';
import { CONFIG } from '../../../../config';
import { ResultbarComponent } from "../../Components/resultbar/resultbar.component";


@Component({
  selector: 'app-card-32-a',
  standalone: true,
  imports: [VideoPlayerComponent, CommonModule, ShortNumberPipe, ResultbarComponent],
  templateUrl: './card-32-a.component.html',
  styleUrl: './card-32-a.component.css'
})
export class Card32AComponent {
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
  Card: any;
  game: any;
  timer: any;
  counter = 0;
  eventid: any;
  marketId: any;
  rulesBox: any;
  split_arr: any;
  eventName: any;
  marketArray: any;
  changeValue: any;
  gameroundId: any;
  resultArray: any;
  RoundWinner: any;
  playerACards: any;
  playerBCards: any;
  selectedCell: any;
  myVideo: any = null;
  selectedResult: any;
  getRoundId: any = '';
  runnersName: any = {};
  winnerMarketArray: any;
  currentRunnerPrice: any;
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
  ngOnInit(): void {
    this.encyDecy.generateEncryptionKey('', this.message);
    this.subscription = this.encyDecy.getMarketData().subscribe((marketData: any = []) => {
      if (marketData) {
        this.getRoundId = localStorage.getItem('roundID');
        let objMarket = JSON.parse(marketData);
        if (Array.isArray(objMarket?.data)) {
          if (objMarket.type == "1") {
            this.marketArray = objMarket?.data[0]?.marketArr;
            this.game = objMarket?.data[0];
            this.game.marketArr = this.marketArray ? this.marketArray : objMarket.data[0]?.marketArr;
            this.eventName = objMarket?.data[0]?.eventName;
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
          this.gameroundId = this.game?.roundId;
          this.game.eventName = this.eventName ? this.eventName : this.game.eventName;
          this.backendService.updateRoundId(this.game);
          if (this.getRoundId != this.game?.roundId || this.getRoundId == '') {
            localStorage.setItem('roundID', this.game?.roundId)
            this.getResults();
            this.selectedCell = '';
          }
          this.Card = this.game?.cardsArr?.card;
          this.winnerMarketArray = this.game.marketArr ? this.game.marketArr[0] : ''
          this.runnersName = this.winnerMarketArray.runnersName;
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
        if ('data' in objMarket && this.counter == 0 && objMarket.data?.marketArr && objMarket.data._id) {
          this.marketArray = objMarket.data?.marketArr;
          this.game = this.marketArray ? this.marketArray : objMarket?.data;
          this.game = objMarket.data;
          this.eventName = objMarket?.data?.eventName;
          this.counter = 1;
        }
        else {
          if ('marketArr' in objMarket?.data) {
            if (Array.isArray(objMarket?.data?.marketArr)) {
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
          if ('status' in objMarket?.data) {
            this.game.status = objMarket?.data?.status;
          }
          if ('resultsArr' in objMarket?.data) {
            for (let key in objMarket?.data?.resultsArr[0]?.runners) {
              if (objMarket?.data?.resultsArr[0]?.runners[key] == 'WINNER') {
                this.RoundWinner = objMarket?.data?.resultsArr[0]?.runnersName[key];
                this.backendService.setResultData(this.RoundWinner);
              }
              if (objMarket?.data?.resultsArr[0]?.runners[key] == 'WINNER') {
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
            Object.entries(objMarket?.data).forEach(([, value]) => this.changeValue = value)
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
  trackByFn(index: any, item: any) {
    return index;
  }
  intoNumber(str: any) {
    let num = parseInt(str);
    return num
  }
}
