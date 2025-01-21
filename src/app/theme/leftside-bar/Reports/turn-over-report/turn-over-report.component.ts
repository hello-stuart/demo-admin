import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbDatepicker, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { CustomizedDatepickerComponent } from '../../../../Components/customized-datepicker/customized-datepicker.component';
import { BackendService } from '../../../../services/backend.service';
@Component({
  selector: 'app-turn-over-report',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTablesModule, NgbDatepickerModule, CustomizedDatepickerComponent],
  templateUrl: './turn-over-report.component.html',
  styleUrl: './turn-over-report.component.css',
})
export class TurnOverReportComponent implements OnInit, AfterViewInit {
  
  @ViewChild('dpFrom') datepickerFromInstance!: NgbDatepicker
  @ViewChild('dpTo') datepickerToInstance!: NgbDatepicker
  clientSearchInput: boolean = false
  dtOptions: Config = {};
  model!: NgbDateStruct;
  fromDate!: NgbDateStruct;
  toDate!:NgbDateStruct;
  fromMonth!: number
  fromYear!: number
  toMonth!:number
  toYear!:number
  fromFormattedRange: string = ''; // For binding to input field
  toFormattedRange: string = ''; // For binding to input field
  isFromYearNav: boolean = false;
  isToYearNav: boolean = false;
  fromYears: { value: number, isSelected: boolean }[] = [];
  toYears: { value: number, isSelected: boolean }[] = [];
  isFromMonth: boolean = true;
  isFromYear: boolean = true;
  isToMonth: boolean = true;
  isToYear: boolean = true;
  monthsNavigationFirst!: any;
  monthsNavigationSecond!: any
  filterDate:any
  fromYearNav!: any
  toYearNav!: any
  dpBodyFirst!: any;
  dpBodySecond!: any;
  dataSource = "";
  public today = new Date();
  public startDate: any = {
    date: {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate(),
    },
  };
  public maxDate: any = {
    date: {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate(),
    },
  };
  rangeDate:any;

  constructor(private calender: NgbCalendar, private renderer: Renderer2, private backendService:BackendService) {
    const today = calender.getToday();
    this.fromDate = today
    this.toDate=today
    this.fromMonth = this.fromDate.month
    this.fromYear = this.fromDate.year
    this.toMonth = this.toDate.month
    this.toYear = this.toDate.year
    this.fromFormattedRange = this.formatDate(this.fromDate);
    this.toFormattedRange= this.formatDate(this.toDate)
    this.startDate = { year: today.year, month: today.month, day: today.day };
    this.maxDate = {
      year: this.fromYear,
      month: this.fromMonth,
      day: today.day,
    };
  }
  ngAfterViewInit(): void {
    this.initCustomDp()
  }

  

