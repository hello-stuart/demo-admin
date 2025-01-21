//Component Imports
import { CommonModule, JsonPipe } from "@angular/common";
import {AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild,} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DataTableDirective, DataTablesModule } from "angular-datatables";
import {
  NgbCalendar,
  NgbDate,
  NgbDatepicker,
  NgbDatepickerModule,
  NgbDropdownMenu,
  NgbDropdownModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgbDayTemplateData } from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model";
import { BackendService } from "../../../../services/backend.service";
import { HttpClient } from "@angular/common/http";
import { CONFIG } from "../../../../../../config";
import { Config } from "datatables.net";
import moment from "moment";
import { ToastrModule, ToastrService } from "ngx-toastr";

@Component({
  selector: "app-account-statement",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbDropdownMenu,
    ToastrModule
  ],
  templateUrl: "./account-statement.component.html",
  styleUrl: "./account-statement.component.css",
})
export class AccountStatementComponent implements OnInit, AfterViewInit {
  //Declarations
  @ViewChild(NgbDatepicker) datePickerInstance!: NgbDatepicker;
  @ViewChild("t") daysTemplate!: NgbDayTemplateData;
  @ViewChild(DataTableDirective) datatableElement!: DataTableDirective;
  @ViewChild('dataTableInstance') dtInstance!:ElementRef
  showDatePicker:boolean=false;
  fromDate: NgbDate | any;
  toDate: NgbDate | any;
  //querySelectors
  dpBodyFirst!: any;
  dpBodySec!: any;
  monthsNavigationFirst!: any;
  monthsNavigationSecond!: any;
  fromYearNav!: any;
  toYearNav!: any;
  reqForBets: any = {};
  rows: any = [];
  sports: any = [];
  userid: any;
  fromWeeks: any = [];
  toWeeks: any = [];
  customFromDayTemplate: any;
  customToDayTemplate: any;
  clientSearchInput: boolean = false;
  showCrossIcon: boolean = false;
  dpInput: boolean = false;
  isFromMonth: boolean = true;
  istoMonth: boolean = true;
  isFromYear: boolean = true;
  isToYear: boolean = true;
  isFromYearNav: boolean = false;
  isToYearNav: boolean = false;
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;
  // @ts-ignore
  dtOptions: DataTables.Settings = {};
  fromMonth!: number;
  fromYear!: number;
  toMonth!: number;
  toYear!: number;
  fromDay!:number;
  toDay!:number;
  currentDate: NgbDate | any;
  public today = new Date();
  fromYears: { value: number; isSelected: boolean }[] = [];
  formattedRange: string = "";
  dataSource = "";
  selectedSport = "4";
  selectedType = "unsettle";
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
      value: "Jan",
      isSelected: false,
    },
    {
      value: "Feb",
      isSelected: false,
    },
    {
      value: "Mar",
      isSelected: false,
    },
    {
      value: "Apr",
      isSelected: false,
    },
    {
      value: "May",
      isSelected: false,
    },
    {
      value: "Jun",
      isSelected: false,
    },
    {
      value: "Jul",
      isSelected: false,
    },
    {
      value: "Aug",
      isSelected: false,
    },
    {
      value: "Sep",
      isSelected: false,
    },
    {
      value: "Oct",
      isSelected: false,
    },
    {
      value: "Nov",
      isSelected: false,
    },
    {
      value: "Dec",
      isSelected: false,
    },
  ];
  dpMonthsSecond = [
    {
      value: "Jan",
      isSelected: false,
    },
    {
      value: "Feb",
      isSelected: false,
    },
    {
      value: "Mar",
      isSelected: false,
    },
    {
      value: "Apr",
      isSelected: false,
    },
    {
      value: "May",
      isSelected: false,
    },
    {
      value: "Jun",
      isSelected: false,
    },
    {
      value: "Jul",
      isSelected: false,
    },
    {
      value: "Aug",
      isSelected: false,
    },
    {
      value: "Sep",
      isSelected: false,
    },
    {
      value: "Oct",
      isSelected: false,
    },
    {
      value: "Nov",
      isSelected: false,
    },
    {
      value: "Dec",
      isSelected: false,
    },
  ];

  constructor(
    private calendar: NgbCalendar,
    private renderer: Renderer2,
    private backendService: BackendService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getToday();
    this.currentDate=calendar.getToday()
    const today = this.calendar.getToday();
    this.fromYear = today.year;
    this.fromMonth = today.month;
    this.toYear = today.year;
    this.toMonth = today.month;
    this.fromDay=this.fromDate.day;
    this.toDay=this.toDate.day;
    this.startDate = { year: today.year, month: today.month, day: today.day };
    this.maxDate = {
      year: this.fromYear,
      month: this.fromMonth,
      day: today.day,
    };
  }

  ngOnInit(): void {
    this.userid = localStorage.getItem("fromUid");
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [5, 10, 25, 50],
      language: {
        lengthMenu: `_MENU_ records per page`,
        search: "",
        searchPlaceholder: "",
        emptyTable: "There are no records to show",
        entries: "",
        info: "",
        infoFiltered: "",
      },
    };
    this.updateInputValue();
    this.generateYears();
    this.getAccountStatement();
    this.navigateCalender();
  }

  ngAfterViewInit(): void {
    this.getAccountStatement();
    const selectionInputs=document.querySelector('.ngb-dp-navigation-select')
    const monthInput=selectionInputs?.childNodes[0] as HTMLElement
    const yearInput=selectionInputs?.childNodes[1] as HTMLElement
    monthInput.setAttribute('id','monthSelect')
    monthInput.setAttribute('name','monthSelector')
    yearInput.setAttribute('id','yearSelect')
    yearInput.setAttribute('name','yearSelector')
    setTimeout(() => {
      this.initializeCustomNavigation();
    }, 100);
  }

  initializeCustomNavigation(): void {
    const dpInstance = document.querySelector(".ngb-dp-container");
    const dpContentScreen = document.querySelectorAll(".ngb-dp-month");
    const dpContent = document.querySelectorAll(".ngb-dp-month-name");
    const dpNavChevronFirst = document.querySelector(".dp-nav-chevron-first") as HTMLElement;
    const dpNavChevronsecond = document.querySelector(".dp-nav-chevron-second") as HTMLElement;
    const datePickerBody = document.querySelector(".ngb-dp-content");
    this.monthsNavigationFirst = document.querySelector(".months-navigation-first") as HTMLElement;
    this.monthsNavigationSecond = document.querySelector(".months-navigation-second") as HTMLElement;
    const screen1DateNav = document.querySelector(".screen1-date-navigation") as HTMLElement;
    const screen2DateNav = document.querySelector(".screen2-date-navigation") as HTMLElement;
    this.fromYearNav = document.querySelector(".from-year-navigation") as HTMLElement;
    this.toYearNav = document.querySelector(".to-year-navigation") as HTMLElement;
    const fromYearBtn = document.querySelector(".from-year-btn") as HTMLElement;
    const fromMonthBtn = document.querySelector(".from-month-btn") as HTMLElement;
    const toMonthBtn = document.querySelector(".to-month-btn") as HTMLElement;
    const toYearBtn = document.querySelector(".to-year-btn") as HTMLElement;
    this.dpBodyFirst = datePickerBody?.childNodes[0].childNodes[2] as HTMLElement;
    this.dpBodySec = datePickerBody?.childNodes[1].lastChild as HTMLElement;
    let firstDpMonth = dpContentScreen[0];
    let secondDpMonth = dpContentScreen[1];
    this.customFromDayTemplate = document.querySelector(".from-month-days-template" ) as HTMLElement;
    this.customToDayTemplate = document.querySelector(".to-month-days-template" ) as HTMLElement;
    const daysTemplate = document.querySelectorAll(".ngb-dp-week");
    let dpHeader = dpInstance?.childNodes[2];

    daysTemplate.forEach((element) => {
      if (
        element.classList.contains("ngb-dp-week") &&
        !element.classList.contains("ngb-dp-weekdays")
      ) {
        element.remove();
      }
    });

    dpHeader?.childNodes[0].remove();
    dpContent.forEach((item) => {
      item.remove();
    });

    firstDpMonth.insertAdjacentElement("afterbegin", dpNavChevronFirst);
    secondDpMonth.insertAdjacentElement("afterbegin", dpNavChevronsecond);

    firstDpMonth.insertAdjacentElement("afterbegin", screen1DateNav);
    secondDpMonth.insertAdjacentElement("afterbegin", screen2DateNav);

    firstDpMonth.appendChild(this.monthsNavigationFirst);
    secondDpMonth.appendChild(this.monthsNavigationSecond);

    firstDpMonth.appendChild(this.customFromDayTemplate);
    secondDpMonth.appendChild(this.customToDayTemplate);

    firstDpMonth.appendChild(this.fromYearNav);
    secondDpMonth.appendChild(this.toYearNav);

    this.attachEventListeners(fromMonthBtn, "fromMonth");
    this.attachEventListeners(toMonthBtn, "toMonth");
    this.attachEventListeners(fromYearBtn, "fromYear");
    this.attachEventListeners(toYearBtn, "toYear");
  }

  attachEventListeners(element: HTMLElement | null, type: string): void {
    if (element) {
      this.renderer.listen(element, "click", () => {
        if (type === "fromMonth") {
          this.handleFromMonthClick();
        } else if (type === "toMonth") {
          this.handleToMonthClick();
        } else if (type === "fromYear") {
          this.handleFromYearClick();
        } else if (type === "toYear") {
          this.handleToYearClick();
        }
      });
    }
  }
  
  handleFromMonthClick(): void {
    this.isFromYear = !this.isFromYear;
    this.isFromYear;
    this.dpBodyFirst.classList.remove("display-block");
    this.dpBodyFirst.classList.add("display-none");
    this.customFromDayTemplate.classList.remove("display-block");
    this.customFromDayTemplate.classList.add("display-none");
    this.monthsNavigationFirst.classList.remove("display-none");
    this.monthsNavigationFirst.classList.add("display-flex");
  }

  handleToMonthClick(): void {
    this.isToYear = !this.isToYear;
    this.dpBodySec.classList.remove("display-block");
    this.dpBodySec.classList.add("display-none");
    this.customToDayTemplate.classList.remove("display-block");
    this.customToDayTemplate.classList.add("display-none");
    this.monthsNavigationSecond.classList.remove("display-none");
    this.monthsNavigationSecond.classList.add("display-flex");
    // Add or remove classes as needed
  }

  handleFromYearClick(): void {
    this.dpBodyFirst.classList.remove("display-block");
    this.dpBodyFirst.classList.add("display-none");
    this.customFromDayTemplate.classList.remove("display-block");
    this.customFromDayTemplate.classList.add("display-none");
    this.fromYearNav.classList.remove("display-none");
    this.fromYearNav.classList.add("display-flex");
    this.isFromMonth = !this.isFromMonth;
    this.isFromYearNav = !this.isFromYearNav;
    // Add or remove classes as needed
  }

  handleToYearClick(): void {
    this.dpBodySec.classList.remove("display-block");
    this.dpBodySec.classList.add("display-none");
    this.customToDayTemplate.classList.remove("display-block");
    this.customToDayTemplate.classList.add("display-none");
    this.toYearNav.classList.remove("display-none");
    this.toYearNav.classList.add("display-flex");
    this.istoMonth = !this.istoMonth;
    this.isToYearNav = !this.isToYearNav;
    // Add or remove classes as needed
  }

  prevMonth(range: "from" | "to") {
    if (range === "from") {
      this.fromMonth = this.fromMonth === 1 ? 12 : this.fromMonth - 1;
      this.fromDate = { month: this.fromMonth, year: this.fromYear };
    } else if (range === "to") {
      if (this.toMonth > this.fromMonth + 1 && this.fromMonth < this.toMonth) {
        this.toMonth = this.toMonth === 1 ? 12 : this.toMonth - 1;
      } else if (
        this.toMonth === this.fromMonth &&
        this.fromYear !== this.toYear
      ) {
        this.fromMonth = this.fromMonth === 1 ? 12 : this.fromMonth - 1;
      } else if (this.fromYear === this.toYear) {
        this.toMonth = this.toMonth === 1 ? 12 : this.toMonth - 1;
        this.fromMonth = this.fromMonth === 1 ? 12 : this.fromMonth - 1;
      } else {
        this.toMonth = this.toMonth === 1 ? 12 : this.toMonth - 1;
      }
      this.toDate = { month: this.toMonth, year: this.toYear };
    }
    if (this.fromMonth === 12) this.fromYear--;
    if (this.toMonth === 12) this.toYear--;
    this.navigateCalender();
  }

  nextMonth(range: "from" | "to") {
    if (range === "from") {
      if (this.fromMonth + 1 < this.toMonth) {
        this.fromMonth = this.fromMonth === 12 ? 1 : this.fromMonth + 1;
      } else if (
        this.toMonth + 1 === this.fromMonth &&
        this.fromYear === this.toYear
      ) {
        this.toMonth = this.toMonth === 12 ? 1 : this.toMonth + 1;
      } else {
        this.toMonth = this.toMonth === 12 ? 1 : this.toMonth + 1;
        this.fromMonth = this.fromMonth === 12 ? 1 : this.fromMonth + 1;
      }
    } else if (range === "to") {
      this.toMonth = this.toMonth === 12 ? 1 : this.toMonth + 1;
    }
    if (this.toMonth === 1) this.toYear++;
    if (this.fromMonth === 1) this.fromYear++;
    
    this.navigateCalender();
  }

  prevYear(range: "from" | "to") {
    if (range === "from") {
      this.fromYear--;
    } else if (range === "to") {
      this.toYear--;
    }
    this.navigateCalender();
  }

  nextYear(range: "from" | "to") {
    if (range === "from") {
      this.fromYear++;
    } else if (range === "to") {
      this.toYear++;
    }
    this.navigateCalender();
  }

  onFromMonthSelect(month: any, index: number, navigation: string): void {
    if (navigation === "first") {
      this.dpMonthsFisrt.forEach((m) => (m.isSelected = false));
      month.isSelected = true;
      this.fromMonth = index + 1;
      this.toggleNavigation("first-month");
      "Selected First " + month.value;
      this.navigateCalender();
    }
  }

  onToMonthSelect(month: any, index: number, navigation: string): void {
    if (navigation === "second") {
      this.dpMonthsSecond.forEach((m) => (m.isSelected = false));
      month.isSelected = true;
      this.toMonth = index + 1;
      this.toggleNavigation("second-month");
      this.navigateCalender();
    }
  }

  toggleNavigation(navigation: any): void {
    const datePickerBody = document.querySelector(".ngb-dp-content");
    const monthsNavigationFirst = document.querySelector(
      ".months-navigation-first"
    ) as HTMLElement;
    const monthsNavigationSecond = document.querySelector(
      ".months-navigation-second"
    ) as HTMLElement;
    const fromYearNav = document.querySelector(
      ".from-year-navigation"
    ) as HTMLElement;
    const toYearNav = document.querySelector(
      ".to-year-navigation"
    ) as HTMLElement;
    let dpBodyFirst;
    let dpBodySec;
    if (datePickerBody?.hasChildNodes) {
      dpBodyFirst = datePickerBody.childNodes[0].childNodes[3] as HTMLElement;
      dpBodySec = datePickerBody.childNodes[1].childNodes[3] as HTMLElement;
    }
    // If custom navigation is visible, replace it back with the original datepicker body
    if (navigation === "first-month") {
      dpBodyFirst?.classList.remove("display-none");
      dpBodyFirst?.classList.add("display-block");
      this.customFromDayTemplate?.classList.remove("display-none");
      this.customFromDayTemplate?.classList.add("display-block");
      monthsNavigationFirst.classList.remove("display-flex");
      monthsNavigationFirst.classList.add("display-none");
      this.isFromYear = !this.isFromYear;
    }
    // If original datepicker body is visible, replace it with the custom navigation
    else if (navigation === "second-month") {
      dpBodySec?.classList.remove("display-none");
      dpBodySec?.classList.add("display-block");
      this.customToDayTemplate?.classList.remove("display-none");
      this.customToDayTemplate?.classList.add("display-block");
      monthsNavigationSecond.classList.remove("display-flex");
      monthsNavigationSecond.classList.add("display-none");
      this.isToYear = !this.isToYear;
    } else if (navigation === "first-year") {
      dpBodyFirst?.classList.remove("display-none");
      dpBodyFirst?.classList.add("display-block");
      this.customFromDayTemplate?.classList.remove("display-none");
      this.customFromDayTemplate?.classList.add("display-block");
      fromYearNav.classList.remove("display-flex");
      fromYearNav.classList.add("display-none");
      this.isFromMonth = !this.isFromMonth;
      this.isFromYearNav = !this.isFromYearNav;
    } else if (navigation === "second-year") {
      dpBodySec?.classList.remove("display-none");
      dpBodySec?.classList.add("display-block");
      this.customToDayTemplate?.classList.remove("display-none");
      this.customToDayTemplate?.classList.add("display-block");
      toYearNav.classList.remove("display-flex");
      toYearNav.classList.add("display-none");
      this.istoMonth = !this.istoMonth;
      this.isFromYearNav = !this.isFromYearNav;
    }
  }

  onYearSelect(year: any, index: number, navigation: string) {
    // Deselect all years
    if (navigation === "first") {
      let yearIndex;
      this.fromYears.forEach((y) => (y.isSelected = false));
      // Set the selected year
      year.isSelected = true;
      yearIndex = index;
      this.fromYear = this.fromYears[yearIndex].value;
      this.toggleNavigation("first-year");
    } else if (navigation === "second") {
      let yearIndex;
      this.fromYears.forEach((y) => (y.isSelected = false));
      // Set the selected year
      year.isSelected = true;
      yearIndex = index;
      this.toYear = this.fromYears[yearIndex].value;
      this.toggleNavigation("second-year");
    }
    this.datePickerInstance.navigateTo({
      year: this.fromYear,
      month: this.fromMonth,
    });
  }

  generateYears(): void {
    this.fromYears = [];
    const startYear = Math.floor(this.fromYear / 10) * 10; // Calculate the start of the decade
    for (let i = 0; i < 10; i++) {
      const yearValue = startYear + i;
      this.fromYears.push({
        value: yearValue,
        isSelected: yearValue === this.fromYear,
      });
    }
  }

  previousYears(): void {
    this.fromYear -= 10;
    this.generateYears();
  }

  nextYears(): void {
    this.fromYear += 10;
    this.generateYears();
  }

  selectYear(year: { value: string; isSelected: boolean }): void {
    // Reset all selections
    this.fromYears.forEach((y) => (y.isSelected = false));
    // Set selected year
    year.isSelected = true;
  }

  onDateClick(
    day: number,
    month: number,
    year: number,
    isFromScreen: boolean
  ): void {

    const selectedDate = new Date(year, month, day)

    const formattedDate = {
      year: selectedDate.getFullYear(),
      month: month === 12 ? 12 : selectedDate.getMonth(),
      day: selectedDate.getDate(),
    };
    if (isFromScreen) {
      if (!this.fromDate || (this.toDate && selectedDate < this.fromDate)) {
        this.fromDate = formattedDate;
        this.toDate = null;
      } else {
        this.fromDate = formattedDate;
      }
      this.selectedStartDate = selectedDate;
    } else {
      this.toDate = formattedDate;
      this.selectedEndDate = selectedDate;
    }
    this.updateSelectedRange();
  }

  updateSelectedRange() {
    if (this.fromDate && this.toDate) {
      const from = `${this.fromDate.day}/${this.fromDate.month}/${
        this.fromDate.year
      }`;
      const to = `${this.toDate.day}/${this.toDate.month}/${
        this.toDate.year
      }`;
      this.formattedRange = `${from} ~ ${to}`;
    } else if (this.fromDate && !this.toDate) {
      this.formattedRange = `${this.fromDate.day}/${this.fromDate.month}/${
        this.fromDate.year
      } ~`;
    } else {
      this.formattedRange = "";
    }
  }

  updateInputValue() {
    if (this.fromDate && this.toDate) {
      const from = `${this.fromDate.day}/${this.fromDate.month}/${this.fromDate.year}`;
      const to = `${this.toDate.day}/${this.toDate.month}/${this.toDate.year}`;
      this.formattedRange = `${from} ~ ${to}`;
      this.startDate = from;
      this.maxDate = to;
    }
  }

  onInputFocus() {
    this.clientSearchInput = true;
  }

  onDpInputFocus() {
    this.dpInput = !this.dpInput;
  }

  @HostListener("document:click", ["$event"])
  clickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    const clickedInside = targetElement.closest(".col-lg-3");

    if (!clickedInside) {
      this.clientSearchInput = false;
    }
  }

  onDataSourceChange(newValue: string) {
    const tempDate= this.backendService.dateManager(newValue);
    this.fromDate=tempDate.date;
    this.fromMonth=this.fromDate.month
    this.fromYear=this.fromDate.year
    this.navigateCalender()
    this.updateInputValue()
  }

  getAccountStatement() {
    this.reqForBets = {
      startDate: this.backendService.getStartDate(this.fromDate),
      endDate: this.backendService.getEndDate(this.toDate),
      userId: this.userid,
      dataSource: this.dataSource,
    };
    const that = this;
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      serverSide: true,
      searching: true,
      autoWidth: false,
      order: [0, "desc"],
      layout: {
        topEnd: {
            search: {
                placeholder: 'Search'
            }
        },
    },
      processing: false,
      ajax: (dataTablesParameters: any, callback: any) => {
        that.http
          .post<any>(
            CONFIG.userAccountStatement,
            Object.assign(dataTablesParameters, this.reqForBets)
          )
          .subscribe((resp) => {
            let data = resp.data?.original?.data;
            this.rows = data
            
            callback({
              recordsTotal: resp.data?.original?.recordsTotal,
              recordsFiltered: resp.data?.original?.recordsFiltered,
              data:[],
            });
          });
      },
      columns: [
        { data: "createdAt", orderable: true },
        { data: "deposit", orderable: true },
        { data: "withdraw", orderable: true },
        { data: "bankBalance", orderable: true },
        { data: "remark", orderable: false },
        { data: "remark", orderable: false },
      ],
    };
  }

  rerender(): void {
    this.reqForBets = {
      startDate: this.backendService.getStartDate(this.fromDate),
      endDate: this.backendService.getEndDate(this.toDate),
      userId: this.userid,
      dataSource: this.dataSource,
    };

    // @ts-ignore
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
    
  }

  getLocalDateTime(date: Date) {
    var res = new Date(date);
    return moment(res, "D/M/YYYY hh:mm A").format("D/M/YYYY hh:mm A");
  }

  generateCalendarDays(month: number, year: number) {
    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

    const prevMonthDays = [];
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      prevMonthDays.push({
        day: daysInPrevMonth - i,
        disabled: true,
      });
    }

    const currentMonthDays = Array.from(
      { length: daysInMonth },
      (_, index) => ({
        day: index + 1,
        disabled: false,
      })
    );

    const calendarDays = [...prevMonthDays, ...currentMonthDays];
    const totalDaysNeeded = Math.ceil(calendarDays.length / 7) * 7;

    const nextMonthDays = [];
    for (let i = 1; calendarDays.length < totalDaysNeeded; i++) {
      nextMonthDays.push({
        day: i,
        disabled: true,
      });
      calendarDays.push({
        day: i,
        disabled: true,
      });
    }

    return {
      weekdays,
      days: calendarDays,
    };
  }

  formatDaysIntoWeeks(
    days: { day: number; disabled: boolean }[]
  ): { day: number; disabled: boolean }[][] {
    const weeks: { day: number; disabled: boolean }[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  }
  
  navigateCalender() {
    const fromDays = this.generateCalendarDays(this.fromMonth, this.fromYear); // October 2024
    const toDays = this.generateCalendarDays(this.toMonth, this.toYear);
    this.fromWeeks = this.formatDaysIntoWeeks(fromDays.days);
    this.toWeeks = this.formatDaysIntoWeeks(toDays.days);
  }

  isRange(day: any, month: any, year: any): boolean {
    if (!this.selectedStartDate || !this.selectedEndDate) {
      return false;
    }
    const currentDate = new Date(year, month, day);
    return (
      currentDate >= this.selectedStartDate &&
      currentDate <= this.selectedEndDate
    );
  }

  isDayDisabled(day: number, month: number, year: number): boolean {
    const currentYear = this.currentDate.year;
    const currentMonth = this.currentDate.month;
    const currentDay = this.currentDate.day;
    if (year > currentYear) {
      return true;
    }
    if (year === currentYear) {
      if (month > currentMonth) {
        return true;
      }
      if (month === currentMonth && day > currentDay) {
        return true;
      }
    }
    return false;
  }

  onResetBtnClick(){
    this.fromDate=this.currentDate
    this.toDate=this.currentDate
    this.navigateCalender()
    this.updateSelectedRange()
  }
}