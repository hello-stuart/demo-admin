import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { Subscription, first } from 'rxjs';
import { UniverseWheelComponent, TextOrientation, TextAlignment } from 'universe-wheel';
import { CONFIG } from '../../../../config';
import { BackendService } from '../../services/backend.service';
import { CasinoService } from '../../Services/casino.service';
import { EncryptDecryptService } from '../../Services/encrypt-decrypt.service';
import {  NgClass, NgIf } from '@angular/common';
import { CasinoResultModalComponent } from "../../modals/casino-result-modal/casino-result-modal.component";
import { ResultbarComponent } from "../../Components/resultbar/resultbar.component";
import { TimerComponent } from "../../Components/timer/timer.component";


@Component({
  selector: 'app-lucky0-to9',
  standalone: true,
  imports: [NgClass, NgIf, UniverseWheelComponent, CasinoResultModalComponent, ResultbarComponent, TimerComponent],
  templateUrl: './lucky0-to9.component.html',
  styleUrl: './lucky0-to9.component.css'
})
export class Lucky0To9Component {
  subscription!: Subscription;
  public message = {
    type: "1",
    id: ""
  };

  @Input() eventId: any;


  firstBoxWidth: string = '0%';
  secndBoxWidth: string = '0%';
  eventid: any;
  myVideo: any = null;
  placedbet = true;
  runnersName: any = {};
  casinoPl: any = [];
  marketArray: any;
  isBetsSlipOpened = "";
  rulesBox: any;
  selectedResult: any;
  betplaceObj: any;
  resultArray: any;
  totalMatchedBets: any;
  game: any;
  betSlip: string = "game";
  timer: any;
  winnerMarketArray: any;
  playerACards: any;
  playerBCards: any;
  _roomId: any;
  betType: any;
  marketId: any;
  split_arr: any;
  changeValue: any;
  eventName: any;
  counter = 0;
  selectedCell: any;
  betSelectedPlayer: any;
  resultcounter = 0;
  RoundWinner: any;
  betStakes: any;
  selectedBetAmount: any;
  sizeRunner1: any;
  sizeRunner2: any;
  isbetInProcess: boolean = false;
  getRoundId: any = '';
  timerLeft: any;
  TIME_LIMIT = 0;
  timerInterval: any;
  timePassed = 0;
  timeLeft = 0;
  sub2: any;
  roundID: any = '0';
  subscription2!: Subscription;
  config: CountdownConfig = {
    formatDate: (date:any ) => `${date / 1000}`,
  };
  public casinoFlag = 1;
  @ViewChild(UniverseWheelComponent, { static: false }) wheel: any;
  seed = [
    { 'fillStyle': '#105d24', 'value': 0, 'text': '0' },
    { 'fillStyle': '#FF0000', 'value': 1, 'text': '1' },
    { 'fillStyle': '#000000', 'value': 2, 'text': '2' },
    { 'fillStyle': '#FF0000', 'value': 3, 'text': '3' },
    { 'fillStyle': '#000000', 'value': 4, 'text': '4' },
    { 'fillStyle': '#FF0000', 'value': 5, 'text': '5' },
    { 'fillStyle': '#000000', 'value': 6, 'text': '6' },
    { 'fillStyle': '#FF0000', 'value': 7, 'text': '7' },
    { 'fillStyle': '#000000', 'value': 8, 'text': '8' },
    { 'fillStyle': '#FF0000', 'value': 9, 'text': '9' }
  ];
  idToLandOn: any;
  items!: any[];
  textOrientation: TextOrientation = TextOrientation.VERTICAL
  textAlignment: TextAlignment = TextAlignment.OUTER;
  isResultDeclare = false;

  constructor(
    private route: ActivatedRoute, private router: Router,
    private toaster: ToastrService, private backendService: BackendService,
    private casinoService: CasinoService,
    private networkService: BackendService,
    private encyDecy: EncryptDecryptService,
  ) {

    this.eventid = this.route.snapshot.params['id'];
    localStorage.setItem('eventId', this.eventid)
    this.message.id = this.eventid;
  }


  playSound() {
    let audio = new Audio('./../../assets/tick.mp3');
    audio.play();
  }


