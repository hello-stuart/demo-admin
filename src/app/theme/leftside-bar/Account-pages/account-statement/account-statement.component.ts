import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { IMyDpOptions, MyDatePickerModule } from 'mydatepicker';
import { BackendService } from '../../../../services/backend.service';
import { CONFIG } from '../../../../../../config';

@Component({
  selector: 'app-account-statement',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTablesModule,],
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class AccountStatementComponent {
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;

  //@ts-ignore
  dtOptions: DataTables.Settings = {};
  public today = new Date();
  dataSource = '';
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
  public startDate: any = { date: { year: this.today.getFullYear(), month: this.today.getMonth()+ 1 , day: this.today.getDate() } };
  public endDate: any = { date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() } };

  rows: any = [];
  sports: any = [];
  selectedSport = '4';
  selectedType = 'unsettle';
  userid: any;
  constructor(private http: HttpClient, private backendService: BackendService) {

  }
  reqForBets: any = {}
  ngOnInit(): void {
    this.userid = localStorage.getItem('fromUid');
    this.changeUsersStatus();

  }
  onDataSourceChange(newValue: string) {
    this.startDate = this.backendService.dateManager(newValue);
  }

  getAccountStatement() {
    this.reqForBets = {
      startDate:  this.backendService.getStartDate(this.startDate),
      endDate: this.backendService.getEndDate(this.endDate),
      userId: this.userid,
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
      ajax: (dataTablesParameters: any, callback:any) => {
        that.http
          .post<any>(
            CONFIG.userAccountStatement,
            Object.assign(dataTablesParameters, this.reqForBets)).subscribe(resp => {
              let data = resp.data?.original?.data;
              this.rows = resp.data?.original?.data;

              callback({
                recordsTotal: resp.data?.original?.recordsTotal,
                recordsFiltered: resp.data?.original?.recordsFiltered,
                data: []
              });
            });
      },
      columns: [{ data: 'createdAt',orderable: true }, { data: 'deposit',orderable: true}, { data: 'withdraw',orderable: true },{ data: 'bankBalance',orderable: true }, { data: 'remark',orderable: false }, { data: 'remark',orderable: false }, {data:'fromName',orderable: false}]

      // columns: [{ data: 'sportId' }, { data: '', }, { data: 'sportName' }]
    };
  }
  rerender(): void {
    this.reqForBets = {
      startDate:  this.backendService.getStartDate(this.startDate),
      endDate: this.backendService.getEndDate(this.endDate),
      userId: this.userid,
      dataSource: this.dataSource
    }
      //@ts-ignore
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
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


}
