import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-all-svgs',
  standalone: true,
  imports: [NgIf],
  templateUrl: './all-svgs.component.html',
  styleUrl: './all-svgs.component.css'
})
export class AllSvgsComponent {
  @Input() eventName:any;
  constructor(){
  }
}
