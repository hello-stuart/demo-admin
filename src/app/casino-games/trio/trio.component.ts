import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { VideoPlayerComponent } from '../../Components/video-player/video-player.component';
import { ToastrService } from 'ngx-toastr';
import { CONFIG } from '../../../../config';
import { ResultbarComponent } from "../../Components/resultbar/resultbar.component";
import { CasinoService } from '../../Services/casino.service';
import { ConditionhandlerService } from '../../Services/conditionhandler.service';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-trio',
  standalone: true,
  imports: [VideoPlayerComponent, NgIf, NgFor, NgClass, ResultbarComponent],
  templateUrl: './trio.component.html',
  styleUrl: './trio.component.css'
})
export class TrioComponent {

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
  casinoPl: any = [];
  marketArray: any;
  isDesktop: any;
  isBetsSlipOpened = "";
  selected: any = false;

  statStatus: any = "open";
  rulesBox: any;
  selectedResult: any;
  betplaceObj: any;
  resultArray: any;
  totalMatchedBets: any;
  game: any;
  betSlip: string = "game";
  _roomId;
  timer: any;
  winnerMarketArray: any;
  playerACards: any;
  playerBCards: any;
  gameroundId: any;
  Card: any;
  BANKER: any;
  PLAYER: any;
  isValueBetsSlip = 0;
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
  betStakes: any;
  RoundWinner: any;
  betSelectedPlayer: any;
  resultcounter = 0;
  isbetInProcess: boolean = false;
  getRoundId: any = '';
  userCount: any;
  currentRunnerPrice: any;
  loader: any;

  constructor(private route: ActivatedRoute,
    private conditionhandlerService: ConditionhandlerService,
    private toaster: ToastrService, private casinoService: CasinoService, private encyDecy: EncryptDecryptService,
    private backendService: BackendService, private mainService: MainService,) {
    this.conditionhandlerService.getInnerWidth().subscribe((resp: any) => {
      if (resp < 1200) {
        this.isDesktop = false;
      } else {
        this.isDesktop = true;
      }
    });
    // this.isMobile = this.deviceService.isMobile();
    // this.isDesktop = this.deviceService.isDesktop();

    this.eventid = this.route.snapshot.params['id'];
    this._roomId = '';
    //  this.getEventOdds();
    this.message.id = this.eventid;
    //  this.messageResult.id = this.eventid;
    //  this.sendMsg();
  }


