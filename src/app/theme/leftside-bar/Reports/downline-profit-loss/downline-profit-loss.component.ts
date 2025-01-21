import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import moment from 'moment';
import { BackendService } from '../../../../services/backend.service';
import { CONFIG } from '../../../../../../config';
import { IMyDpOptions } from 'mydatepicker';
import { CustomizedDatepickerComponent } from "../../../../Components/customized-datepicker/customized-datepicker.component";
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-downline-profit-loss',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTablesModule, CustomizedDatepickerComponent],
  templateUrl: './downline-profit-loss.component.html',
  styleUrls: ['./downline-profit-loss.component.css']
})
export class DownlineProfitLossComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;

  //@ts-ignore
  dtOptions: DataTables.Settings = {};
  public today = new Date();
  dataSource = 'LIVE';
  rangeDate: any;
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
  currentDate: NgbDate
  rows: any = [];
  sports: any = [];
  selectedSport = '4';
  selectedType = 'unsettle';
  userid: any;
  total: any;
  filterDate: any
  resetDate: any
  showDatePicker: boolean = false
  constructor(private http: HttpClient, private backendService: BackendService, private router: Router) {
    this.currentDate = new NgbDate(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate());
  }
  reqForBets: any = {

  }
  ngOnInit(): void {
    // this.userid = localStorage.getItem('fromUid');
    this.changeUsersStatus();
    this.getAccountStatement();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showDatePicker = true
    }, 100);
  }
  getAccountStatement() {
    this.reqForBets = {
      startDate: this.backendService.getStartDate(this.startDate),
      endDate: this.backendService.getEndDate(this.endDate),
      dataSource: this.dataSource
    }
    if (this.userid) {
      this.reqForBets.userId = this.userid;
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
            CONFIG.getMasterUsersProfitloss,
            Object.assign(dataTablesParameters, this.reqForBets)).subscribe(resp => {
              let data = resp.data?.original?.data;
              this.rows = resp.data?.original?.data;
              this.total = resp.total;
              callback({
                recordsTotal: resp.data?.original?.recordsTotal,
                recordsFiltered: resp.data?.original?.recordsFiltered,
                data: []
              });
            });
      },
      columns: [{ data: 'userName', orderable: true }, { data: 'pl', orderable: true }, { data: 'downlinePl', orderable: false }, { data: 'commission', orderable: true }]

      // columns: [{ data: 'sportId' }, { data: '', }, { data: 'sportName' }]
    };
  }
  onDataSourceChange(newValue: string) {
    const tempDate = this.backendService.dateManager(newValue);
    this.filterDate = tempDate
  }
  rerender(userid?: any): void {
    this.reqForBets = {
      startDate: this.backendService.getStartDate(this.rangeDate?.startDate),
      endDate: this.backendService.getEndDate(this.rangeDate?.endDate),
      dataSource: this.dataSource,
    }
    if (userid) {
      this.userid = userid;
      this.reqForBets.userId = userid;
    }
    //@ts-ignore
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  goto(sportid: any) {
    localStorage.setItem('startDate', this.backendService.getStartDate(this.startDate));
    localStorage.setItem('endDate', this.backendService.getEndDate(this.endDate),);
    // this.router.navigate(['/list-clients/client-account/plEvent/', sportid]);
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/my-account/plEvent/${sportid}/${this.dataSource}`])
    );
    window.open(url, '_blank');
    // this.router.navigateByUrl('/list-clients/client-account/plEvent/'+sportid+'/'+this.startDate?.singleDate?.jsDate+'/'+this.endDate?.singleDate?.jsDate);
  }
  //
  reset() {
    this.dataSource = ''
    this.resetDate = this.currentDate

    // this.reqForBets = {
    //   startDate: this.startDate ? moment(this.startDate.formatted).format() : moment(new Date()).format(),
    //   endDate: this.endDate ? moment(this.endDate.formatted).format() : moment(new Date()).format(),
    //   dataSource: this.dataSource
    // }
    // if (this.userid) {
    //   this.reqForBets.userId = this.userid;
    // }
    this.userid = '';
    this.rerender();
  }
  changeUsersStatus() {

    this.backendService.recordsFromLocalStorage(CONFIG.mSportsList, CONFIG.mSportsListTime).subscribe((res: any) => {
      this.sports = res?.data;
    })

  }
  getLocalDateTime(date: Date) {
    var res = new Date(date);
    return moment(res, "D/M/YYYY hh:mm A").format('D/M/YYYY hh:mm A');
  }
  gotoUrl(row: any) {
    // userId

    if (row.role == 'USER') {
      localStorage.setItem('fromUid', row.userId);
      localStorage.setItem('childUserRole', row.role);
      this.router.navigate(['/profit-loss']);
    }
    else {
      // this.reqForBets = {
      //   startDate:  this.startDate ? moment(this.startDate.formatted).format() : moment(new Date()).format(),
      //   endDate: this.endDate ? moment(this.endDate.formatted).format() : moment(new Date()).format(),
      //   dataSource: this.dataSource,
      //   userid:row.userId
      // }

      this.rerender(row.userId);
    }

  }
  absValue(x: any) {
    return Math.abs(x)
  }
  receiveRangeDate(data: any) {
    this.rangeDate = data
  }
}