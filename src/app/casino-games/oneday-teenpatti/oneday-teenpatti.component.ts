import { Component, OnDestroy, OnInit} from '@angular/core';
import { VideoPlayerComponent } from "../../Components/video-player/video-player.component";
import { first, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ConditionhandlerService } from '../../Services/conditionhandler.service';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../../services/backend.service';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { CONFIG } from '../../../../config';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ShortNumberPipe } from '../../Components/pipes/short-number.pipe';
import { ResultbarComponent } from "../../Components/resultbar/resultbar.component";

@Component({
  selector: 'app-oneday-teenpatti',
  standalone: true,
  imports: [VideoPlayerComponent, NgFor, NgClass, NgIf, ShortNumberPipe, ResultbarComponent],
  templateUrl: './oneday-teenpatti.component.html',
  styleUrl: './oneday-teenpatti.component.css'
})
export class OnedayTeenpattiComponent implements OnInit, OnDestroy {
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
  counter = 0;
  timer: any;
  eventid: any;
  marketId: any;
  cardsArr: any;
  rulesBox: any;
  eventName: any;
  split_arr: any;
  stackValue: any;
  resultArray: any;
  changeValue: any;
  marketArray: any;
  gameroundId: any;
  RoundWinner: any;
  playerACards: any;
  playerBCards: any;
  selectedCell: any;
  winningAmount: any;
  selectedResult: any;
  myVideo: any = null;
  isValueBetsSlip = 0;
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
        if (Array.isArray(objMarket.data)) {
          if (objMarket.type == "1") {
            this.marketArray = objMarket.data[0]?.marketArr;
            this.game = objMarket?.data[0];
            this.game.marketArr = this?.marketArray ? this.marketArray : objMarket?.data[0]?.marketArr;
            this.eventName = objMarket.data[0].eventName;
            this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
            this.handleEventResponse(objMarket, 0)
          }
        }
        else {
          this.handleEventResponse(objMarket, 0)
        }
        if (this.game) {
          this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
          this.marketArray = this.game.marketArr
          this.gameroundId = this.game.roundId;
          this.game.eventName = this.eventName ? this?.eventName : this.game?.eventName;
          this.backendService.updateRoundId(this?.game);
          if (this.getRoundId != this.game.roundId || this.getRoundId == '') {
            localStorage.setItem('roundID', this?.game?.roundId);
            this.getResults();
            this.selectedCell = '';
          }
          this.playerACards = this.game?.cardsArr?.PLAYER_A;
          this.playerBCards = this.game?.cardsArr?.PLAYER_B;
          this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : ''
          this.runnersName = this.winnerMarketArray?.runnersName;
        }
        if (objMarket.type == "3") {
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
        this.marketArray = objMarket?.data?.marketArr;
        this.game = this.marketArray ? this.marketArray : objMarket?.data;
        this.game = objMarket?.data;
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
        if ('roundId' in objMarket.data) {
          this.game.roundId = objMarket?.data?.roundId;
        }
        if ('status' in objMarket?.data) {
          this.game.status = objMarket?.data?.status;
        }
        if ('seconds' in objMarket?.data) {
          this.game.seconds = objMarket?.data?.seconds;
        }
        if ('resultsArr' in objMarket?.data) {
          for (let key in objMarket?.data?.resultsArr[0]?.runners) {
            if (objMarket?.data?.resultsArr[0]?.runners[key] == 'WINNER') {
              this.RoundWinner = objMarket.data.resultsArr[0]?.runnersName[key];
              this.backendService.setResultData(this.RoundWinner);
            }
          }
          setTimeout(() => {
            this.RoundWinner = null;
            this.winningAmount = null;
            this.backendService.setResultWinningAmount(this.winningAmount);
            this.backendService.setResultData(this.RoundWinner);
          }, 5000)
        }
        var key_str = Object.keys(objMarket?.data)[0];
        if (key_str.includes('.')) {
          Object.entries(objMarket?.data).forEach(([key, value]) => {
            this.changeValue = value;
            this.split_arr = key?.split('.');
            let marketIndex = parseInt(this.split_arr[1]);
            let runnersIndex = this.split_arr[3];
            let backIndex = this.split_arr[6];
            if (this.split_arr[5] == 'back') {
              if (this.split_arr[7] == 'size') {
                this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size = this.changeValue;
              }
              if (this.split_arr[7] == 'price') {
                this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].price = this.changeValue;
              }
            }
            if (this.split_arr[5] == 'lay') {
              if (this.split_arr[7] == 'size') {
                this.marketArray[marketIndex].runners[runnersIndex].price.lay[backIndex].size = this.changeValue;
              }
              if (this.split_arr[7] == 'price') {
                this.marketArray[marketIndex].runners[runnersIndex].price.lay[backIndex].price = this.changeValue;
              }
            }
            if (this.split_arr[4] == 'status') {
              this.marketArray[marketIndex].runners[runnersIndex].status = this?.changeValue;
            }
          })
        }
      }
    }
  }
  trackByFn(index: any, item: any) {
    return index;
  }
  intoNumber(str: any) {
    let num = parseInt(str);
    return num
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
}

