import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbDatepicker, NgbDatepickerModule, NgbDateStruct, NgbDropdownMenu, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-our-casino-result',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTablesModule, NgbDatepickerModule, NgbDropdownModule, NgbDropdownMenu],
  templateUrl: './our-casino-result.component.html',
  styleUrl: './our-casino-result.component.css',
})
export class OurCasinoResultComponent implements OnInit, AfterViewInit {
  constructor(private calender:NgbCalendar, private renderer:Renderer2){
    const today=calender.getToday();
    this.date=today
    this.month=today.month
    this.year=today.year
    this.formattedRange = this.formatDate(today);
  }
  @ViewChild('dp') datepickerInstance!:NgbDatepicker
  clientSearchInput: boolean = false
  dtOptions: Config = {};
  model!: NgbDateStruct;
  date!:NgbDateStruct;
  month!:number
  year!:number
  formattedRange: string = ''; // For binding to input field
  isYearNav:boolean=false;
  years: { value: number, isSelected: boolean }[] = [];
  isMonth: boolean = true;
  isYear: boolean = true;
  monthsNavigationFirst!: any;
  fromYearNav!: any
  dpBody!:any;
  ngAfterViewInit(): void {
      this.initCustomDp()
  }

  initCustomDp(){
// dp stands for DatePicker
    //whole date picker Instance
    const dpInstance = document.querySelector('.ngb-dp-container');
    //dp days and week template body
    const datePickerBody = document.querySelector('.ngb-dp-content') as HTMLElement
    //dp body without header
    const dpContentScreen = document.querySelector('.ngb-dp-month') as HTMLElement
    //dp custom from-screen month navigation
    this.monthsNavigationFirst = document.querySelector('.months-navigation-first') as HTMLElement
    //dp custom month and year section for from-screen
    const screen1DateNav = document.querySelector('.screen1-date-navigation') as HTMLElement
    //dp custom year navigation
    this.fromYearNav = document.querySelector('.from-year-navigation') as HTMLElement
     //dp custom from-screen chevron navigation
     const dpNavChevronFirst = document.querySelector('.dp-nav-chevron-first') as HTMLElement
     //dp custom from-year navigation btn
    const yearBtn = document.querySelector('.from-year-btn') as HTMLElement
    //dp custom from-month navigation btn
    const monthBtn = document.querySelector('.from-month-btn') as HTMLElement
    //removing dp header
    let dpHeader = dpInstance?.childNodes[2]
    dpHeader?.childNodes[0].remove()

    this.dpBody= datePickerBody?.childNodes[0].childNodes[1] as HTMLElement

    //inserting chevron sections in both screens
    dpContentScreen.insertAdjacentElement('afterbegin', dpNavChevronFirst)
    //inserting date and year navigation btns section
    dpContentScreen.insertAdjacentElement('afterbegin', screen1DateNav);
    //appending month navigation section in screen
    dpContentScreen.appendChild(this.monthsNavigationFirst);
    //appending year navigation section in screen
    dpContentScreen.appendChild(this.fromYearNav)

    //attaching eventlisteners through render2
    this.attachEventListeners(monthBtn, 'fromMonth');
    this.attachEventListeners(yearBtn, 'fromYear');
  }
  attachEventListeners(element: HTMLElement | null, type: string): void {
    if (element) {
      this.renderer.listen(element, 'click', () => {
        if (type === 'fromMonth') {
          this.handleMonthClick();
        } else if (type === 'fromYear') {
          this.handleYearClick();
        }
      });
    }
  }
  handleMonthClick(): void {
    // Your logic for handling from-month click
    this.isYear = !this.isYear;
    // Add or remove classes as needed
    this.dpBody.classList.remove('display-block')
    this.dpBody.classList.add('display-none')
    this.monthsNavigationFirst.classList.remove('display-none')
    this.monthsNavigationFirst.classList.add('display-flex')
  }
  handleYearClick(): void {
    // Your logic for handling from-year click
    this.dpBody.classList.remove('display-block')
    this.dpBody.classList.add('display-none')
    this.fromYearNav.classList.remove('display-none')
    this.fromYearNav.classList.add('display-flex')
    this.isMonth = !this.isMonth
    this.isYearNav = !this.isYearNav
    // Add or remove classes as needed
  }

