import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { BackendService } from '../../../../services/backend.service';
import { CONFIG } from '../../../../../../config';
import { IMyDpOptions } from 'mydatepicker';
import { CustomizedDatepickerComponent } from '../../../../Components/customized-datepicker/customized-datepicker.component';
import { first } from 'rxjs';
import { NgbPopover, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;


@Component({
  selector: 'app-bet-history',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTablesModule, CustomizedDatepickerComponent, NgbPopover],
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.css']
})
export class BetHistoryComponent implements OnInit, AfterViewInit {
  @ViewChild('modalparentList') modalParentList!: ElementRef;
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  @ViewChild('modalparentList', { static: false }) modalElement!: ElementRef;
  modalInstance: any;
  showDatePicker: boolean = false
  //@ts-ignore
  dtOptions: DataTables.Settings = {};
  public today = new Date();
  dataSource = '';
  userParentList = [];
  modalDataTarget = '';
  modalDataToggle = '';
  myDpOptions: IMyDpOptions = {
    //  dateRange: false,
    dateFormat: 'dd/mm/yyyy',
    markCurrentDay: true,
    monthSelector: false,
    showTodayBtn: false,
    showClearDateBtn: false,
    inline: false,
    editableDateField: false,
    openSelectorOnInputClick: true,
    selectionTxtFontSize: '16px',



    disableSince: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1 }
    // disableUntil: { year: this.today.getFullYear(), month: this.today.getMonth(), day: this.today.getDate() - 15 },
    // disableSince: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1 }
  };
  public startDate: any = { date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() } };
  public endDate: any = { date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() } };

  rows: any[] = [];
  sports: any = [];
  selectedSport = '4';
  selectedType = 'unsettle';
  userid: any;
  filterDate: any;
  rangeDate: any
  constructor(private http: HttpClient, private backendService: BackendService, private renderer: Renderer2, private config: NgbPopoverConfig) {
    config.triggers = 'hover';
  }
  reqForBets: any = {

  }
  ngOnInit(): void {
    this.userid = localStorage.getItem('fromUid');
    this.changeUsersStatus();
    this.getAccountStatement();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showDatePicker = true
    }, 100);
  }
  onDataSourceChange(newValue: string) {
    const tempDate = this.backendService.dateManager(newValue);
    this.filterDate = tempDate
  }
  getAccountStatement() {
    // this.spinner.show();
    this.reqForBets = {
      startDate: this.backendService.getStartDate(this.startDate),
      endDate: this.backendService.getEndDate(this.endDate),
      type: this.selectedType,
      sportId: this.selectedSport,
      dataSource: this.dataSource
    }
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      searching: true,
      autoWidth: false,
      order: [0, 'desc'],
      processing: false,
      ajax: (dataTablesParameters: any, callback: any) => {
        that.http
          .post<any>(
            CONFIG.getMasterBetList,
            Object.assign(dataTablesParameters,
              this.reqForBets
            )).subscribe(resp => {
              let data = resp.data?.original?.data;
              this.rows = resp.data?.original?.data;
              setTimeout(() => {
                // this.spinner.hide();
              }, 300);
              callback({
                recordsTotal: resp.data?.original?.recordsTotal,
                recordsFiltered: resp.data?.original?.recordsFiltered,
                data: []
              });
            });
      },
      columns: [{ data: 'userName', orderable: true }, { data: 'sportName', orderable: true }, { data: 'eventName', orderable: true }, { data: 'marketName', orderable: true }, { data: 'selectionName', orderable: true }, { data: 'type', orderable: true }, { data: 'oddsPrice', orderable: true }, { data: 'stake', orderable: true }, { data: 'createdAt', orderable: true }, { data: 'updatedAt', orderable: true }]

      // columns: [{ data: 'sportId' }, { data: '', }, { data: 'sportName' }]
    };
  }
  //
  changeUsersStatus() {
    this.backendService.recordsFromLocalStorage(CONFIG.mSportsList, CONFIG.mSportsListTime).subscribe((res: any) => {
      this.sports = res?.data;
    })
  }
  getLocalDateTime(date: Date) {
    var res = new Date(date);
    return moment(res, "D/M/YYYY hh:mm A").format('D/M/YYYY hh:mm A');
  }
  rerender(): void {
    this.reqForBets = {
      startDate: this.backendService.getStartDate(this.rangeDate?.startDate),
      endDate: this.backendService.getEndDate(this.rangeDate?.endDate),
      type: this.selectedType,
      sportId: this.selectedSport,
      userId: this.userid,
      dataSource: this.dataSource
    }
    //@ts-ignore
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  receiveRangeDate(data: any) {
    this.rangeDate = data
  }
  getGetParentOfUser(userName: any) {
    this.backendService.getAllRecordsByPost(CONFIG.getGetParentOfUser, { userName: userName })
      .pipe(first())
      .subscribe(
        data => {
          this.userParentList = data.data
        },
        error => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
    if (this.userParentList) {
      this.modalInstance = this.modalElement.nativeElement;
      this.modalInstance.classList.add('show')
      this.renderer.setStyle(this.modalInstance, 'display', 'block')
      this.renderer.setStyle(this.modalInstance, 'backdrop-filter', 'brightness(0.5)')
    }
  }
  closeModal() {
    this.modalInstance = this.modalElement.nativeElement;
    this.modalInstance.classList.remove('show')
    this.renderer.setStyle(this.modalInstance, 'display', 'none')
    this.renderer.removeStyle(this.modalInstance, 'backdrop-filter')
  }
}