  ngOnInit(): void {

    if (this.isDesktop) {
      this.backendService.getStakeValue().subscribe((data: any) => {

        if (data) {
          this.isValueBetsSlip = data.stake;
          this.currentRunnerPrice = data.price;
        }

      });
    }


    // ws
    this.encyDecy.generateEncryptionKey('', this.message);

    // this.casinoService.connect();
    // this.sendMsg();
    this.subscription = this.encyDecy.getMarketData().subscribe((marketData: any = []) => {



      this.casinoService = marketData; // Update the receivedMessage variable with the received message

      if (marketData) {

        this.getRoundId = localStorage.getItem('roundID');

        let objMarket = JSON.parse(marketData);
        if (Array.isArray(objMarket.data)) {
          if (objMarket.type == "1" && objMarket?.data[0]?.marketArr?.length > 0) {
            this.marketArray = objMarket?.data[0]?.marketArr;
            this.game = objMarket?.data[0];
            this.game.marketArr = this.marketArray ? this.marketArray : objMarket.data[0].marketArr;
            this.eventName = objMarket.data[0].eventName;

            this.userCount = objMarket?.user_count;
            this.backendService.setUserCount(this.userCount);

            this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';

            this.handleEventResponse(objMarket, 0);


          }
          // else {
          //   return
          // }
        }
        else {
          this.handleEventResponse(objMarket, 0);



        }


        if (this.game) {

          this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
          if (this.game.marketArr) {
            this.marketArray = this.marketArray ? this.marketArray : this.game.marketArr;
          }
          this.gameroundId = this.game.roundId;

          this.game.eventName = this.eventName ? this.eventName : this.game.eventName;
          this.backendService.updateRoundId(this.game);

          if (this.getRoundId != this.game.roundId || this.getRoundId == '') {
            localStorage.setItem('roundID', this.game.roundId)
            this.casinoPl = [];
            // this.MatchedBetsComponent?.casinoMatchedBetList();
            this.selectedCell = '';
            this.betSelectedPlayer = '';
          }
          if (this.game.status == 'SUSPEND') {
            this.isBetsSlipOpened = '';
            if (this.isValueBetsSlip > 0 && this.isDesktop) {
              this.betplaceObj.status = this.game.status;
              this.backendService.setBetSlipPlaceData(this.betplaceObj);
            }
            this.isValueBetsSlip = 0;
          }

          this.Card = this.game?.cardsArr?.card;
          this.winnerMarketArray = this.game.marketArr ? this.game.marketArr[0] : ''
          this.runnersName = this.winnerMarketArray.runnersName;
          this.marketArray = this.game?.marketArr;
        }

        // this.backendService.updateRoundId(this.game);

        if (objMarket.type == "3") {

          this.userCount = objMarket?.user_count;
          this.backendService.setUserCount(this.userCount);

        }
      }
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

          // if(Object.keys(objMarket.updatedData)){

          //   const updatekey = Object.keys(objMarket.updatedData);
          //   // if(typeof(updatekey[0])=="number"){
          //   // }
          // }

          if ('marketArr' in objMarket?.data) {
            if (Array.isArray(objMarket?.data?.marketArr)) {
              // this.marketArray = objMarket.updatedData.marketArr;
              this.game.marketArr = objMarket?.data?.marketArr;

            }


          }
          // for single market change

          if ('cardScan' in objMarket?.data) {
            this.game.cardScan = objMarket.data.cardScan;
          }

          if ('cardsArr' in objMarket?.data) {
            if (!Array.isArray(objMarket?.data?.cardsArr)) {
              this.game.cardsArr = objMarket?.data?.cardsArr;

            }
          }
          if ('cardCount' in objMarket.data) {
            this.game.cardCount = objMarket?.data?.cardCount;

          }
          if ('roundId' in objMarket) {
            this.game.roundId = objMarket?.roundId;

          }
          if ('status' in objMarket?.data) {
            this.game.status = objMarket?.data?.status;
            this.selectedCell = '';

          }

          if ('seconds' in objMarket?.data) {
            this.game.seconds = objMarket?.data?.seconds;
          }
          if ('resultsArr' in objMarket?.data) {

            // if (objMarket?.data?.roundStatus == 'RESULT_DECLARED') {

            if (this.casinoPl && this.casinoPl[this.winnerMarketArray?.marketId]) {
              if (this.casinoPl[this.winnerMarketArray?.marketId][this.winnerMarketArray?.runners[0]?.selectionId] > 0) {
                this.betSelectedPlayer = this.winnerMarketArray?.runners[0]?.selectionId;
                // this.winningAmount = this.casinoPl[this.winnerMarketArray?.marketId][this.winnerMarketArray?.runners[0]?.selectionId];
              }
              if (this.casinoPl[this.winnerMarketArray?.marketId][this.winnerMarketArray?.runners[1]?.selectionId] > 0) {
                this.betSelectedPlayer = this.winnerMarketArray.runners[1]?.selectionId;
                // this.winningAmount = this.casinoPl[this.winnerMarketArray?.marketId][this.winnerMarketArray.runners[1].selectionId];
              }
            }
            // for video results
            for (let key in objMarket?.data?.resultsArr[0]?.runners) {
              if (objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {

                this.RoundWinner = objMarket?.data?.resultsArr[0]?.runnersName[key];
                this.backendService.setResultData(this.RoundWinner);
              }
              if (key == this.betSelectedPlayer && objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {
                setTimeout(() => {
                  // this.backendService.setResultWinningAmount(this.winningAmount);
                  this.backendService.setResultSparkData(true);
                  // this.videoComponent.surpriseFireWork();
                }, 1000);
              }
            }
            setTimeout(() => {
              this.RoundWinner = null;
              // this.winningAmount = null;
              // this.backendService.setResultWinningAmount(this.winningAmount);
              this.backendService.setResultData(this.RoundWinner);

            }, 5000)
            // }
          }


        }

      }
    }
    if (objMarket && objMarket.type == "3") {

      this.userCount = objMarket?.user_count;
      this.backendService.setUserCount(this.userCount);

    }
  }

  intoNumber(str: any) {
    str = str.toString().replace('%', '');
    let num = parseInt(str);
    // num = 100 - num
    return num;
  }

  ChangeValueBetSlip(isValueBetsSlip: any) {
    this.isValueBetsSlip = isValueBetsSlip;
  }

  getMatchedBets(value: any) {
    this.totalMatchedBets = value;
  }

  getMatchedBetsActive(value: any) {
    this.betSlip = value;
  }

  sendMsg() {

    this.casinoService.send(this.message);
  }
  getEventOdds() {
    this.backendService.getCasinoEventOdds(this.eventid).subscribe((res: any) => {
      if (res.meta.status_code == 200) {
        this.game = res?.data;
        this.marketArray = this.game?.marketArr
        this.playerACards = this.game?.cardsArr?.PLAYER_A;
        this.playerBCards = this.game?.cardsArr?.PLAYER_B;
        this.winnerMarketArray = this.game?.marketArr ? this.game.marketArr[0] : ''
        this.runnersName = this?.winnerMarketArray.runnersName;
      }
      else {
        this.toaster.error(res.meta.message, '', {
          positionClass: 'toast-top-center',
        });
      }
    })


  }


  getValueBetSlip(isValueBetsSlip: any) {
    this.isValueBetsSlip = isValueBetsSlip.stake;
    this.currentRunnerPrice = isValueBetsSlip.price;
  }
  capitalize(value: string): string {
    if (!value) return '';
    return value.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

}
