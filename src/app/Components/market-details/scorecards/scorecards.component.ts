import { NgFor, NgIf } from '@angular/common';
import {  Component, Input } from '@angular/core';
import { TennisComponent } from "./tennis/tennis.component";
import { SoccerComponent } from "./soccer/soccer.component";
import { CricketComponent } from "./cricket/cricket.component";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-scorecards',
  templateUrl: './scorecards.component.html',
  styleUrls: ['./scorecards.component.css'],
  standalone:true,
  imports: [NgIf, TennisComponent, SoccerComponent, CricketComponent]
})
export class ScorecardsComponent  {
  @Input() sportObj: any = [];
  @Input() isMuted: any = [];

  event_id: any;
  sportId: any;
  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      this.event_id = params.get('eventId');
      this.sportId = params.get('id');

      this.sportObj = {
        event_id: this.event_id,
        sportId: this.sportId,
      };

    });
  }

}
