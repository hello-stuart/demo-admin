import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VideoPlayerComponent } from "../../Components/video-player/video-player.component";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ShortNumberPipe } from '../../Components/pipes/short-number.pipe';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { ResultbarComponent } from "../../Components/resultbar/resultbar.component";
import { CONFIG } from '../../../../config';
@Component({
  selector: 'app-twenty-20-teenpatti',
  standalone: true,
  imports: [VideoPlayerComponent, NgFor, NgIf, NgClass, ShortNumberPipe, ResultbarComponent],
  templateUrl: './twenty-20-teenpatti.component.html',
  styleUrl: './twenty-20-teenpatti.component.css'
})
export class Twenty20TeenpattiComponent {
  // DECALRE  SUBSCRIPTIONS 
  subscription!: Subscription | undefined;
  subscription2!: Subscription | undefined;

  // WEBSOCKET MESSAGE OBJECT 
  public message = {
    type: "1",
    id: ""
  };

  _roomId;
  timer: any;
  theme: any;
  counter = 0;
  betType: any;
  eventid: any;
  marketId: any;
  game: any = {};
  split_arr: any;
  userCount: any;
  eventName: any;
  RoundWinner: any;
  gameroundId: any;
  resultcounter = 0;
  playerACards: any;
  selectedCell: any;
  playerBCards: any;
  winningAmount: any;
  getRoundId: any = '';
  changeValue: unknown;
  runnersName: any = {};
  marketArray: any = [];
  winnerMarketArray: any;
  currentRunnerPrice: any;

  constructor(
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private backendService: BackendService,
    private encyDecy: EncryptDecryptService,
  ) {
    this.eventid = this.route.snapshot.params['id'];
    // console.log(this.eventid , 'this.eventid this.eventid this.eventid ')
    this._roomId = '';
    this.message.id = this.eventid;
  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      let routeText = params['id'];
    });
    this.encyDecy.generateEncryptionKey('', this.message);
    this.subscription = this.encyDecy.getMarketData().subscribe((marketData: any = []) => {
      if (marketData) {
        this.getRoundId = localStorage.getItem('roundID');
        let objMarket = JSON.parse(marketData);
        if (Array.isArray(objMarket.data)) {
          if (objMarket?.data[0]) {
            if (objMarket.type == "1") {
              this.marketArray = objMarket?.data[0]?.marketArr;
              this.game = objMarket?.data[0];
              this.game.marketArr = this.marketArray ? this.marketArray : objMarket?.data[0]?.marketArr;
              this.eventName = objMarket?.data[0]?.eventName;
              this.userCount = objMarket?.user_count;
              this.backendService.setUserCount(this.userCount);
              this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
            }
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
          this.game.eventName = this.eventName ? this.eventName : this.game.eventName;
          this.backendService.updateRoundId(this.game);
          if (this.getRoundId != this.game.roundId || this.getRoundId == '') {
            localStorage.setItem('roundID', this.game.roundId)
            this.getResults();
            this.selectedCell = '';
          }
          this.playerACards = this.game?.cardsArr?.PLAYER_A;
          this.playerBCards = this.game?.cardsArr?.PLAYER_B;
          this.winnerMarketArray = this.game.marketArr ? this.game.marketArr[0] : ''
          this.runnersName = this.winnerMarketArray.runnersName;
          this.marketArray = this.game.marketArr;
        }
        if (objMarket.type == "3") {
          this.userCount = objMarket?.user_count;
          this.backendService.setUserCount(this.userCount);
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
  marketObjManager(res: any) {
    let objMarket = res
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
          if (this.split_arr[4] === 'status') {
            this.marketArray[marketIndex].runners[runnersIndex].status = this.changeValue;
          }
        }
      }
    }
    if (objMarket && objMarket.type == "3") {
      this.userCount = objMarket?.user_count;
      this.backendService.setUserCount(this.userCount);
    }
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
          positionClass: 'toast-top-right',
        });
      }
    })
  }
  trackByFn(index: any, item: any) {
    return index;
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
  splitMarketName(marketName: string): string {
    const index = marketName.indexOf('(');
    if (index !== -1) {
      return marketName.substring(0, index).trim();
    }
    return marketName;
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


