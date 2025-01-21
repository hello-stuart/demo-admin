import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { first, Subscription } from 'rxjs';
import * as confetti from 'canvas-confetti';
import { CasinoResultModalComponent } from "../../modals/casino-result-modal/casino-result-modal.component";
import { TimerComponent } from '../timer/timer.component';
import { ResultbarComponent } from '../resultbar/resultbar.component';
import { CONFIG } from '../../../../config';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ConditionhandlerService } from '../../Services/conditionhandler.service';
import { ToastrService } from 'ngx-toastr';

declare var T20RTCPlayer: any;
declare var $: any;

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
  standalone: true,

  imports: [CasinoResultModalComponent, TimerComponent, ResultbarComponent, NgClass, NgIf, NgFor, CarouselModule]
})
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnChanges {
  scrolIndex: any
  loaderStyle: object = {
    'background': 'black 50% / 48% 75% no-repeat  url(./../../assets/casino-assets/loader.gif) !important',
    'width': '100%',
    'height': '100%',
  };

  customOptions2: OwlOptions = {
    // loop: false,
    // mouseDrag: true,
    // touchDrag: true,
    // rtl: true,
    // pullDrag: false,
    dots: false,
    margin: 5,
    navSpeed: 700,
    // center:true,
    navText: [' < ', ' > '],
    // responsive: {
    //   0: {
    //     items: 3,
    //   },
    //   400: {
    //     items: 3,
    //   },
    //   740: {
    //     items: 3,
    //   },
    //   1366: {
    //     items: 3,
    //   },
    // },
    nav: true,

  };



  @Input() eventId: String = '';
  Cards = [
    {
      card: 'C2_',

    },
    {
      card: 'C3_',

    },
    {
      card: 'C4_',

    },
    {
      card: 'C5_',

    },
    {
      card: 'C6_',

    },
    {
      card: 'C7_',

    },


  ];

  resultDeclared: any;
  // @Input() resultDeclared: any;
  eventid: any;
  myVideo: any = null;
  placedbet = true;
  rulesBox: any;
  selectedResult: any;
  resultArray: any;
  totalMatchedBets: any;
  game: any;
  playerACards: any;
  playerBCards: any;
  timer: any;
  status: any;
  streamingName: any;
  streamingURl: any;
  Card: any;
  DragonCards: any;
  TigerCards: any;
  LoinCards: any;
  CardsWorli: any;
  BANKER: any;
  PLAYER: any;
  DEALER: any;

  PLAYER8: any;
  PLAYER9: any;
  PLAYER10: any;
  PLAYER11: any;
  ActiveCardCountPlayer = '';
  cardCount = {
    "PLAYER_8": 8,
    "PLAYER_9": 9,
    "PLAYER_10": 10,
    "PLAYER_11": 11
  };

  cardCountLH: any = {
    "LOW": 0,
    "HIGH": 0,
  };
  Card_1: any;
  Card_2: any;
  Card_3: any;
  boardCards: any;
  winningAmount: any;

  ANDAR_CARDS: any;
  BAHAR_CARDS: any;
  hasAndarBahir: boolean = false;
  AndarBahirResult: any;
  currentRoute: String = "";
  hasAndarBahirRoute: any;
  raceCards: any;
  FighterCard1: any;
  FighterCard2: any;
  subscription3 !: Subscription;
  HIGH: any;
  LOW: any;
  SPREAD: any;
  eventName: any;
  sub2: any;
  roundID: any = '0';
  Q1: any;
  Q2: any;
  Q3: any;
  Q4: any;
  Q5: any;
  currentVideoRoute: String = "";
  volume: boolean = true;

  constructor(private backendService: BackendService, private route: ActivatedRoute, private router: Router,
    private conditionalHandler: ConditionhandlerService,
    private toaster: ToastrService,
    private cdRef: ChangeDetectorRef) {

    this.eventid = this.route.snapshot.params['id'];
    this.currentRoute = this.getCurrentRoute();
    this.hasAndarBahirRoute = this.currentRoute.includes('andarBahar');
    // console.log(this.eventid)

  }


  volumeMuteUnmute() {
    this.volume = !this.volume
  }

  ngOnDestroy(): void {
    this.roundID = '0';
    if (this.subscription3) {
      this.subscription3.unsubscribe();
    }
  }


  ngOnInit(): void {
    // console.log(this.ANDAR_CARDS);
    this.getResults()
    this.sub2 = this.backendService.getRoundId().subscribe((data: any) => {
      this.eventName = data?.eventName;
      // this.min = data?.marketArr[0].min;
      // this.max = data?.marketArr[0].max;
      this.eventId = data?.eventId;
      if (this.roundID != data?.roundId) {

        this.totalMatchedBets = 0;

        // console.log('he call me  change roundid',this.roundID)
        this.roundID = data?.roundId;
      }
      this.roundID = data?.roundId;
      // console.log(this.roundID, )
    }

    );

    if (this.currentRoute.includes('/marketdetails')) {
      this.loaderStyle = {
        'background': 'black 50% / 48% 75% no-repeat  url(./../../assets/market-match-loader.svg) !important',
        'width': '50%',
        'height': '50%',
      };
    } else {
      this.loaderStyle = {
        'background': 'black 50% / 48% 75% no-repeat  url(./../../assets/casino-assets/loader.gif) !important',
        'width': '100%',
        'height': '100%',
      };
    }



    this.route.children.forEach((child: any) => {
      child.params.subscribe((params: any) => {
        const id = params['id'] || 0
        this.eventid = id;
        // console.log('res Video'+this.eventid)

      })
    })
    // this.eventid= this.eventId;
    this.backendService.getResultData().subscribe((data: any) => {
      this.resultDeclared = data;

      // console.log(this.resultDeclared, "this.resultDeclared this.resultDeclared")

    });


    this.backendService.getResultSparkData().subscribe((data: any) => {
      if (data == true) {
        this.surpriseFireWork()
      }
    });



    this.backendService.getRoundId().subscribe((data: any) => {

      const { ANDAR_CARDS, BAHAR_CARDS } = data?.cardsArr ? data?.cardsArr : '';

      const { CK, DK, HK, SK } = data?.cardsArr ? data?.cardsArr : '';

      const arrayOfArrays = [CK, DK, HK, SK];
      if (this.eventid == '99.0046' || this.eventid == '99.0047' || this.eventid == '99.0048') {

        const maxLengthArray = this.getMaxLengthArray(arrayOfArrays);
        this.raceCards = maxLengthArray;
      }
      this.ANDAR_CARDS = ANDAR_CARDS;
      this.BAHAR_CARDS = BAHAR_CARDS;
      this.AndarBahirResult = data?.cardScan?.RESULT;

      if (this.ANDAR_CARDS?.length !== 0 && this.BAHAR_CARDS !== 0 && this.hasAndarBahirRoute) {
        this.hasAndarBahir = true;
      } else {
        this.hasAndarBahir = false;
      }
      this.game = data;
      this.status = this.game?.status;

      this.Card = this.game?.cardsArr?.card;

      this.Card_1 = this.game?.cardsArr?.card_1;
      this.Card_2 = this.game?.cardsArr?.card_2;
      this.Card_3 = this.game?.cardsArr?.card_3;


      this.FighterCard1 = this.game?.cardsArr?.FIGHTER_A?.card_1;
      this.FighterCard2 = this.game?.cardsArr?.FIGHTER_B?.card_1;

      this.playerACards = data?.cardsArr?.PLAYER_A;
      this.playerBCards = data?.cardsArr?.PLAYER_B;
      this.boardCards = data?.cardsArr?.BOARD;

      this.DragonCards = this.game?.cardsArr?.DRAGON;
      this.TigerCards = this.game?.cardsArr?.TIGER;
      this.LoinCards = this.game?.cardsArr?.LION;

      this.CardsWorli = this.game?.cardsArr?.cards;

      this.BANKER = this.game?.cardsArr?.BANKER;
      this.PLAYER = this.game?.cardsArr?.PLAYER;
      this.DEALER = this.game?.cardsArr?.DEALER;


      this.PLAYER8 = this.game?.cardsArr?.PLAYER_8;
      this.PLAYER9 = this.game?.cardsArr?.PLAYER_9;
      this.PLAYER10 = this.game?.cardsArr?.PLAYER_10;
      this.PLAYER11 = this.game?.cardsArr?.PLAYER_11;
      if (this.eventId !== '99.0055') {
        this.detectChanges(this.game?.cardCount, this.cardCount);

      }
      this.cardCount = this.game?.cardCount;

      this.Q1 = this.game?.cardsArr?.Q1;
      this.Q2 = this.game?.cardsArr?.Q2;
      this.Q3 = this.game?.cardsArr?.Q3;
      this.Q4 = this.game?.cardsArr?.Q4;
      this.Q5 = this.game?.cardsArr?.Q5;


      this.HIGH = this.game?.cardsArr?.HIGH;
      this.LOW = this.game?.cardsArr?.LOW;
      this.SPREAD = this.game?.cardsArr?.SPREAD;

      // this.detectChanges(this.game?.cardCount, this.cardCountLH);
      this.cardCountLH.LOW = this.game?.cardCount?.LOW;
      this.cardCountLH.HIGH = this.game?.cardCount?.HIGH;

      Promise.resolve().then(() => {
        if (this.game?.status == 'ONLINE') {
          this.timer = this.game?.seconds;
          // console.log(this.timer,'video number')
        } else {
          this.timer = 0;
          // console.log(this.timer,'video number 0')

        }
      }
      );

    }
    );
    this.getStreaming();
    this.autoRun();


    this.sub2 = this.backendService.getRoundId().subscribe((data: any) => {
      this.eventName = data?.eventName;
      // this.min = data?.marketArr[0].min;
      // this.max = data?.marketArr[0].max;
      this.eventId = data?.eventId;
      if (this.roundID != data?.roundId) {

        this.totalMatchedBets = 0;

        // consoletimeundID)
        this.roundID = data?.roundId;
      }
      this.roundID = data?.roundId;
    }
    );


    this.conditionalHandler.getCurrentRoute().subscribe((res: any) => {
      this.currentVideoRoute = res;
    })
  }

  getResults() {
    if (this.eventId.includes("99")) {
      // console.log('result check casino hai ? ', this.eventId.includes("99"))
      this.backendService.getAllRecordsByPost(CONFIG.getCasinoResultURL, { eventId: this.eventid })
        .pipe(first())
        .subscribe(
          (data: any) => {
            // console.log(data, 'data data')
            this.backendService.updateResultstream(data.data)
          },
          (error: any) => {
            let responseData = error;
          });
    }

  }
  getMaxLengthArray(arrayOfArrays: any) {
    let currentMaxLength = 0;
    let maxLengthArray = [];

    for (const array of arrayOfArrays) {
      const arrayLength = array?.length;

      if (arrayLength > currentMaxLength) {
        currentMaxLength = arrayLength;
        maxLengthArray = array;
      }
    }

    return maxLengthArray;
  }

  getCurrentRoute(): string {
    let route = window.location.pathname;
    return route;
  }

  getData(e: any) {
  }

  setData(e: any) { }


  ngAfterViewInit() {
    this.cdRef.detectChanges();



  }


  setResult(result?: any) {
    this.resultDeclared = result;
  }
  detectChanges(newCardCount: Record<string, number>, oldCardCount: Record<string, number>) {
    for (const key in newCardCount) {
      if (newCardCount?.hasOwnProperty(key) && oldCardCount?.hasOwnProperty(key)) {
        if (newCardCount[key] !== oldCardCount[key]) {
          this.ActiveCardCountPlayer = key;
          if (newCardCount['PLAYER_8'] == 8) {
            this.ActiveCardCountPlayer = '';
          }
          if (newCardCount['LOW'] == 0) {
            this.ActiveCardCountPlayer = '';
          }
          // console.log(`Property ${key} has changed from ${oldCardCount[key]} to ${newCardCount[key]}`);
        }
      }
    }
  }

  surpriseFireWork() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 20, spread: 360, ticks: 400, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }
    const myCanvas = document.getElementById('my-canvas') as HTMLCanvasElement;
    const myConfetti = confetti.create(myCanvas, {
      resize: true, // will fit all screen sizes
      useWorker: true

    });

    var interval: any = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 100 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      myConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      myConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  }

  streamData: any;
  showStream: any;

  getStreaming() {
    // for sports stream 
    if (!this.currentRoute.includes("marketdetails")) {
      var webrtcPlayer = null;
      setTimeout(() => {
        this.backendService.getvideoStreamURL(this.eventid).subscribe((res: any) => {
          this.streamingName = res?.data?.streamingName;
          this.streamingURl = res?.data?.url;
          if (this.streamingName && this.streamingURl && this.streamingName != 'lowbalance') {
            // if(true){
            webrtcPlayer = new T20RTCPlayer("remoteVideo", this.streamingName, "", this.streamingURl, "", true, true, "tcp");
            webrtcPlayer.Play();
          }
          else {
            return
          }
          // webrtcPlayer = new T20RTCPlayer("remoteVideo", this.streamingName, "", "strikexch.live", "", true, true, "tcp");

        });
      }, 1500);
    }
    else {
      this.backendService.getAllRecordsByPost(CONFIG.getEventStreaming, { eventId: this.eventId }).subscribe((res: any) => {
        this.streamData = res.data;

        if (this.streamData) {

          this.streamingName = res.data?.streamingName;
          this.streamingURl = res.data?.url;
        }



        if (this.streamData?.length < 1 || (this.streamingName == undefined || this.streamingName == null)) {
          this.toaster.error('We apologize, but streaming is not currently available.', '', {
            positionClass: 'toast-top-center',
          });
          this.showStream = false;
        }
        else {
          this.showStream = true;
          setTimeout(() => {

            webrtcPlayer = new T20RTCPlayer("remoteVideo", this.streamingName, "", this.streamingURl, "", true, true, "tcp");
            // webrtcPlayer = new T20RTCPlayer("remoteVideo", "GAME10", "", "realgame1.live", "", true, true, "tcp");
            // webrtcPlayer = new T20RTCPlayer("remoteVideo", this.streamingName, "","strikexch.live", "", true, true, "tcp");
            // webrtcPlayer = new T20RTCPlayer("remoteVideo", "ltve10", "", "ltve.live", "", false, false, "tcp");
            webrtcPlayer.Play();
          }, 100);
        }

      });

      // getEventStreaming
    }

  }


  autoRun() {

    this.myVideo = document.getElementById('remoteVideo');

    // Not all browsers return promise from .play().
    const playPromise = this.myVideo.play() || Promise.reject('');
    playPromise.then(() => {
      // Video could be autoplayed, do nothing.
    }).catch(() => {
      // Video couldn't be autoplayed because of autoplay policy. Mute it and play.
      this.myVideo.muted = true;
      this.myVideo.play();
    });
  }

  startDragging(event: any) {
    // console.log(event);
  }

  onChangeSlider(type: string, direction: string) {
    // console.log('slider change is ready');
  }
  logoClickHandler() {
    this.router.navigateByUrl("/");
    this.backendService.setProfilePagesStatus(false);
  }
  loadRules() {
    this.backendService.getRulesOfMarketURL(this.eventId).subscribe(
      (res: any) => {
        // Set rulesBox content or display "Rules Not Found" if null/empty
        this.rulesBox = res?.data?.rules || 'Rules Not Found';
        this.backendService.setCasinoResults(this.rulesBox);

        // Create and populate the HTML element
        const el = document.createElement('div');
        el.innerHTML = this.rulesBox;
        const box = document.getElementById('rulesBoxContainer');

        // Clear previous content and append new content
        $('#rulesBoxContainer').empty();
        box?.appendChild(el);
      },
      (error: any) => {
        console.error("Error fetching rules:", error);
      }
    );
  }


  splitMarketName(marketName: string | null | undefined): string {
    if (!marketName) {
      return '';  // or return a default value if needed
    }
    return marketName.split('').join('.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.ANDAR_CARDS);
  }


}
