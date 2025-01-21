import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VideoPlayerComponent } from '../../Components/video-player/video-player.component';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { ToastrService } from 'ngx-toastr';
import { ShortNumberPipe } from '../../Components/pipes/short-number.pipe';
import { CONFIG } from '../../../../config';
import { CasinoService } from '../../Services/casino.service';
import { ConditionhandlerService } from '../../Services/conditionhandler.service';
import { MainService } from '../../services/main.service';
import { ResultbarComponent } from "../../Components/resultbar/resultbar.component";

@Component({
  selector: 'app-baccarat',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent, ShortNumberPipe, ResultbarComponent],
  templateUrl: './baccarat.component.html',
  styleUrl: './baccarat.component.css'
})
export class BaccaratComponent implements OnInit, OnDestroy {

  subscription!: Subscription | undefined;
  subscription2!: Subscription | undefined;
  @ViewChild(VideoPlayerComponent)
  videoComponent!: VideoPlayerComponent;
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
  placedbet = true;
  runnersName: any = {};
  marketArray: any;
  selectedResult: any;
  resultArray: any;
  game: any;
  _roomId;
  timer: any;
  winnerMarketArray: any;
  playerACards: any;
  playerBCards: any;
  gameroundId: any;
  Card: any;
  BANKER: any;
  PLAYER: any;
  marketId: any;
  betType: any;
  tieMarketArray: any;
  pairMarketArray: any;
  eventName: any;
  split_arr: any;
  changeValue: any;
  counter = 0;
  selectedCell: any;
  selectedBetAmount: any;
  playerMarket = '0%';
  playerMarketSize: any;
  tieMarket = '0%';
  tieMarketSize: any;
  bankerMarket = '0%';
  bankerMarketSize: any;
  pairPlayer = '0%';
  pairPlayerSize: any;
  pairBanker = '0%';
  pairBankerSize: any;
  RoundWinner: any;
  getRoundId: any = '';
  currentRunnerPrice: any;


  constructor(private route: ActivatedRoute,
    private conditionhandlerService: ConditionhandlerService,
    private toaster: ToastrService, private casinoService: CasinoService, private encyDecy: EncryptDecryptService,
    private backendService: BackendService, private mainService: MainService,) {

    this.eventid = this.route.snapshot.params['id'];
    this._roomId = '';
    this.message.id = this.eventid;
  }

