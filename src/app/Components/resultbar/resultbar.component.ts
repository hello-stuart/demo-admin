import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-resultbar',
  standalone: true,
  imports: [ NgIf, NgClass,NgFor],
  templateUrl: './resultbar.component.html',
  styleUrl: './resultbar.component.css'
})
export class ResultbarComponent implements OnInit {
  @Input() viewClassis: any

  // isDropdownOpen: boolean = true;
  resultArray: any = [];
  selectedResult: any;
  eventid: any;
  game: any;
  roundId: any;
  currentTheme = 'light';
  day: boolean = true;
  myjson: any = JSON;
  marketName: any;
  isDesktop: any;
  isMobile: any;
  sValues: any = [];
  hValues: any = [];
  cValues: any = [];
  dValues: any = [];
  updatedRoundId: any;
  resultDeclared: any;
  matchedBetList: any = [];
  eventId: any;
  filteredResults: any;
  rulesBox: any;
  roundTime: any;

  // toggleDropdown(result: any): void {
  //   this.isDropdownOpen = !this.isDropdownOpen;
  //   this.setResults(result);
  // }


  constructor(private backendService: BackendService, private route: ActivatedRoute) {

    this.eventId = this.route.snapshot.params['id'];
    // console.log(this.eventId, 'this.eventId,,,,,,,')


  }

  ngOnInit(): void {
    // console.log(this.viewClassis)
    this.backendService.getRoundId().subscribe(res => {
      this.updatedRoundId = res.roundId;
      this.roundTime = res.createdAt;
      // console.log(this.roundTime, 'this.roundTime,,,,,,,,')
    });

    this.route.children.forEach(child => {
      child.params.subscribe(params => {
        const id = params['id'] || 0
        this.eventid = id;

        // console.log(this.eventId, 'this.eventId........')
      })
    });

    this.backendService.getResultstream().subscribe((res: any) => {
      this.resultArray = res;
      // console.log( this.resultArray,'this.resultArray,,,,,,,,,,,')
      this.filteredResults = this.resultArray?.slice(0, 5);
      // console.log(this.resultArray, 'this.resultArray,,,,,,,,,,')
    });
    this.backendService.getMatchbetsListData().subscribe((result: any) => {
      this.matchedBetList = result;
      // console.log(this.selectedResult, 'this.selectedResult... iefan')
    })

  }
  resetEdit() {
    localStorage.setItem('Edit', '');
  }
  worliSplitter(winnerResult: any) {
    if (winnerResult) {
      let split_arr: any = []
      split_arr = winnerResult?.split('@@');
      winnerResult = split_arr[1] + ' - ' + split_arr[2];
    }

    return winnerResult;
  }

  setResults(result: any, marketName?: any) {
    this.selectedResult = result;
    this.marketName = marketName;
    // console.log(this.selectedResult, 'this.selectedResult,,,,,,,');
    this.backendService.setSelectedResult(this.selectedResult);
    if (result.eventId == '99.0046' || result.eventId == '99.0047' || result.eventId == '99.0048') {
      this.sValues = [];
      this.hValues = [];
      this.cValues = [];
      this.dValues = [];

      for (const key in result?.cards) {
        if (result?.cards.hasOwnProperty(key)) {
          const value = result?.cards[key];
          if (value.startsWith("S")) {
            this.sValues.push(value);
          } else if (value.startsWith("H")) {
            this.hValues.push(value);
          } else if (value.startsWith("D")) {
            this.dValues.push(value);
          } else if (value.startsWith("C")) {
            this.cValues.push(value);
          }
        }
      }
    }

  }

  checkEventId(): boolean {
    return (
      this.eventId === '99.0010' ||
      this.eventId === '99.0030' ||
      this.eventId === '99.0019' ||
      this.eventId === '99.0001' ||
      this.eventId === '99.0021' ||
      this.eventId === '99.0025' ||
      this.eventId === '99.0002' ||
      this.eventId === '99.0013' ||
      this.eventId === '99.0018' ||
      this.eventId === '99.0032' ||
      this.eventId === '99.0014' ||
      this.eventId === '99.0006' ||
      this.eventId === '99.0034' ||
      this.eventId === '99.0031' ||
      this.eventId === '99.0046' ||
      this.eventId === '99.0036' ||
      this.eventId === '99.0034' ||
      this.eventId === '99.0023' ||
      this.eventId === '99.0005' ||
      this.eventId === '99.0020' ||
      this.eventId === '99.0004' ||
      this.eventId === '99.0041' ||
      this.eventId === '99.0022' ||
      this.eventId === '99.0051' ||
      this.eventId === '99.0060' ||
      this.eventId === '99.0007' ||
      this.eventId === '99.0050' ||
      this.eventId === '99.0056' ||
      this.eventId === '99.0057' ||
      this.eventId === '99.0059' ||
      this.eventId === '99.0027' ||
      this.eventId === '99.0055' ||
      this.eventId === '88.0019' ||
      this.eventId === '88.0020' ||
      this.eventId === '88.0021'
    );
  }

}
