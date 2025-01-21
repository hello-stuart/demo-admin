import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { VideoPlayerComponent } from '../../Components/video-player/video-player.component';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { ToastrService } from 'ngx-toastr';
import { ResultbarComponent } from "../../Components/resultbar/resultbar.component";
import { CONFIG } from '../../../../config';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-muflis-teenpatti',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent, ResultbarComponent],
  templateUrl: './muflis-teenpatti.component.html',
  styleUrl: './muflis-teenpatti.component.css'
})
export class MuflisTeenpattiComponent {
  subscription!: Subscription;
  subscription2!: Subscription;
  public message = {
    type: "1",
    id: ""
  };
  firstBoxWidth: string = '0%';
  secndBoxWidth: string = '0%';
  eventid: any;
  myVideo: any = null;
  placedbet = true;
  runnersName: any = {};
  marketArray: any;
  rulesBox: any;
  selectedResult: any;
  resultArray: any;
  game: any;
  timer: any;
  winnerMarketArray: any;
  playerACards: any;
  playerBCards: any;
  gameroundId: any;
  _roomId: any;
  marketId: any;
  split_arr: any;
  changeValue: any;
  eventName: any;
  counter = 0;
  selectedCell: any;
  resultcounter = 0;
  RoundWinner: any;
  betStakes: any;
  sizeRunner1: any;
  sizeRunner2: any;
  getRoundId: any = '';
  winningAmount: any;
  currentRunnerPrice: any;
  constructor(
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private mainService: MainService,
    private backendService: BackendService,
    private encyDecy: EncryptDecryptService,
  ) {
    this.eventid = this.route.snapshot.params['id'];
    localStorage.setItem('eventId', this.eventid)
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
            this.marketArray = objMarket.data[0].marketArr;
            this.game = objMarket.data[0];
            this.game.marketArr = this.marketArray ? this.marketArray : objMarket.data[0].marketArr;
            this.eventName = objMarket.data[0].eventName;
            this.sizeRunner1 = this.marketArray[0].runners[0].price.back[0].size;
            this.sizeRunner2 = this.marketArray[0].runners[1].price.back[0].size;
            this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
          }
          this.handleEventResponse(objMarket, 0)
        }
        else {
          this.handleEventResponse(objMarket, 0)
        }
        if (this.game) {
          this.game.eventName = this.eventName ? this.eventName : this.game.eventName;
          this.backendService.updateRoundId(this.game);
          if (this.getRoundId != this.game.roundId || this.getRoundId == '') {
            localStorage.setItem('roundID', this.game.roundId)
            this.getResults();
            this.selectedCell = '';
            this.secndBoxWidth = '0%';
            this.firstBoxWidth = '0%';
          }
          this.playerACards = this.game?.cardsArr?.PLAYER_A;
          this.playerBCards = this.game?.cardsArr?.PLAYER_B;
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
        this.sizeRunner1 = this.marketArray[0].runners[0].price.back[0].size;
        this.sizeRunner2 = this.marketArray[0].runners[1].price.back[0].size;
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
              this.RoundWinner = objMarket?.data?.resultsArr[0]?.runnersName[key];
              this.backendService.setResultData(this.RoundWinner);
            }
            if (objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {
              setTimeout(() => {
                this.backendService.setResultWinningAmount(this.winningAmount);
                this.backendService.setResultSparkData(true);
              }, 1000);
            }
          }
          setTimeout(() => {
            this.RoundWinner = null;
            this.winningAmount = null
            this.backendService.setResultData(this.RoundWinner);
            this.backendService.setResultWinningAmount(this.winningAmount);
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
            if (runnersIndex == 0) {
              let percnt1 = ((this.changeValue / this.sizeRunner1) * 100);
              this.firstBoxWidth = -1 * (percnt1 - 100) + '%';
            }
            if (runnersIndex == 1) {
              let percnt = ((this.changeValue / this.sizeRunner2) * 100);
              this.secndBoxWidth = -1 * (percnt - 100) + '%';
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
  capitalize(value: string): string {
    if (!value) return '';
    return value.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