  ngOnInit(): void {
    this.sub2 = this.backendService.getRoundId().subscribe((data: any) => {
      this.eventName = data?.eventName;
      console.log('he call me  change eventName',this.eventName)
      this.eventId = data?.eventId;
      if (this.roundID != data?.roundId) {
        this.totalMatchedBets = 0;
        this.roundID = data?.roundId;
        console.log('he call me  change roundid', this.roundID)
      }
    }
    );

    $('.vitual-content').css("background", "#000000");
    $('body').css("overflow", "scroll");
    this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];
    const colors = ['#FF0000', '#000000']
    this.items = this.seed.map((value) => ({
      fillStyle: value.fillStyle,
      text: value.text,
      id: value.value,
      textFillStyle: 'white',
      textFontSize: '50',
      animation:
      {
        'type': 'spinToStop',
        'duration': 10,
        'spins': 25,
        'soundTrigger': 'pin'
      },
    }))
    let imageUrl = '../../../assets/wheelbg.png';
    $('#wheelCanvas canvas').css('background', 'url(' + imageUrl + ')')
    $('#wheelCanvas canvas').css('background-repeat', 'no-repeat')
    $('#wheelCanvas canvas').css('background-position', 'center')
    $('#wheelCanvas canvas').css('width', '100%')
    this.encyDecy.generateEncryptionKey('', this.message);
    this.subscription = this.encyDecy.getMarketData().subscribe((marketData: any = []) => {
      this.casinoService = marketData; // Update the receivedMessage variable with the received message
      console.log(this.casinoService , 'casinoService.............')
      if (marketData) {
        this.getRoundId = localStorage.getItem('roundID');
        let objMarket = JSON.parse(marketData);
        if (Array.isArray(objMarket.data)) {
          if (objMarket.type == "1") {
            this.marketArray = objMarket?.data[0]?.marketArr;
            this.game = objMarket?.data[0];
            if (this.marketArray) {
              this.game.marketArr = this.marketArray ? this.marketArray : objMarket?.data[0]?.marketArr;
            }
            this.eventName = objMarket.data[0] ? objMarket?.data[0]?.eventName : '';
            console.log( this.eventName , ' this.eventName   this.eventName ');
            
            this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
            this.handleEventResponse(objMarket, 0)
          }
        }
        else {
          this.handleEventResponse(objMarket, 0)
        }
        if (this.game) {
          this.game.eventName = this.eventName ? this.eventName : this.game.eventName;
          this.networkService.updateRoundId(this.game);
          if (this.game?.status == "ONLINE" && objMarket?.type != "3") {
            this.isResultDeclare = false;
            if (!this.timerInterval) {
              this.timerLeft = this.game?.seconds;
            }
            if (this.game && this.casinoFlag == 1) {
              this.casinoFlag = 2;
              this.TIME_LIMIT = this.game?.seconds;
              if (this.TIME_LIMIT) {
                this.timeLeft = this.TIME_LIMIT;
                this.timerInterval = setInterval(() => {
                  this.timeLeft = this.timeLeft - 1;
                  if (this.TIME_LIMIT) {
                    document.documentElement.style.setProperty('--timerValue', this.TIME_LIMIT.toString() + 's');
                  }
                  this.timerLeft = this.formatTimeLeft(this.timeLeft);
                  if (this.timeLeft == 0) {
                    window.clearInterval(this.timerInterval);
                  }
                  if (this.timeLeft == 0 || this.timeLeft < 0) {
                    this.timeLeft = 0;
                    this.casinoFlag = 1;
                    window.clearInterval(this.timerInterval);
                  }
                }, 1000);
              }
            }
          }
          if (this.game.status == 'SUSPEND') {
            this.TIME_LIMIT = 0;
            this.timePassed = 0;
            this.timeLeft = 0;
            this.casinoFlag = 1;
            this.timerLeft = 0;
            window.clearInterval(this.timerInterval);
            this.timerInterval = null;
          }
          if (this.game.status == 'SUSPEND') {
            this.isBetsSlipOpened = '';
          }
          if (this.getRoundId != this.game.roundId || this.getRoundId == '') {
            localStorage.setItem('roundID', this.game.roundId)
            this.casinoPl = [];
            this.getResults();
            this.selectedCell = '';
            this.betSelectedPlayer = '';
            this.secndBoxWidth = '0%';
            this.firstBoxWidth = '0%';
          }
          this.winnerMarketArray = this.game.marketArr ? this.game.marketArr[0] : ''
          this.marketArray = this.game.marketArr ? this.game.marketArr : []
          console.log(this.marketArray, 'this.marketArray this.marketArray this.marketArray');
          
          this.runnersName = this.winnerMarketArray.runnersName;

        }
      }
    });

