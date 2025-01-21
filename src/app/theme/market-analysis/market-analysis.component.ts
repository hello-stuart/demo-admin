import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { CONFIG } from '../../../../config';
import { BackendService } from '../../services/backend.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-market-analysis',
  standalone: true,
  imports: [NgFor,RouterLink],
  templateUrl: './market-analysis.component.html',
  styleUrl: './market-analysis.component.css'
})
export class MarketAnalysisComponent {
  rotate: boolean = false;
  marketAnalysesData: any = [];

  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
    this.rotate = true;
    this.getMarketAnalysisEvents();
  }

  getMarketAnalysisEvents() {

    this.backendService.getAllRecordsByPost(CONFIG.marketAnalysisEvents, {})
      .pipe(first())
      .subscribe(
        (data:any) => {
          this.marketAnalysesData = data.data;
          console.log(this.marketAnalysesData,'marketAnalysesData marketAnalysesData')
        },
        (error:any) => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  getRefreshedData(): void {
    window.location.reload();
}
}