  ngOnInit(): void {

    // ws
    this.encyDecy.generateEncryptionKey('', this.message);
    this.subscription = this.encyDecy.getMarketData().subscribe((marketData: any = []) => {
      this.casinoService = marketData; // Update the receivedMessage variable with the received message
      if (marketData) {
        this.getRoundId = localStorage.getItem('roundID');
        let objMarket = JSON.parse(marketData);
        if (Array.isArray(objMarket.data)) {
          if (objMarket.type == "1") {
            this.marketArray = objMarket.data[0]?.marketArr;
            this.game = objMarket.data[0];
            this.eventName = objMarket.data[0]?.eventName;
            this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
            this.playerMarketSize = this.marketArray[0].runners[0].price.back[0].size;
            this.bankerMarketSize = this.marketArray[0].runners[1].price.back[0].size;
            this.tieMarketSize = this.marketArray[1].runners[0].price.back[0].size;
            this.pairPlayerSize = this.marketArray[2].runners[0].price.back[0].size;
            this.pairBankerSize = this.marketArray[2].runners[1].price.back[0].size;
            this.handleEventResponse(objMarket, 0)
          }
        }
        else {
          this.handleEventResponse(objMarket, 0)
        }
        if (this.game) {
          this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
          this.marketArray = this.game.marketArr;
          this.gameroundId = this.game.roundId;
          this.game.eventName = this.eventName ? this.eventName : this.game.eventName;
          this.backendService.updateRoundId(this.game);
          if (this.game.status == 'SUSPEND') {
          }
          if (this.getRoundId != this.game.roundId || this.getRoundId == '') {
            localStorage.setItem('roundID', this.game.roundId)
            this.playerMarket = '0%';
            this.tieMarket = '0%';
            this.bankerMarket = '0%';
            this.pairPlayer = '0%';
            this.pairBanker = '0%';
            this.selectedCell = '';
            this.getResults();
          }
          this.BANKER = this.game?.cardsArr?.BANKER;
          this.PLAYER = this.game?.cardsArr?.PLAYER;
          this.winnerMarketArray = this.game.marketArr ? this.game.marketArr[0] : ''
          this.tieMarketArray = this.game.marketArr ? this.game.marketArr[1] : ''
          this.pairMarketArray = this.game.marketArr ? this.game.marketArr[2] : ''
          this.runnersName = this.winnerMarketArray.runnersName;
        }
      }
    });
    this.getResults();
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
  marketObjManager(res: any) {
    let objMarket = res

    if (objMarket && objMarket.type == "1") {
      if ('data' in objMarket && this.counter == 0 && objMarket.data.marketArr && objMarket.data._id) {
        this.marketArray = objMarket.data.marketArr;
        this.game = this.marketArray ? this.marketArray : objMarket.data;
        this.game = objMarket.data;
        this.eventName = objMarket.data.eventName;
        this.playerMarketSize = this.marketArray[0].runners[0].price.back[0].size;
        this.bankerMarketSize = this.marketArray[0].runners[1].price.back[0].size;
        this.tieMarketSize = this.marketArray[1].runners[0].price.back[0].size;
        this.pairPlayerSize = this.marketArray[2].runners[0].price.back[0].size;
        this.pairBankerSize = this.marketArray[2].runners[1].price.back[0].size;
        this.counter = 1;
      }
      else {

        if ('marketArr' in objMarket?.data) {
          if (Array.isArray(objMarket.data.marketArr)) {
            // this.marketArray = objMarket.updatedData.marketArr;
            this.game.marketArr = objMarket.data.marketArr;;
          }
        }
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
          this.game.status = objMarket.data.status;
        }
        if ('resultsArr' in objMarket?.data) {
          for (let key in objMarket.data.resultsArr[0].runners) {
            if (objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {
              this.RoundWinner = objMarket.data.resultsArr[0]?.runnersName[key];
              this.backendService.setResultData(this.RoundWinner);
            }
          }
          if (objMarket.data.resultsArr[1].runners[39578955] == 'WINNER') {
            this.RoundWinner = objMarket.data?.resultsArr[1]?.runnersName[39578955];
            this.backendService.setResultData(this.RoundWinner);
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
            if (marketIndex == 0) {
              if (runnersIndex == 0) {
                let percnt = ((this.changeValue / this.playerMarketSize) * 100);
                this.playerMarket = -1 * (percnt - 100) + '%';
              }
              if (runnersIndex == 1) {
                let percnt = ((this.changeValue / this.bankerMarketSize) * 100);
                this.bankerMarket = -1 * (percnt - 100) + '%';
              }
            }
            if (marketIndex == 1) {
              if (runnersIndex == 0) {
                let percnt = ((this.changeValue / this.tieMarketSize) * 100);
                this.tieMarket = -1 * (percnt - 100) + '%';
              }
            }
            if (marketIndex == 2) {
              if (runnersIndex == 0) {
                let percnt = ((this.changeValue / this.pairPlayerSize) * 100);
                this.pairPlayer = -1 * (percnt - 100) + '%';
              }
              if (runnersIndex == 1) {
                let percnt = ((this.changeValue / this.pairBankerSize) * 100);
                this.pairBanker = -1 * (percnt - 100) + '%';
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
  }
  intoNumber(str: any) {
    str.replace('%', '');
    let num = parseInt(str);
    return num
  }

  getEventOdds() {
    this.backendService.getCasinoEventOdds(this.eventid).subscribe((res: any) => {
      if (res.meta.status_code == 200) {
        this.game = res?.data;
        this.marketArray = this.game?.marketArr
        this.BANKER = this.game?.cardsArr?.BANKER;
        this.PLAYER = this.game?.cardsArr?.PLAYER;
        this.winnerMarketArray = this.game?.marketArr ? this.game.marketArr[0] : ''
        this.runnersName = this.winnerMarketArray.runnersName;
      }
      else {
        this.toaster.error(res.meta.message, '', {
          positionClass: 'toast-top-right',
        });
      }
    })
  }





  getResults() {
    this.backendService.getAllRecordsByPost(CONFIG.getCasinoResultURL, { eventId: this.eventid })
      .pipe(first())
      .subscribe(
        (data: any) => {

          this.backendService.updateResultstream(data.data);

        },
        (error: any) => {
          let responseData = error;
        });
  }


}