    this.getResults();
  }
  reset() {
    this.wheel.reset()
  }
  before() {
  }

  async spin(prize: any) {
    this.wheel.reset()
    this.idToLandOn = prize;
    await new Promise(resolve => setTimeout(resolve, 0));
    this.wheel.spin()
  }

  after() {
    this.isResultDeclare = true;
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
          this.eventName = objMarket?.data?.eventName;
          this.counter = 1;
        }
        else {
          if ('marketArr' in objMarket?.data) {
            if (Array.isArray(objMarket.data.marketArr)) {
              this.game.marketArr = objMarket?.data?.marketArr;;
            }
          }
          // for single market change
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
            if (this.casinoPl && this.casinoPl[this.winnerMarketArray?.marketId]) {
              if (this.casinoPl[this.winnerMarketArray?.marketId][this.winnerMarketArray.runners[0].selectionId] > 0) {
                this.betSelectedPlayer = this.winnerMarketArray.runners[0].selectionId
              }
              if (this.casinoPl[this.winnerMarketArray?.marketId][this.winnerMarketArray.runners[1].selectionId] > 0) {
                this.betSelectedPlayer = this.winnerMarketArray.runners[1].selectionId
              }
            }
            for (let key in objMarket?.data?.resultsArr[0]?.runners) {
              if (objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {
                this.RoundWinner = objMarket?.data?.resultsArr[0]?.runnersName[key];
                this.networkService.setResultData(this.RoundWinner);
                this.spin(parseInt(this.RoundWinner));
              }
              if (key == this.betSelectedPlayer && objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {
                setTimeout(() => {
                  this.networkService.setResultSparkData(true);
                }, 1000);
              }
            }
            setTimeout(() => {
              this.networkService.setResultData(this.RoundWinner);
              this.RoundWinner = null;
            }, 5000)
          }
        }
      }
    }
  }

  formatTimeLeft(time: any) {
    const minutes = Math.floor(time / 60);
    var seconds = time % 60;
    if (seconds < 10) {
      seconds = parseInt(`0${seconds}`);
    }
    return seconds;
  }

  setStake(amount: number) {
    if (amount != this.selectedBetAmount) {
      this.selectedBetAmount = amount;
    }
    else {
      this.selectedBetAmount = 0;
    }
  }
  sendMsg() {
    this.casinoService.send(this.message);
  }
  intoNumber(str: any) {
    str.replace('%', '');
    let num = parseFloat(str).toFixed(1)
    return num
  }
  getMatchedBets(value: any) {
    this.totalMatchedBets = value;
  }

  getMatchedBetsActive(value: any) {
    this.betSlip = value;
  }

  getEventOdds() {
    this.networkService.getCasinoEventOdds(this.eventid).subscribe((res: any) => {
      if (res.meta.status_code == 200) {
        this.game = res?.data;
        this.marketArray = this.game?.marketArr
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

  openBetslip(marketId: any, selectionId: any, betType: any, price: any, min: any, max: any) {
    if (this.game.status != 'SUSPEND' && !this.isbetInProcess) {
      if (this.selectedBetAmount > 0) {
        this.isBetsSlipOpened = selectionId;
        this.marketId = marketId;
        this.betType = betType
        this.selectedCell = selectionId;
        this.betplaceObj = {
          marketId: marketId,
          selectionId: selectionId,
          betType: betType,
          price: price,
          eventId: this.eventid,
          roomId: this._roomId,
          minValue: min,
          maxValue: max
        }
        this.placeCasinoBet();
      }
      else {
        this.toaster.error("please select chips for Bet", '', {
          positionClass: 'toast-top-right',
        })
      }
    }
    else {
      return
    }

  }
  placeCasinoBet() {
    this.isbetInProcess = true;
    let data = {
      marketId: this.betplaceObj.marketId,
      selectionId: this.betplaceObj.selectionId,
      stake: this.selectedBetAmount,
      eventId: this.betplaceObj.eventId
      // flag: this.betplaceObj.betType
    };
    $('.btn-placebet').prop('disabled', true);
    let apiURL;
    apiURL = CONFIG.virtualCasinoPlacebetURL;
    this.networkService.getAllRecordsByPost(apiURL, data)
      .pipe(first())
      .subscribe(
        (res: any) => {

          if (res?.meta?.status == true) {
            this.toaster.success(res.meta.message, '', {
              positionClass: 'toast-top-right',
            });
            this.isbetInProcess = false;
            let placeBetObj = {
              profitlossCall: true,
              loader: false,
            }
            this.networkService.setBetPlace(placeBetObj);
          }
          else {
            if (res?.meta.status == false) {
              this.toaster.error(res.meta.message, '', {
                positionClass: 'toast-top-right',
              });
            } else {
              this.toaster.error("Something went wrong please try again.", '', {
                positionClass: 'toast-top-right',
              });
            }
            this.isbetInProcess = false;
          }
          var pl = res.pl;
        },
        (error: any) => {
          $('.btn-placebet').prop('disabled', false);
          if (error?.error.meta.status == false) {
            this.toaster.error(error.error.meta.message, '', {
              positionClass: 'toast-top-right',
            });
          } else {
            this.toaster.error("Something went wrong please try again.", '', {
              positionClass: 'toast-top-right',
            });
          }
          this.isbetInProcess = false;
        });
  }
  getResults() {
    this.networkService.getAllRecordsByPost(CONFIG.getCasinoResultURL, { eventId: this.eventid })
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.networkService.updateResultstream(data?.data)
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
    $('.vitual-content').css("background", "unset");
    $('body').css("overflow", "");
  }
  logoClickHandler() {
    this.router.navigateByUrl("/");
  }
  loadRules() {
    this.backendService.getRulesOfMarketURL(this.eventId).subscribe(
      (res: any) => {
        this.rulesBox = res?.data?.rules || 'Rules Not Found';
        this.backendService.setCasinoResults(this.rulesBox);
        const el = document.createElement('div');
        el.innerHTML = this.rulesBox;
        const box = document.getElementById('rulesBoxContainer');
        $('#rulesBoxContainer').empty();
        box?.appendChild(el);
      },
      (error: any) => {
        console.error("Error fetching rules:", error);
      }
    );
  }
}