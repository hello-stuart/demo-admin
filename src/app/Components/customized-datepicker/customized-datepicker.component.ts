//Imports
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterViewInit , OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDatepicker, NgbDatepickerModule, NgbDateStruct, NgbDropdownMenu, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../../services/backend.service';
@Component({
  selector: 'app-customized-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDatepickerModule, NgbDropdownModule, NgbDropdownMenu],
  templateUrl: './customized-datepicker.component.html',
  styleUrl: './customized-datepicker.component.css'
})
export class CustomizedDatepickerComponent implements OnInit, AfterViewInit, OnChanges {
  //Declarations
  @ViewChild('dpFrom') datepickerFromInstance!: NgbDatepicker
  @ViewChild('dpTo') datepickerToInstance!: NgbDatepicker
  @Output() rangeDate: EventEmitter<{ startDate: string, endDate: string }> = new EventEmitter();
  @Input() filterDateVal!:any;
  @Input() resetDate!:any;
  isInitialized:boolean=false;
  clientSearchInput: boolean = false
  model!: NgbDateStruct;
  fromDate!: NgbDateStruct;
  selectedFromDate:any
  selectedToDate:any
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
  fromYearNav!: any
  toYearNav!: any
  dpBodyFirst!: any;
  dpBodySecond!: any;
  public today = new Date();
  currentDate:NgbDate;
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

  constructor(private calender: NgbCalendar, private renderer: Renderer2, private backendService: BackendService,) {
    const today = calender.getToday();
    this.currentDate = new NgbDate(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate());
    this.fromDate =  today
    this.toDate= today
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

  ngOnInit(): void {
    this.generateFromYears()
    this.generateToYears()
  }

  ngAfterViewInit() {
    
      this.initCustomDp()
    ;
  }

  ngOnChanges() {
    if (this.filterDateVal) {
      this.datepickerFromInstance.navigateTo(this.filterDateVal.date)
      this.fromMonth=this.filterDateVal.date.month;
      this.fromYear=this.filterDateVal.date.year;
      this.onFromDateSelect(this.filterDateVal.date)
    }
    if(this.resetDate){
      this.datepickerFromInstance.navigateTo(this.currentDate)
      this.datepickerToInstance.navigateTo(this.currentDate)
      this.onFromDateSelect(this.currentDate)
      this.onToDateSelect(this.currentDate)
    }
  }

  initCustomDp() {
    const dpFromInstance = document.querySelector('.ngb-from-dp-container');
    const dpToInstance = document.querySelector('.ngb-to-dp-container');
    const datePickerFromBody = dpFromInstance?.childNodes[3] as HTMLElement
    const datePickerToBody = dpToInstance?.childNodes[3] as HTMLElement
    const dpFromContentScreen = dpFromInstance?.childNodes[3].childNodes[0] as HTMLElement
    const dpToContentScreen = dpToInstance?.childNodes[3].childNodes[0] as HTMLElement
    this.monthsNavigationFirst = document.querySelector('.months-navigation-first') as HTMLElement
    this.monthsNavigationSecond = document.querySelector('.months-navigation-second') as HTMLElement
    const screen1DateNav = document.querySelector('.screen1-date-navigation') as HTMLElement
    const screen2DateNav = document.querySelector('.screen2-date-navigation') as HTMLElement
    this.fromYearNav = document.querySelector('.from-year-navigation') as HTMLElement
    this.toYearNav = document.querySelector('.to-year-navigation') as HTMLElement
    const dpNavChevronFirst = document.querySelector('.dp-nav-chevron-first') as HTMLElement
    const dpNavChevronSecond = document.querySelector('.dp-nav-chevron-second') as HTMLElement
    const fromYearBtn = document.querySelector('.from-year-btn') as HTMLElement
    const fromMonthBtn = document.querySelector('.from-month-btn') as HTMLElement
    const toYearBtn = document.querySelector('.to-year-btn') as HTMLElement
    const toMonthBtn = document.querySelector('.to-month-btn') as HTMLElement

    let dpFromHeader = dpFromInstance?.childNodes[2]
    dpFromHeader?.childNodes[0].remove()

    let dpToHeader = dpToInstance?.childNodes[2]
    dpToHeader?.childNodes[0].remove()

    this.dpBodyFirst = datePickerFromBody?.childNodes[0].childNodes[1] as HTMLElement
    this.dpBodySecond = datePickerToBody.childNodes[0].childNodes[1] as HTMLElement

    dpFromContentScreen.insertAdjacentElement('afterbegin', dpNavChevronFirst)
    dpFromContentScreen.insertAdjacentElement('afterbegin', screen1DateNav);

    dpFromContentScreen.appendChild(this.monthsNavigationFirst);
    dpFromContentScreen.appendChild(this.fromYearNav)

    dpToContentScreen.insertAdjacentElement('afterbegin', dpNavChevronSecond)
    dpToContentScreen.insertAdjacentElement('afterbegin', screen2DateNav);

    dpToContentScreen.appendChild(this.monthsNavigationSecond);
    dpToContentScreen.appendChild(this.toYearNav)

    this.attachEventListeners(fromMonthBtn, 'fromMonth');
    this.attachEventListeners(fromYearBtn, 'fromYear');

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
      this.isFromYear = !this.isFromYear;
      this.dpBodyFirst.classList.remove('display-block')
      this.dpBodyFirst.classList.add('display-none')
      this.monthsNavigationFirst.classList.remove('display-none')
      this.monthsNavigationFirst.classList.add('display-flex')
    }else if(key==='toMonth'){
      this.isToYear = !this.isToYear;
      this.dpBodySecond.classList.remove('display-block')
      this.dpBodySecond.classList.add('display-none')
      this.monthsNavigationSecond.classList.remove('display-none')
      this.monthsNavigationSecond.classList.add('display-flex')
    }
  }
  handleYearClick(key:string): void {
    if(key==='fromYear'){
      this.dpBodyFirst.classList.remove('display-block')
      this.dpBodyFirst.classList.add('display-none')
      this.fromYearNav.classList.remove('display-none')
      this.fromYearNav.classList.add('display-flex')
      this.isFromMonth = !this.isFromMonth
      this.isFromYearNav = !this.isFromYearNav
    }else if(key==='toYear'){
      this.dpBodySecond.classList.remove('display-block')
      this.dpBodySecond.classList.add('display-none')
      this.toYearNav.classList.remove('display-none')
      this.toYearNav.classList.add('display-flex')
      this.isToMonth = !this.isToMonth
      this.isToYearNav = !this.isToYearNav
    }
  }

