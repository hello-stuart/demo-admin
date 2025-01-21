import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';
import { NgFor, NgIf } from '@angular/common';
import { AllSvgsComponent } from '../../Components/all-svgs/all-svgs.component';
import { BackendService } from '../../services/backend.service';
import { CONFIG } from '../../../../config';
declare var $: any;

@Component({
  selector: 'app-casino-games',
  standalone: true,
  imports: [NgFor,AllSvgsComponent ],
  templateUrl: './casino-games.component.html',
  styleUrl: './casino-games.component.css'
})
export class CasinoGamesComponent {

  casinoGamesData: any[] = [];
  menuName: any;
  virtualGames: any = [];
  currentRoute: String = "";
  selectedTabCasino = 'Popular';
  casinoGamesDataFilter: any = [];
  constructor(private mainService: MainService , private backendService: BackendService) {
  }
  ngOnInit(): void {
    this.getCasinoLobby();
  }

  getCasinoLobby() {
    this.mainService.getDataFromServices(CONFIG.casinoLobby, CONFIG.casinoLobbyTime, { key: CONFIG.siteKey }).subscribe((data: any) => {
      this.casinoGamesData = data.data;
      this.casinoGamesDataFilter = data.data;
      this.virtualGames = this.casinoGamesData.filter((event: any) => event.menuName == "Virtual");
      this.casinoGamesDataFilter = this.casinoGamesData.filter((element: any) => {
        return element.companyName === "UNIVERSE";
      });
      this.casinoGamesData.forEach((element: any) => {
        element.url = element.url.replace("{$domain}", window.origin);
      });
      this.casinoGamesData.forEach((element: any) => {
        element.url = element.url.replace("{$domain}", window.origin);
      });
    },
      (error: any) => {
        let responseData = error;
      });
  }
  goTOMarket(eventId: any) {
    this.backendService.goToMarketCurrent(eventId);
  }

  
}
