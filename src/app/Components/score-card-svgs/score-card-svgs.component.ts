import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-card-svgs',
  standalone: true,
  imports: [NgIf],
  templateUrl: './score-card-svgs.component.html',
  styleUrl: './score-card-svgs.component.css'
})
export class ScoreCardSvgsComponent {
  @Input() sportId:any;
  @Input() isDesktop:any;
  @Input() isTabDesk:any;

  constructor(){
  }
  
}
