import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-current-bets',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTablesModule],
  templateUrl: './current-bets.component.html',
  styleUrl: './current-bets.component.css'
})
export class CurrentBetsComponent {
  constructor() {}
  clientSearchInput: boolean = false
  dpInput: boolean = false;
  dtOptions: Config = {};
  isSports:boolean=true;
  isCasino:boolean=false;
  onInputFocus() {
    this.clientSearchInput = true;
  }
  onDpInputFocus() {
    this.dpInput = !this.dpInput;
  }
  toggleSwitch(key:string){
    if(key==='sport'){
      this.isSports=true;
      this.isCasino=false;
    }else if(key==='casino'){
      this.isSports=false;
      this.isCasino=true
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    const clickedInside = targetElement.closest('.col-lg-3');

    if (!clickedInside) {
      this.clientSearchInput = false;
    }
  }
  

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',

      language: {
        lengthMenu: 'show _MENU_ entries',
        search: '',
        searchPlaceholder: 'Search...',
        emptyTable: 'There are no records to show',
        entries: '',
        info: '',
        infoFiltered: ''
      }
    };

  }
}