  initCustomDp() {
    // dp stands for DatePicker
    //whole from date picker Instance
    const dpFromInstance = document.querySelector('.ngb-from-dp-container');
    //whole to date picker Instance
    const dpToInstance = document.querySelector('.ngb-to-dp-container');
    //dp from days and week template body
    const datePickerFromBody = dpFromInstance?.childNodes[3] as HTMLElement
    //dp to days and week template body
    const datePickerToBody = dpToInstance?.childNodes[3] as HTMLElement
    //dp from body without header
    const dpFromContentScreen = dpFromInstance?.childNodes[3].childNodes[0] as HTMLElement
    //dp to body without header
    const dpToContentScreen = dpToInstance?.childNodes[3].childNodes[0] as HTMLElement
    //dp custom from-screen month navigation
    this.monthsNavigationFirst = document.querySelector('.months-navigation-first') as HTMLElement
    //dp custom to-screen month navigation
    this.monthsNavigationSecond = document.querySelector('.months-navigation-second') as HTMLElement
    //dp custom month and year section for from-screen
    const screen1DateNav = document.querySelector('.screen1-date-navigation') as HTMLElement
    //dp custom month and year section for to-screen
    const screen2DateNav = document.querySelector('.screen2-date-navigation') as HTMLElement
    //dp custom from year navigation
    this.fromYearNav = document.querySelector('.from-year-navigation') as HTMLElement
    //dp custom to year navigation
    this.toYearNav = document.querySelector('.to-year-navigation') as HTMLElement
    //dp custom from-screen chevron navigation
    const dpNavChevronFirst = document.querySelector('.dp-nav-chevron-first') as HTMLElement
    //dp custom to-screen chevron navigation
    const dpNavChevronSecond = document.querySelector('.dp-nav-chevron-second') as HTMLElement
    //dp custom from-year navigation btn
    const fromYearBtn = document.querySelector('.from-year-btn') as HTMLElement
    //dp custom from-month navigation btn
    const fromMonthBtn = document.querySelector('.from-month-btn') as HTMLElement
    //dp custom to-year navigation btn
    const toYearBtn = document.querySelector('.to-year-btn') as HTMLElement
    //dp custom to-month navigation btn
    const toMonthBtn = document.querySelector('.to-month-btn') as HTMLElement

    //removing from dp header
    let dpFromHeader = dpFromInstance?.childNodes[2]
    dpFromHeader?.childNodes[0].remove()
    //removing to dp header
    let dpToHeader = dpToInstance?.childNodes[2]
    dpToHeader?.childNodes[0].remove()

    // dp from month for insertion
    this.dpBodyFirst = datePickerFromBody?.childNodes[0].childNodes[1] as HTMLElement
    // dp to month for insertion
    this.dpBodySecond = datePickerToBody.childNodes[0].childNodes[1] as HTMLElement

    //inserting chevron sections in first screens
    dpFromContentScreen.insertAdjacentElement('afterbegin', dpNavChevronFirst)
    //inserting from date and year navigation btns section
    dpFromContentScreen.insertAdjacentElement('afterbegin', screen1DateNav);
    //appending from month navigation section in screen
    dpFromContentScreen.appendChild(this.monthsNavigationFirst);
    //appending from year navigation section in screen
    dpFromContentScreen.appendChild(this.fromYearNav)

    //inserting chevron sections in second screens
    dpToContentScreen.insertAdjacentElement('afterbegin', dpNavChevronSecond)
    //inserting to date and year navigation btns section
    dpToContentScreen.insertAdjacentElement('afterbegin', screen2DateNav);
    //appending to month navigation section in screen
    dpToContentScreen.appendChild(this.monthsNavigationSecond);
    //appending to year navigation section in screen
    dpToContentScreen.appendChild(this.toYearNav)

    // attaching eventlisteners for first screen through render2
    this.attachEventListeners(fromMonthBtn, 'fromMonth');
    this.attachEventListeners(fromYearBtn, 'fromYear');

    // attaching eventlisteners for first screen through render2
    this.attachEventListeners(toMonthBtn, 'toMonth');
    this.attachEventListeners(toYearBtn, 'toYear');
  }
  attachEventListeners(element: HTMLElement | null, type: string): void {
    if (element) {
      this.renderer.listen(element, 'click', () => {
        if (type === 'fromMonth') {
          this.handleMonthClick(type);
        } else if (type === 'fromYear') {
          this.handleYearClick(type);
        } else if(type === 'toMonth'){
          this.handleMonthClick(type)
        } else if(type === 'toYear'){
          this.handleYearClick(type)
        }
      });
    }
  }
  handleMonthClick(key:string): void {
    if(key==='fromMonth'){
      // Your logic for handling from-month click
      this.isFromYear = !this.isFromYear;
      // Add or remove classes as needed
      this.dpBodyFirst.classList.remove('display-block')
      this.dpBodyFirst.classList.add('display-none')
      this.monthsNavigationFirst.classList.remove('display-none')
      this.monthsNavigationFirst.classList.add('display-flex')
    }else if(key==='toMonth'){
      // Your logic for handling from-month click
      this.isToYear = !this.isToYear;
      // Add or remove classes as needed
      this.dpBodySecond.classList.remove('display-block')
      this.dpBodySecond.classList.add('display-none')
      this.monthsNavigationSecond.classList.remove('display-none')
      this.monthsNavigationSecond.classList.add('display-flex')
    }
  }
  handleYearClick(key:string): void {
    if(key==='fromYear'){
      // Your logic for handling from-year click
      this.dpBodyFirst.classList.remove('display-block')
      this.dpBodyFirst.classList.add('display-none')
      this.fromYearNav.classList.remove('display-none')
      this.fromYearNav.classList.add('display-flex')
      this.isFromMonth = !this.isFromMonth
      this.isFromYearNav = !this.isFromYearNav
      // Add or remove classes as needed
    }else if(key==='toYear'){
      // Your logic for handling from-year click
      this.dpBodySecond.classList.remove('display-block')
      this.dpBodySecond.classList.add('display-none')
      this.toYearNav.classList.remove('display-none')
      this.toYearNav.classList.add('display-flex')
      this.isToMonth = !this.isToMonth
      this.isToYearNav = !this.isToYearNav
      // Add or remove classes as needed
    }
  }

