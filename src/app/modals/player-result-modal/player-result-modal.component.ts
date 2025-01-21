import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-player-result-modal',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './player-result-modal.component.html',
  styleUrl: './player-result-modal.component.css'
})
export class PlayerResultModalComponent implements OnInit {
  subscription!: Subscription;
  selectedResult: any;
  showdata: boolean = false;
  eventid: any;
  MoreClose = 'MORE';
  marketName: any;
  sValues: any = [];
  hValues: any = [];
  cValues: any = [];
  dValues: any = [];

  constructor(private backendService: BackendService, private route: ActivatedRoute,) {


  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const modalElement = document.getElementById('ResultModla');
    if (modalElement && !modalElement.contains(event.target as Node)) {
      this.showdata = false;
      this.MoreClose = 'MORE';
    }
  }

  ngOnInit(): void {
    this.backendService.getSelectedResult().subscribe(result => {
      this.selectedResult = result;
      // console.log(this.selectedResult);
      this.eventid = result.eventId;

      if (this.selectedResult.eventId == '99.0046' || this.selectedResult.eventId == '99.0047' || this.selectedResult.eventId == '99.0048') {
        this.sValues = [];
        this.hValues = [];
        this.cValues = [];
        this.dValues = [];

        for (const key in this.selectedResult?.cards) {
          if (result?.cards.hasOwnProperty(key)) {
            const value = this.selectedResult?.cards[key];
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

      // console.log(this.selectedResult, '=========')
    })

    this.subscription = this.backendService.getvidoeId().subscribe((id: string) => {
      // console.log('======')
      this.eventid = id;
      //  console.log('res Video',this.eventid);
    });

  }
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.selectedResult = '';
    // console.log('destory')
  }

  splitMarketName(marketName: string): string {
    const index = marketName.indexOf('(');
    if (index !== -1) {
      return marketName.substring(0, index).trim();
    }
    return marketName;
  }
  worliSplitter(winnerResult: any) {
    if (winnerResult) {
      let split_arr: any = []
      split_arr = winnerResult?.split('@@');
      winnerResult = split_arr[1] + ' - ' + split_arr[2];
    }

    return winnerResult;
  }
  splitmarketname(marketName: string): string {
    const index = marketName.indexOf('.');
    if (index !== -1) {
      return marketName.substring(index + 1).trim();
    }
    return marketName;
  }
  textInvert() {
    this.showdata = !this.showdata;
    if (this.showdata) {
      this.MoreClose = 'HIDE'
    }
    else {
      this.MoreClose = 'MORE';
    }
  }

  capitalize(value: string): string {
    if (!value) return '';
    return value.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  getRunnerIds(runners: { [key: number]: string }): number[] {
    return Object.keys(runners).map(key => parseInt(key, 10));
  }
}

