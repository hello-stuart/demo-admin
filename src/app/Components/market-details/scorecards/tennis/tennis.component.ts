import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ScoreCardSvgsComponent } from "../../../all-svgs/score-card-svgs/score-card-svgs.component";
import { ConditionhandlerService } from '../../../../Services/conditionhandler.service';

@Component({
  selector: 'app-tennis',
  templateUrl: './tennis.component.html',
  styleUrls: ['./tennis.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, ScoreCardSvgsComponent]
})
export class TennisComponent implements OnDestroy{
  @Input() sportObj: any = [];
  @Input() isMuted: any = [];
  ScoreCardSubscription: any;
  gameScore: any = [];
  sportId: any;
  sportName: any;
  slider: any = [];
  commentry: any;
  Audio: any;
  totalSets:any; 
  isTabDesk: any;
  isDesktop: any;



  isTestMatch: boolean = false;
  previousEventId: any;
  event_id: any;
  gameName: any;
  constructor(
    @Inject('firebaseProjectScore') private scoreFirebase: AngularFirestore,private route: ActivatedRoute,
    private conditionhandlerService: ConditionhandlerService
  ) {

    this.conditionhandlerService.getInnerWidth().subscribe((resp: any) => {
      if (resp < 1024) {
        this.isDesktop = false;
      } else {
        this.isDesktop = true;
      }
      if (resp > 668) {
        this.isTabDesk = false;

      } else {
        this.isTabDesk = true;
      }
    });
    this.route.params.subscribe(params => {
      this.sportId = params['gameId'];
      this.event_id = params['eventId'];
      this.gameName = params['gameName'];
      this.sportObj = {
        event_id: this.event_id,
        sportId: this.sportId,
      }
      if ( (this.previousEventId && this.previousEventId != this.event_id)) {
       this.ScoreCardSubscription.unsubscribe()
       this.slider =[];
      }
      this.previousEventId = this.event_id;
      this.getBetfairDataFirebase();
    });
  }
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    if (this.ScoreCardSubscription) {
      this.ScoreCardSubscription.unsubscribe()
    }
  }
  ngOnInit(): void {
    // if (this.previousEventId && this.previousEventId != this.sportObj.event_id ) {
    //   this.ScoreCardSubscription.unsubscribe()
    // }
    // this.previousSport = this.sportId;
    this.previousEventId = this.sportObj.event_id;

    // this.getBetfairDataFirebase();
    // setInterval(()=>{
    // })
  }

  audioContext: any;
  audioBuffer: any;
  async loadAudio() {
    const response = await fetch('assets/ScoreAudios/audio1.ogg');
    const audioData = await response.arrayBuffer();
    this.audioContext = new AudioContext();
    this.audioBuffer = await this.audioContext.decodeAudioData(audioData);
  }
  playAudio() {
    this.loadAudio()
      .then(() => {
        const source = this.audioContext.createBufferSource();
        source.buffer = this.audioBuffer;
        source.connect(this.audioContext.destination);
        source.start(0);
      })
      .catch(error => {
        console.error('Error loading or playing audio:', error);
      });
  }
  getBetfairDataFirebase() {
    let collection: any;

    this.ScoreCardSubscription = this.scoreFirebase.collection('tennisScore', ref => ref.where('eventId', '==', this.sportObj?.event_id))
      .stateChanges()
      .subscribe(changes => {
        changes.forEach(change => {

          const pt: any = change.payload.doc.data();
          const currentid = change.payload.doc.id;
          if (change.type === 'added') {
            this.assignCricetScore(pt);
          }
          if (change.type == 'modified') {
            // arry.push(pt);
            this.assignCricetScore(pt);

          }
          if (change.type == 'removed') {

          }
        });
      });
  }
  assignCricetScore(pt: any) {
    this.slider = pt?.slider;
    this.commentry = this.slider[0]?.score?.statusCommentry;

    this.totalSets = this.FetchSets(this.slider[0]?.score?.scoreItems[0]?.scoreData)
  }
  FetchSets(scoreItems: any) {
    var extractedArrays = [];
    var startFlag = false;
    let obj = scoreItems;
    for (var i = 0; i < obj?.length; i++) {
      if (obj[i].displayText === "SETS") {
        startFlag = true;
        continue;
      }

      if (obj[i].displayText === "PTS") {
        break;
      }

      if (startFlag) {
        extractedArrays.push(obj[i]);
      }
    }
    return extractedArrays
  }
  // checkServer(sliderScore:any){

  //   sliderScore.filter((data:any)=>{
  //     if(data.iconName == "server" || data.id==17){
  //       return true
  //     }
  //   })
  // }
}

