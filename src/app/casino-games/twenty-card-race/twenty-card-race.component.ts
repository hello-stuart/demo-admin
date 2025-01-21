import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoPlayerComponent } from '../../Components/video-player/video-player.component';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { MainService } from '../../services/main.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ShortNumberPipe } from '../../Components/pipes/short-number.pipe';
import { ToastrService } from 'ngx-toastr';
import { CONFIG } from '../../../../config';
import { ResultbarComponent } from "../../Components/resultbar/resultbar.component";
@Component({
  selector: 'app-twenty-card-race',
  standalone: true,
  imports: [VideoPlayerComponent, NgFor, NgClass, NgIf, ShortNumberPipe, ResultbarComponent],
  templateUrl: './twenty-card-race.component.html',
  styleUrl: './twenty-card-race.component.css'
})
export class TwentyCardRaceComponent implements OnInit, OnDestroy {
  isActive: any;
  public message = {
    type: "1",
    id: ""
  };
  public messageResult = {
    type: "3",
    id: ""
  };
  eventid: any;
  getRoundId: any = '';
  myVideo: any = null;
  runnersName: any = {};
  marketArray: any = [];
  rulesBox: any;
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
  marketId: any;
  eventName: any;
  split_arr: any;
  changeValue: any;
  counter = 0;
  selectedCell: any;
  currentRunnerPrice: any;
  RoundWinner: any;
  betSelectedPlayer: any;
  playerMarket: any;
  bankerMarket: any;
  tieMarketArray: any;
  tieMarket: any;
  pairMarketArray: any;
  pairPlayer: any;
  pairBanker: any;
  subscription!: Subscription;
  subscription2!: Subscription;
  winningAmount: any;

  constructor(private route: ActivatedRoute, private encyDecy: EncryptDecryptService,
    private toaster: ToastrService, private mainService: MainService, private backendService: BackendService) {
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
          }
          else {
            return
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
            this.betSelectedPlayer = '';
          }
          this.Card = this.game?.cardsArr?.card;
          this.winnerMarketArray = this.game.marketArr ? this.game.marketArr[0] : ''
          this.runnersName = this.winnerMarketArray.runnersName;
          this.marketArray = this.game.marketArr;
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
    if (objMarket && objMarket.type == "1") {
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
        if ('cardScan' in objMarket?.data) {
          this.game.cardScan = objMarket.data.cardScan;
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
            if (key == this.betSelectedPlayer && objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {
              setTimeout(() => {
                this.backendService.setResultWinningAmount(this.winningAmount);
                this.backendService.setResultSparkData(true);
              }, 1000);
            }
          }
          setTimeout(() => {
            this.RoundWinner = null;
            this.winningAmount = null;
            this.backendService.setResultWinningAmount(this.winningAmount);
            this.backendService.setResultData(this.RoundWinner);

          }, 5000)
        }
        const dataKeys = Object.keys(objMarket.data);
        dataKeys.forEach((key) => {
          if (key.includes('.')) {
            const split_arr = key.split('.');
            let marketIndex = parseInt(split_arr[1]);
            let runnersIndex = split_arr[3];
            let backIndex = split_arr[6];
            if (split_arr[7] == 'size') {
              this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size = objMarket.data[key];
            }
            if (split_arr[7] == 'price') {
              this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].price = objMarket.data[key];
            }
            if (split_arr[4] == 'status') {
              this.marketArray[marketIndex].runners[runnersIndex].status = objMarket.data[key];
            }
          }
        });
      }
    }
  }
  intoNumber(str: any) {
    str.replace('%', '');
    let num = parseInt(str);
    return num
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
          positionClass: 'toast-top-right',
        });
      }
    })
  }
  trackByFn(index: any, item: any) {
    return index;
  }
  capitalize(value: string): string {
    if (!value) return '';
    return value.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}