  onFromMonthSelect(month: any, index: number, navigation: string): void {
      // Deselect all months
      this.dpMonthsFisrt.forEach((m) => (m.isSelected = false));
      // Set the selected month
      month.isSelected = true
      this.fromMonth = index + 1
      this.toggleNavigation(navigation);
      this.fromDate = { month: this.fromMonth, year: this.fromYear, day: 1 }
      this.datepickerFromInstance.navigateTo(this.fromDate)
  }
  onToMonthSelect(month: any, index: number, navigation: string): void {
      // Deselect all months
      this.dpMonthsSecond.forEach((m) => (m.isSelected = false));
      // Set the selected month
      month.isSelected = true
      this.toMonth = index + 1
      this.toggleNavigation(navigation);
      this.toDate = { month: this.toMonth, year: this.toYear, day: 1 }
      this.datepickerToInstance.navigateTo(this.toDate)
  }
  onFromYearSelect(year: any, index: number, navigation: string) {
    // Deselect all years
    let yearIndex;
    this.fromYears.forEach((y) => (y.isSelected = false));
    // Set the selected year
    year.isSelected = true
    yearIndex = index
    this.fromYear = this.fromYears[yearIndex].value
    this.toggleNavigation(navigation);
    this.fromDate = { month: this.fromMonth, year: this.fromYear, day: 1 }
    this.datepickerFromInstance.navigateTo(this.fromDate)
  }
  onToYearSelect(year: any, index: number, navigation: string) {
    // Deselect all years
    let yearIndex;
    this.toYears.forEach((y) => (y.isSelected = false));
    // Set the selected year
    year.isSelected = true
    yearIndex = index
    this.toYear = this.toYears[yearIndex].value
    this.toggleNavigation(navigation);
    this.toDate = { month: this.toMonth, year: this.toYear, day: 1 }
    this.datepickerToInstance.navigateTo(this.toDate)
  }

  // Toggle function to switch between custom navigation and original datepicker body
  toggleNavigation(navigation: any): void {
    const monthsNavigationFirst = document.querySelector('.months-navigation-first') as HTMLElement;
    const fromYearNav = document.querySelector('.from-year-navigation') as HTMLElement;
    const monthsNavigationSecond = document.querySelector('.months-navigation-second') as HTMLElement;
    const toYearNav = document.querySelector('.to-year-navigation') as HTMLElement;
    // If custom navigation is visible, replace it back with the original datepicker body
    if (navigation === 'from-month') {
      this.dpBodyFirst?.classList.remove('display-none')
      this.dpBodyFirst?.classList.add('display-block')
      monthsNavigationFirst.classList.remove('display-flex')
      monthsNavigationFirst.classList.add('display-none')
      this.isFromYear = !this.isFromYear
    } 
    else if(navigation === 'to-month'){
      this.dpBodySecond?.classList.remove('display-none')
      this.dpBodySecond?.classList.add('display-block')
      monthsNavigationSecond.classList.remove('display-flex')
      monthsNavigationSecond.classList.add('display-none')
      this.isToYear = !this.isToYear
    }
    // If original datepicker body is visible, replace it with the custom navigation
    else if (navigation === 'from-year') {
      this.dpBodyFirst?.classList.remove('display-none')
      this.dpBodyFirst?.classList.add('display-block')
      fromYearNav.classList.remove('display-flex')
      fromYearNav.classList.add('display-none')
      this.isFromMonth = !this.isFromMonth
      this.isFromYearNav = !this.isFromYearNav
    }
    else if(navigation === 'to-year'){
      this.dpBodySecond?.classList.remove('display-none')
      this.dpBodySecond?.classList.add('display-block')
      toYearNav.classList.remove('display-flex')
      toYearNav.classList.add('display-none')
      this.isToMonth = !this.isToMonth
      this.isToYearNav = !this.isToYearNav
    }
  }

