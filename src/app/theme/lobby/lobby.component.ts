import { Component, ElementRef, ViewChild } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { MainService } from '../../services/main.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AllSvgsComponent } from '../../Components/all-svgs/all-svgs.component';
import { CONFIG } from '../../../../config';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [NgIf, NgClass, NgFor, RouterLink, AllSvgsComponent],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {

  menuName: any;
  virtualGames: any = [];
  casinoGamesData: any = [];
  currentRoute: String = "";
  selectedTabCasino = 'Popular';
  casinoGamesDataFilter: any = [];
  @ViewChild('menuListCasino', { static: false }) menuListCasino: ElementRef | any;
  constructor(private backendService: BackendService, private mainService: MainService, private route: ActivatedRoute) {
    this.route.url.subscribe((event) => {
      this.currentRoute = event[0].path;
    });
  }
  ngOnInit(): void {
    this.getCasinoLobby();
  }

  scrollSportsLeft() {
    const scrollableDiv = document.getElementById('casino-scroll-tab');
    const scrollIncrement = 100;
    if (scrollableDiv) {
      const currentScrollPosition = scrollableDiv.scrollLeft;
      const newScrollPosition = currentScrollPosition - scrollIncrement;
      scrollableDiv.scrollLeft = newScrollPosition;
    }
  }

  scrollSportsRight() {

    const scrollableDiv = document.getElementById('casino-scroll-tab');
    const scrollIncrement = 100;
    if (scrollableDiv) {
      const currentScrollPosition = scrollableDiv.scrollLeft;
      const newScrollPosition = currentScrollPosition + scrollIncrement;
      scrollableDiv.scrollLeft = newScrollPosition;
    }
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
      const allMenuNames = this.casinoGamesData.map((item: any) => item.menuName);
      const uniqueMenuNames = [...new Set(allMenuNames)];
      this.menuName = uniqueMenuNames;
      this.menuName = this.menuName.filter((name: any) => name !== 'Popular');
      this.menuName.sort((this.menuName.a, this.menuName.b))
      this.casinoGamesData.forEach((element: any) => {
        element.url = element.url.replace("{$domain}", window.origin);
      });
    },
      (error: any) => {
        let responseData = error;
      });
  }

  onClickCasinoMenu(tab: any, index: any) {
    const url = window.location.pathname;
    const container = this.menuListCasino.nativeElement;
    const listItem = container.querySelectorAll('.lobbyItem')[index];
    if (container && listItem) {
      container.scrollTo({
        behavior: 'smooth',
        left: listItem.offsetLeft - (container.clientWidth - listItem.clientWidth) / 2,
      });
    }
    this.casinoGamesDataFilter = [];
    this.selectedTabCasino = tab;
    switch (tab) {
      case 'Popular':
        this.casinoGamesDataFilter = this.casinoGamesData;
        break;
      case 'Lucky 7':
        this.casinoGamesDataFilter = this.casinoGamesData.filter((element: { menuId: string; }) => element?.menuId === '3');
        break;
      case 'Baccarat':
        this.casinoGamesDataFilter = this.casinoGamesData.filter((element: { menuId: string; }) => element?.menuId === '5');
        break;
      case 'Bollywood':
        this.casinoGamesDataFilter = this.casinoGamesData.filter((element: { menuId: string; }) => element?.menuId === '15');
        break;
      case 'Dragon Tiger':
        this.casinoGamesDataFilter = this.casinoGamesData.filter((element: { menuId: string; }) => element?.menuId === '4');
        break;
      case 'Teen Patti':
        this.casinoGamesDataFilter = this.casinoGamesData.filter((element: { menuId: string; }) => element?.menuId === '2');
        break;
      case 'Andar Bahar':
        this.casinoGamesDataFilter = this.casinoGamesData.filter((element: { menuId: string; }) => element?.menuId === '9');
        break;
      case 'Poker':
        this.casinoGamesDataFilter = this.casinoGamesData.filter((element: { menuId: string; }) => element?.menuId === '10');
        break;
      case 'Region':
        this.casinoGamesDataFilter = this.casinoGamesData.filter((element: { menuId: string; }) => element?.menuId === '19');
        break;
      case 'Other':
        this.casinoGamesDataFilter = this.casinoGamesData.filter((element: { menuId: string; }) => element?.menuId === '20');
        break;
      case 'Virtual':
        this.casinoGamesDataFilter = this.casinoGamesData.filter((element: { menuId: string; }) => element?.menuId === '16');
        break;
      default:
        this.casinoGamesDataFilter = [];
        break;
    }
  }

  goTOMarket(eventId: any) {
    this.backendService.goToMarketCurrent(eventId);
  }

}
