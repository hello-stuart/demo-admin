import { Component, Inject, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ConditionhandlerService } from '../../../../Services/conditionhandler.service';
import { NgFor, NgIf } from '@angular/common';
import { ScoreCardSvgsComponent } from "../../../all-svgs/score-card-svgs/score-card-svgs.component";

@Component({
  selector: 'app-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.css'],
  standalone: true,
  imports: [NgIf, ScoreCardSvgsComponent]
})
export class SoccerComponent implements OnInit {

  @Input() sportObj: any = [];
  @Input() isMuted: any = [];
  ScoreCardSubscription: any;
  gameScore: any = [];
  sportId: any;
  sportName: any;
  slider: any = [];
  last6balls: any = [];
  commentry: any;
  news:any;
  Audio:any;
  isStartStream = false;
  isScoreCard = true;
  isDesktop:any;
  isTestMatch:boolean=false;
  teamInfo: any;
  checkData: any =[];
  event_id: any;
  previousEventId!: boolean;
  isTabDesk: any
  constructor(
    @Inject('firebaseProjectScore') private scoreFirebase: AngularFirestore,
    private route: ActivatedRoute, private conditionhandlerService: ConditionhandlerService
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
        this.event_id = params['eventId'];
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
    this.getBetfairDataFirebase();
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
    let collection:any;

    // if(this.sportObj.sportId==4){
    //   collection='cricketScore'
    // }
    // else if(this.sportObj.sportId==1){
    //   collection='soccerScore'
    // }
    // else if(this.sportObj.sportId==2){
    //   collection='tennisScore'
    // }
    // else{
    //   return
    // }
    // this.sportObj?.event_id'
    this.ScoreCardSubscription = this.scoreFirebase.collection('soccerScore', ref => ref.where('eventId', '==', this.sportObj?.event_id))
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
    this.checkData =pt?.slider;
    this.slider = pt?.slider[0]?.score?.scoreItems;
    this.teamInfo = pt?.slider[0]?.score?.teamInfo;
    this.commentry = pt?.commentary;
    // this.slider[0]?.score?.scoreItems[0]?.scoreData?.filter((data:any)=>{
    //   if(data?.displayText=='1st INNINGS'){
    //     this.isTestMatch = true;
    //   }
    // })

    // let commentryStr = this.slider[0]?.score?.statusCommentry;
    // if(commentryStr.includes('win') || !commentryStr.includes('Last 6 balls:')){
    //   this.news = commentryStr;
    //   return
    // }
    // this.news = commentryStr.substring(0, commentryStr.indexOf('Last'));

    // let substringAfterLast = commentryStr.substring(commentryStr.indexOf('Last 6 balls:') + 'Last 6 balls:'.length);
    // substringAfterLast = substringAfterLast.replace(/\•/g, '0');

    // if (substringAfterLast.includes('|')) {
    //   let array = substringAfterLast.split('|')[1].trim();
    //   this.last6balls = array.split(' ');
    // } else {
    //   this.last6balls = substringAfterLast.trim().split(' ');
    // }
  }
}
