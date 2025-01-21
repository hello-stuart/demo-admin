import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events-banner',
  standalone: true,
  imports: [NgIf],
  templateUrl: './events-banner.component.html',
  styleUrl: './events-banner.component.css'
})
export class EventsBannerComponent {
@Input() sportId:any
@Input() isDesktop:any
@Input() isTabDesk:any

ngOnInit(): void {
}
  
}
