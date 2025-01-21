import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Config } from 'datatables.net';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
@Component({
  selector: 'app-win-loss',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTablesModule],
  templateUrl: './win-loss.component.html',
  styleUrl: './win-loss.component.css'
})
export class WinLossComponent {
  @ViewChild('datePickerInput', { static: true }) datePickerInput!: ElementRef;
  clientSearchInput:boolean=false
  dtOptions: Config = {};

 
  onInputFocus(){
    this.clientSearchInput=true;
  }
  onInputBlur(){
    this.clientSearchInput=false;
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
      ordering:false,
      language:{
        lengthMenu:'',
        search:'',
        searchPlaceholder:'Search...',
        emptyTable:'There are no records to show',
        entries:'',
        info:'',
        infoFiltered:''
        
      }
    };
  }
}
