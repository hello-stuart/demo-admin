import { Component } from '@angular/core';
import { NavigationEnd, RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { MainService } from '../../services/main.service';
import { ConditionhandlerService } from '../../Services/conditionhandler.service';
import { CONFIG } from '../../../../config';
import { BackendService } from '../../services/backend.service';
declare var $: any;
@Component({
  selector: 'app-leftside-bar',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, NgClass],
  templateUrl: './leftside-bar.component.html',
  styleUrl: './leftside-bar.component.css'
})
export class LeftsideBarComponent {

  showLeftSidebar: boolean = false;
  SportsList: any = [];
  idsToSkip: any[] = ['4339', '7'];
  competitionsList: any;
  AllEventsList: any;
  currentTournamentID: any;
  eventListData: any;
  tournamentsList: any; //data without tournamentCounts
  currentSportID: any;
  sportIds: any = [];  //Array for storing sportsIds from sportsList
  tournamentIds: any = []; //array for storing tournament Ids from allEventLists
  sportEventCounts: any = [];
  tournamentCounts: any = {};
  sortedTournamentList: any = []; //data with sorted tournamentCounts
  showProfilePages: boolean = false;
  role: any;
  activeSportBtn: boolean = false

  constructor(private conditionalHandler: ConditionhandlerService,
    private mainService: MainService,
    private BackendService: BackendService,
    private router: Router
  ) {
    this.mainService.getSportsList().subscribe( (res: any) =>{

    })
    {
      this.BackendService.getRole().subscribe((res: any) => {
        this.role = res;
      })
    }
  }
  ngOnInit() {


    this.BackendService.getProfilePagesStatus().subscribe((res: any) => {
      this.showProfilePages = res;
    })

    this.conditionalHandler.getSideBarOpenStatus().subscribe((res: any) => {
      this.showLeftSidebar = res;
    })

    this.mainService.getSportsList().subscribe((res: any) => {
      this.SportsList = res;
      if (this.SportsList !== null) {
        if (this.SportsList !== null) {
          this.sportIds = this.SportsList.map((sport: any) => sport.sportId);
        }
      }
    })
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (!this.conditionalHandler.isDesktop()) {
          this.conditionalHandler.setSideBarOpenStatus(false);
        }
      }
    });
  }


  clickCloseSidebar(): void {
    if (window.innerWidth < 768) {
      this.conditionalHandler.setSideBarOpenStatus(false);
    }
  }

  getAllSportList() {
    this.mainService.getSportsList().subscribe((data: any) => {
      this.SportsList = data;
      // this.SportsList = this.SportsList?.filter((item: any) => !this.shouldSkip(item?.sportId));
      // this.SportsList.sort((a, b) => a.sequenceNumber - b.sequenceNumber);
    });
  }
  shouldSkip(sportId: any): boolean {
    // const idsToSkip: any[] = ['7', '4339'];
    return this.idsToSkip.includes(sportId);
  }
  onClickSport(sportid: any, index: any) {

    if (this.currentSportID == sportid) {
    } else {
      this.currentSportID = sportid;
      this.getTournamentsList(sportid);
    }

  }
  onClickTournament(tournamentid: any) {
    if (this.currentTournamentID == tournamentid) {

    } else {
      this.currentTournamentID = tournamentid;
      this.getEventsList(this.currentTournamentID);
    }
  }
  getTournamentsList(sportid: any) {
    this.mainService.getDataFromServices(CONFIG.getAllEventsList, CONFIG.getAllEventsListTime).subscribe((data: any) => {
      this.AllEventsList = data.data;
      let relativeSport = data.data[sportid];
      this.tournamentsList = relativeSport ? this.pickUniqueCompetitions(relativeSport) : [];
      this.getIndividualEventCountBySportId(sportid)
      //Check if tournamentCounts exists
      if (this.tournamentCounts !== null) {
        //map tournamentCounts in tournamentList and sort them according to tournament ids
        this.sortedTournamentList = this.tournamentsList.map((tournament: any) => ({
          ...tournament,
          count: this.tournamentCounts[tournament.tournamentId] || 0
        })).sort((a: any, b: any) => a.tournamentId - b.tournamentId); // Sort by tournamentId
      }
    });
  }
  pickUniqueCompetitions(competitions: any) {
    const uniqueCompetitions: any = [];
    const competitionNames: string[] = [];
    for (const competition of competitions) {

      if (!competitionNames.includes(competition.tournamentName)) {
        uniqueCompetitions.push(competition);
        competitionNames.push(competition.tournamentName);
      }
    }
    return uniqueCompetitions;
  }
  getEventsList(tournamentid: any) {
    this.eventListData = this.AllEventsList[this.currentSportID].filter((data: any) => {
      if (data.tournamentId == tournamentid) {
        return data
      }
      else {
        return null
      }
    })
  }

  onEventBtnClick() {
    this.mainService.getDataFromServices(CONFIG.getAllEventsList, CONFIG.getAllEventsListTime).subscribe((data: any) => {
      this.AllEventsList = data.data;
      this.populateSportEventCounts()
    })
  }

  //function to get the length of tournaments in a Specific Sport
  getEventCountBySportId(sportId: any): number {
    if (this.AllEventsList && this.AllEventsList[sportId]) {
      const eventsForSport = this.AllEventsList[sportId];
      return eventsForSport.length;
    } else {
      return 0;
    }
  }
  populateSportEventCounts() {
    if (!this.AllEventsList) {
      return;
    }

    this.sportEventCounts = this.sportIds.map((sportId: any) => {
      return {
        sportId: sportId,
        eventCount: this.getEventCountBySportId(sportId)
      };
    });
  }
  //function to get the length of individual tournaments
  getIndividualEventCountBySportId(sportId: any) {
    if (this.AllEventsList && this.AllEventsList[sportId]) {
      const tournamentsArray = this.AllEventsList[sportId]
      if (tournamentsArray !== null) {
        this.tournamentIds = tournamentsArray.map((item: any) => item.tournamentId)
        if (this.tournamentIds !== null) {
          this.tournamentIds.forEach((count: any) => {
            this.tournamentCounts[count] = (this.tournamentCounts[count] || 0) + 1
          })
        }
      }
    }
  }
  sportBtnsColors = [
    {
      colorValue: '#20327b',
      isActive: false
    },
    {
      colorValue: '#f18521',
      isActive: false
    },
    {
      colorValue: '#03b37f',
      isActive: false
    },
    {
      colorValue: '#9e4025',
      isActive: false
    },
    {
      colorValue: '#e89780',
      isActive: false
    },
    {
      colorValue: '#fbb03b',
      isActive: false
    },
    {
      colorValue: '#11b24b',
      isActive: false
    },
    {
      colorValue: '#e44e23',
      isActive: false
    },
    {
      colorValue: '#0e345e',
      isActive: false
    },
    {
      colorValue: '#d592ff',
      isActive: false
    },
    {
      colorValue: '#d3393d',
      isActive: false
    },
  ]
  sportbackgrndClass: { [id: number]: string } = {
    1: 'active-soccer-sport',
    2: 'active-tennis-sport',
    4: 'active-cricket-sport',
    7: 'active-horseracing-sport',
    7522: 'active-basketball-sport',
    4339: 'active-greyhound-sport',
    66102: 'active-casino-sport',
    66101: 'active-virtual-sport',
    237896: 'active-politics-sport',
    66103: 'active-binary-sport',
    27979456: 'active-kabbadi-sport'
  };



}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

