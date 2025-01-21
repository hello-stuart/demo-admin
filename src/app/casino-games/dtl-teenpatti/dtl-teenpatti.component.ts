import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VideoPlayerComponent } from '../../Components/video-player/video-player.component';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { ShortNumberPipe } from '../../Components/pipes/short-number.pipe';
import { ResultbarComponent } from "../../Components/resultbar/resultbar.component";
import { CONFIG } from '../../../../config';

@Component({
  selector: 'app-dtl-teenpatti',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent, ShortNumberPipe, ResultbarComponent],
  templateUrl: './dtl-teenpatti.component.html',
  styleUrl: './dtl-teenpatti.component.css'
})
export class DtlTeenpattiComponent {
  subscription!: Subscription;
  subscription2!: Subscription;

  public message = {
    type: "1",
    id: ""
  };
  runnersName: any = {};
  _roomId;
  game: any;
  timer: any;
  theme: any;
  loader: any;
  counter = 0;
  eventid: any;
  betType: any;
  marketId: any;
  split_arr: any;
  userCount: any;
  eventName: any;
  resultcounter = 0;
  betplaceObj: any;
  gameroundId: any;
  RoundWinner: any;
  marketArray: any;
  playerBCards: any;
  selectedCell: any;
  playerACards: any;
  winningAmount: any;
  isValueBetsSlip = 0;
  getRoundId: any = '';
  changeValue: unknown;
  isBetsSlipOpened = "";
  totalMatchedBets: any;
  winnerMarketArray: any;
  betSelectedPlayer: any;
  currentRunnerPrice: any;
  betSlip: string = "game";
  isDragon: boolean = true;
  isTiger: boolean = false;
  isLion: boolean = false;
  constructor(private route: ActivatedRoute,
    private toaster: ToastrService,
    private backendService: BackendService, private encyDecy: EncryptDecryptService) {
    this.eventid = this.route.snapshot.params['id'];
    this._roomId = '';
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
            this.userCount = objMarket?.user_count;
            this.backendService.setUserCount(this.userCount);
            this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
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
          this.playerACards = this.game?.cardsArr?.PLAYER_A;
          this.playerBCards = this.game?.cardsArr?.PLAYER_B;
          this.winnerMarketArray = this.game.marketArr ? this.game.marketArr[0] : ''
          this.runnersName = this.winnerMarketArray.runnersName;
          this.marketArray = this.game.marketArr;
        }
        // Get result Array
        if (objMarket.type == "3") {
          this.userCount = objMarket?.user_count;
          this.backendService.setUserCount(this.userCount);
        }
      }
    });
    this.getResults();
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
          positionClass: 'toast-top-center',
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
            this.game.marketArr = objMarket?.data?.marketArr;;
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
          this.game.status = objMarket?.data?.status;
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
            this.winningAmount = null
            this.backendService.setResultData(this.RoundWinner);
            this.backendService.setResultWinningAmount(this.winningAmount);
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
        }
      }
    }
    if (objMarket && objMarket.type == "3") {
      this.userCount = objMarket?.user_count;
      this.backendService.setUserCount(this.userCount);
    }
  }
  trackByFn(index: any, item: any) {
    return index;
  }
  ngAfterViewInit() {
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
    this.encyDecy.sendMessageToSocket(message);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  splitMarketName(marketName: string | null | undefined): string {
    if (!marketName) {
      return '';
    }
    return marketName.charAt(0);
  }
  toggleNavTabs(key: string) {
    if (key === 'dragon') {
      this.isDragon = true
      this.isTiger = false
      this.isLion = false
    } else if (key === 'tiger') {
      this.isDragon = false
      this.isTiger = true
      this.isLion = false
    } else if (key === 'lion') {
      this.isDragon = false
      this.isTiger = false
      this.isLion = true
    }
  }
}
