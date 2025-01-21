import { Component, OnInit } from '@angular/core';
import { VideoPlayerComponent } from "../../Components/video-player/video-player.component";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { ShortNumberPipe } from '../../Components/pipes/short-number.pipe';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ResultbarComponent } from "../../Components/resultbar/resultbar.component";
import { CasinoService } from '../../Services/casino.service';
import { CONFIG } from '../../../../config';

@Component({
  selector: 'app-dragon-tiger-2020',
  standalone: true,
  imports: [VideoPlayerComponent, ShortNumberPipe, NgIf, NgClass, ResultbarComponent],
  templateUrl: './dragon-tiger-2020.component.html',
  styleUrl: './dragon-tiger-2020.component.css'
})
export class DragonTiger2020Component {
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
  loader: any;
  eventid: any;
  rulesBox: any;
  marketId: any;
  cardsArr: any;
  eventName: any;
  split_arr: any;
  placedbet = true;
  gameroundId: any;
  resultArray: any;
  marketArray: any;
  RoundWinner: any;
  changeValue: any;
  playerACards: any;
  playerBCards: any;
  selectedCell: any;
  myVideo: any = null;
  selectedResult: any;
  getRoundId: any = '';
  runnersName: any = {};
  totalMatchedBets: any;
  winnerMarketArray: any;
  currentRunnerPrice: any;
  upper7Betslip: any = false;
  constructor(
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private casinoService: CasinoService,
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
      this.casinoService = marketData; // Update the receivedMessage variable with the received message
      if (marketData) {
        this.getRoundId = localStorage.getItem('roundID');
        let objMarket = JSON.parse(marketData);
        if (Array.isArray(objMarket.data)) {
          if (objMarket.type == "1") {
            this.marketArray = objMarket.data[0].marketArr;
            this.game = objMarket.data[0];
            this.game.marketArr = this.marketArray ? this.marketArray : objMarket.data[0].marketArr;
            this.eventName = objMarket.data[0].eventName;
            if (objMarket && objMarket.type == "3") {
            }
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
            this.getRoundId = this.game.roundId;
            this.getResults();
            this.selectedCell = '';
          }
          this.cardsArr = this.game?.cardsArr;
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
              // this.marketArray = objMarket.updatedData.marketArr;
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
          if ('seconds' in objMarket?.data) {
            this.game.seconds = objMarket?.data?.seconds;
          }
          if ('resultsArr' in objMarket?.data) {
            for (let key in objMarket?.data?.resultsArr[0]?.runners) {
              if (objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {
                this.RoundWinner = objMarket?.data?.resultsArr[0]?.runnersName[key];
                this.backendService.setResultData(this.RoundWinner);
              }
              if (objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {
                setTimeout(() => {
                  this.backendService.setResultSparkData(true);
                }, 1000);
              }
            }
            setTimeout(() => {
              this.RoundWinner = null;
              this.backendService.setResultData(this.RoundWinner);
            }, 5000)
            // }
          }
          const dataKeys = Object.keys(objMarket.data);
          dataKeys.forEach((key) => {
            if (key.includes('marketArr.') && key.endsWith('.runners')) {
              const marketIndex = parseInt(key.split('.')[1]);
              if (Array.isArray(objMarket.data[key])) {
                this.marketArray[marketIndex].runners = objMarket.data[key];
              }
            }
            if (key.includes('.')) {
              const split_arr = key.split('.');
              let marketIndex = parseInt(split_arr[1]);
              let runnersIndex = split_arr[3];
              let backIndex = split_arr[6];
              if (split_arr[7] === 'size' && split_arr[5] === 'back') {
                this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size = objMarket.data[key];
              }
              if (split_arr[7] === 'price' && split_arr[5] === 'back') {
                this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].price = objMarket.data[key];
              }
              if (split_arr[4] === 'status') {
                this.marketArray[marketIndex].runners[runnersIndex].status = objMarket.data[key];
              }
            }
          });
        }
      }
    }
  }
  trackByFn(index: any, item: any) {
    return index;
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
        (data: any) => {
          this.backendService.updateResultstream(data.data)
        },
        (error: any) => {
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
  splitMarketName(marketName: string | null | undefined): string {
    if (!marketName) {
      return '';   
    }
    const index = marketName.indexOf('(');
    if (index !== -1) {
      return marketName.substring(0, index).trim();
    }
    return marketName;
  }

  capitalize(value: string): string {
    if (!value) return '';
    return value.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}