  onFromMonthSelect(month: any, index: number, navigation: string): void {
    // Deselect all months
      this.dpMonthsFisrt.forEach((m) => (m.isSelected = false));
      // Set the selected month
      month.isSelected = true
      this.month = index + 1
      this.toggleNavigation(navigation);
      this.date = { month: this.month, year: this.year, day: 1 }
      this.datepickerInstance.navigateTo(this.date)
  }
  onYearSelect(year: any, index: number, navigation: string) {
    // Deselect all years
      let yearIndex;
      this.years.forEach((y) => (y.isSelected = false));
      // Set the selected year
      year.isSelected = true
      yearIndex = index
      this.year = this.years[yearIndex].value
      this.toggleNavigation(navigation);
      this.date = { month: this.month, year: this.year, day: 1 }
      this.datepickerInstance.navigateTo(this.date)
  }

   // Toggle function to switch between custom navigation and original datepicker body
   toggleNavigation(navigation: any): void {
    const monthsNavigationFirst = document.querySelector('.months-navigation-first') as HTMLElement;
    const fromYearNav = document.querySelector('.from-year-navigation') as HTMLElement;
    // If custom navigation is visible, replace it back with the original datepicker body
    if (navigation === 'month') {
      this.dpBody?.classList.remove('display-none')
      this.dpBody?.classList.add('display-block')
      monthsNavigationFirst.classList.remove('display-flex')
      monthsNavigationFirst.classList.add('display-none')
      this.isYear = !this.isYear
    }
    // If original datepicker body is visible, replace it with the custom navigation
    else if (navigation === 'year') {
      this.dpBody?.classList.remove('display-none')
      this.dpBody?.classList.add('display-block')
      fromYearNav.classList.remove('display-flex')
      fromYearNav.classList.add('display-none')
      this.isMonth = !this.isMonth
      this.isYearNav = !this.isYearNav
    }
  }

  onInputFocus() {
    this.clientSearchInput = true;
  }
  onDateSelect(date:any) {
    this.formattedRange = this.formatDate(date);
  }

  private formatDate(date: NgbDateStruct): string {
    if (date) {
      const day = date.day < 10 ? `0${date.day}` : date.day;
      const month = date.month < 10 ? `0${date.month}` : date.month;
      return `${day}/${month}/${date.year}`;
    }
    return '';
  }
  prevYear() {
    this.year--
    this.date={month:this.month,year:this.year,day:1}
    this.datepickerInstance.navigateTo(this.date)
  }
  nextYear() {
    this.year++
    this.date={month:this.month,year:this.year,day:1}
    this.datepickerInstance.navigateTo(this.date)
  }
  prevMonth() {
    if(this.month===1){
      this.month=13
      this.year--
    }
    this.month--
    
    this.date={month:this.month,year:this.year,day:1}
    this.datepickerInstance.navigateTo(this.date)
  }
  nextMonth() {
    if(this.month===12){
      this.month=0
      this.year++
    }
    this.month++
    this.date={month:this.month,year:this.year,day:1}
    this.datepickerInstance.navigateTo(this.date)
  }
  generateYears(): void {
    this.years = [];
    const startYear = Math.floor(this.year / 10) * 10; // Calculate the start of the decade
    for (let i = 0; i < 10; i++) {
      const yearValue = startYear + i;
      this.years.push({
        value: yearValue,
        isSelected: yearValue === this.year
      });
    }
  }

  previousYears(): void {
    this.year -= 10;
    this.generateYears();
  }

  nextYears(): void {
    this.year += 10;
    this.generateYears();
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
    this.generateYears()
  }

  dpMonthsFisrt = [
    {
      value: 'Jan',
      isSelected: false
    },
    {
      value: 'Feb',
      isSelected: false
    },
    {
      value: 'Mar',
      isSelected: false
    },
    {
      value: 'Apr',
      isSelected: false
    },
    {
      value: 'May',
      isSelected: false
    },
    {
      value: 'Jun',
      isSelected: false
    },
    {
      value: 'Jul',
      isSelected: false
    },
    {
      value: 'Aug',
      isSelected: false
    },
    {
      value: 'Sep',
      isSelected: false
    },
    {
      value: 'Oct',
      isSelected: false
    },
    {
      value: 'Nov',
      isSelected: false
    },
    {
      value: 'Dec',
      isSelected: false
    },
  ]
}