  onFromMonthSelect(month: any, index: number, navigation: string): void {
      this.dpMonthsFisrt.forEach((m) => (m.isSelected = false));
      month.isSelected = true
      this.fromMonth = index + 1
      this.toggleNavigation(navigation);
      this.fromDate = { month: this.fromMonth, year: this.fromYear, day: 1 }
      this.datepickerFromInstance.navigateTo(this.fromDate)
  }
  onToMonthSelect(month: any, index: number, navigation: string): void {
      this.dpMonthsSecond.forEach((m) => (m.isSelected = false));
      month.isSelected = true
      this.toMonth = index + 1
      this.toggleNavigation(navigation);
      this.toDate = { month: this.toMonth, year: this.toYear, day: 1 }
      this.datepickerToInstance.navigateTo(this.toDate)
  }
  onFromYearSelect(year: any, index: number, navigation: string) {
    let yearIndex;
    this.fromYears.forEach((y) => (y.isSelected = false));
    year.isSelected = true
    yearIndex = index
    this.fromYear = this.fromYears[yearIndex].value
    this.toggleNavigation(navigation);
    this.fromDate = { month: this.fromMonth, year: this.fromYear, day: 1 }
    this.datepickerFromInstance.navigateTo(this.fromDate)
  }
  onToYearSelect(year: any, index: number, navigation: string) {
    let yearIndex;
    this.toYears.forEach((y) => (y.isSelected = false));
    year.isSelected = true
    yearIndex = index
    this.toYear = this.toYears[yearIndex].value
    this.toggleNavigation(navigation);
    this.toDate = { month: this.toMonth, year: this.toYear, day: 1 }
    this.datepickerToInstance.navigateTo(this.toDate)
  }

  toggleNavigation(navigation: any): void {
    const monthsNavigationFirst = document.querySelector('.months-navigation-first') as HTMLElement;
    const fromYearNav = document.querySelector('.from-year-navigation') as HTMLElement;
    const monthsNavigationSecond = document.querySelector('.months-navigation-second') as HTMLElement;
    const toYearNav = document.querySelector('.to-year-navigation') as HTMLElement;

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
    this.selectedFromDate=date
    this.fromFormattedRange = this.formatDate(date);
    const rangeData={
      startDate:this.selectedFromDate,
      endDate:this.selectedToDate!==undefined ? this.selectedToDate : this.toDate
    }
    this.rangeDate.emit(rangeData)
  }

  onToDateSelect(date: any) {
    this.selectedToDate=date
    this.toFormattedRange = this.formatDate(date);
    const rangeData={
      startDate:this.selectedFromDate !== undefined ? this.selectedFromDate : this.fromDate,
      endDate:this.selectedToDate
    }
    this.rangeDate.emit(rangeData)
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
  isDayDisabled(date: NgbDate): boolean {
    if (date.year > this.currentDate.year) {
      return true;
    }
    if (date.year === this.currentDate.year) {
      if (date.month > this.currentDate.month) {
        return true;
      }
      if (date.month === this.currentDate.month && date.day > this.currentDate.day) {
        return true;
      }
    }
    return false;
  }
}