  onInputFocus() {
    this.clientSearchInput = true;
  }
  onFromDateSelect(date: any) {
    this.fromFormattedRange = this.formatDate(date);
  }
  onToDateSelect(date: any) {
    this.toFormattedRange = this.formatDate(date);
  }


  private formatDate(date: NgbDateStruct): string {
    if (date) {
      const day = date.day < 10 ? `0${date.day}` : date.day;
      const month = date.month < 10 ? `0${date.month}` : date.month;
      return `${day}/${month}/${date.year}`;
    }
    return '';
  }
  prevYear(key:string) {
    if(key=='from'){
      this.fromYear--
      this.fromDate = { month: this.fromMonth, year: this.fromYear, day: 1 }
      this.datepickerFromInstance.navigateTo(this.fromDate)
    }else if(key==='to'){
      this.toYear--
      this.toDate = { month: this.toMonth, year: this.toYear, day: 1 }
      this.datepickerToInstance.navigateTo(this.toDate)
    }
  }
  nextYear(key:string) {
    if(key==='from'){
      this.fromYear++
      this.fromDate = { month: this.fromMonth, year: this.fromYear, day: 1 }
      this.datepickerFromInstance.navigateTo(this.fromDate)
    }else if(key === 'to'){
      this.toYear++
      this.toDate = { month: this.toMonth, year: this.toYear, day: 1 }
      this.datepickerToInstance.navigateTo(this.toDate)
    }
  }
  prevMonth(key:string) {
    if(key === 'from'){
      if (this.fromMonth === 1) {
        this.fromMonth = 13
        this.fromYear--
      }
      this.fromMonth--
      this.fromDate = { month: this.fromMonth, year: this.fromYear, day: 1 }
      this.datepickerFromInstance.navigateTo(this.fromDate)
    }
    else if(key === 'to'){
      if (this.toMonth === 1) {
        this.toMonth = 13
        this.toYear--
      }
      this.toMonth--
      this.toDate = { month: this.toMonth, year: this.toYear, day: 1 }
      this.datepickerToInstance.navigateTo(this.toDate)
    }
  }
  nextMonth(key:string) {
    if(key==='from'){
      if (this.fromMonth === 12) {
        this.fromMonth = 0
        this.fromYear++
      }
      this.fromMonth++
      this.fromDate = { month: this.fromMonth, year: this.fromYear, day: 1 }
      this.datepickerFromInstance.navigateTo(this.fromDate)
    }
    else if(key === 'to'){
      if (this.toMonth === 12) {
        this.toMonth = 0
        this.toYear++
      }
      this.toMonth++
      this.toDate = { month: this.toMonth, year: this.toYear, day: 1 }
      this.datepickerToInstance.navigateTo(this.toDate)
    }
  }
  generateFromYears(): void {
    this.fromYears = [];
    const startYear = Math.floor(this.fromYear / 10) * 10; // Calculate the start of the decade
    for (let i = 0; i < 10; i++) {
      const yearValue = startYear + i;
      this.fromYears.push({
        value: yearValue,
        isSelected: yearValue === this.fromYear
      });
    }
  }
  generateToYears(): void {
    this.toYears = [];
    const startYear = Math.floor(this.fromYear / 10) * 10; // Calculate the start of the decade
    for (let i = 0; i < 10; i++) {
      const yearValue = startYear + i;
      this.toYears.push({
        value: yearValue,
        isSelected: yearValue === this.fromYear
      });
    }
  }


  previousYears(key:string): void {
    if(key==='from'){
      this.fromYear -= 10;
      this.generateFromYears();
    }else if(key === 'to'){
      this.toYear -= 10;
      this.generateToYears();
    }
  }

  nextYears(key:string): void {
    if(key === 'from'){
      this.fromYear += 10;
      this.generateFromYears();
    }
    else if(key === 'to'){
      this.toYear += 10;
      this.generateToYears();
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
      ordering:false,
      search:false,
      searching:false,
      paging:false,
      language: {
        lengthMenu: '',
        search: '',
        searchPlaceholder: '',
        emptyTable: 'There are no records to show',
        entries: '',
        info: '',
        infoFiltered: ''
      },
      
    };
    this.generateFromYears()
    this.generateToYears()
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
  dpMonthsSecond = [
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

  receiveRangeDate(data:any){
    this.rangeDate=data
  }

  onDataSourceChange(newValue: string) {
    const tempDate= this.backendService.dateManager(newValue);
    this.filterDate=tempDate
  }
}