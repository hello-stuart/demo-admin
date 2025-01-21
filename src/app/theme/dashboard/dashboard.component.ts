import { Component } from '@angular/core';
import { CasinoGamesComponent } from "../casino-games/casino-games.component";
import { BackendService } from '../../services/backend.service';
import { first } from 'rxjs';
import { DecimalPipe, NgFor } from '@angular/common';
import { CONFIG } from '../../../../config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CasinoGamesComponent,DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  isRefresh: boolean = false;
  agentBalance: any = {};
  constructor( private backendService: BackendService){
    this.getAgentBalance();
  }
   formatNumber(value:any) {
    return value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}
getAgentBalance() {
  this.isRefresh = true
  this.backendService.getAllRecordsByPost(CONFIG.getAgentBalance, {})
    .pipe(first())
    .subscribe(
      res => {
        this.isRefresh = false
        this.agentBalance = res?.data;
          let availBalance = this.agentBalance.availableBalance;
          $('.availBalance').text(this.formatNumber(availBalance));
          this.backendService.setAgentBalance(res)
      },
      error => {
        this.isRefresh = false
        //let statusError = error;
      });
}

  goTOMarket(eventId: any) {
    this.backendService.goToMarketCurrent(eventId);
  }

}
