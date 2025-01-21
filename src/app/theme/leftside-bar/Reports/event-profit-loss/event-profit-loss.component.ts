import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import moment from 'moment';
import { BackendService } from '../../../../services/backend.service';
import { CONFIG } from '../../../../../../config';
import { CustomizedDatepickerComponent } from "../../../../Components/customized-datepicker/customized-datepicker.component";

@Component({
  selector: 'app-event-profit-loss',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTablesModule, CustomizedDatepickerComponent],
  templateUrl: './event-profit-loss.component.html',
  styleUrls: ['./event-profit-loss.component.css']
})
export class EventProfitLossComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  //@ts-ignore
  dtOptions: DataTables.Settings = {};
  public today = new Date();
  dataSource = 'LIVE';
  filterDate: any;
  showDatePicker: boolean = false
  // myDpOptions: IMyDpOptions = {
  //   dateFormat: 'dd/mm/yyyy',
  //   markCurrentDay: true,
  //   monthSelector: false,
  //   showTodayBtn: false,
  //   showClearDateBtn: false,
  //   inline: false,
  //   editableDateField: false,
  //   openSelectorOnInputClick: true,
  //   selectionTxtFontSize: '16px',


  //   disableSince: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1 }
  //   // disableUntil: { year: this.today.getFullYear(), month: this.today.getMonth(), day: this.today.getDate() - 15 },
  //   // disableSince: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1 }
  // };
  public startDate: any = { date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() } };
  public endDate: any = { date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() } };

  rows: any = [];
  sports: any = [];
  selectedSport = '4';
  selectedType = 'unsettle';
  userid: any;
  total: any;
  rangeDate: any;
  constructor(private http: HttpClient, private backendService: BackendService, private router: Router) {

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
            CONFIG.agentSportsProfitloss,
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
      columns: [{ data: 'sportId', orderable: true }, { data: 'pl', orderable: true }, { data: 'commission', orderable: true }, { data: 'totalPl', orderable: false }]

      // columns: [{ data: 'sportId' }, { data: '', }, { data: 'sportName' }]
    };
  }
  rerender(): void {
    this.reqForBets = {
      startDate: this.backendService.getStartDate(this.rangeDate?.startDate),
      endDate: this.backendService.getEndDate(this.rangeDate?.endDate),
      dataSource: this.dataSource
    }
    // if (this.userid) {
    //   this.reqForBets.userId = this.userid;
    // }
    //@ts-ignore
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  receiveRangeDate(data: any) {
    this.rangeDate = data
  }

  goto(sportid: any) {
    localStorage.setItem('startDate', this.backendService.getStartDate(this.rangeDate?.startDate));
    localStorage.setItem('endDate', this.backendService.getEndDate(this.rangeDate?.endDate),);
    // this.router.navigate(['/list-clients/client-account/plEvent/', sportid]);
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/plEvent/${sportid}/${this.dataSource}/master`])
    );
    window.open(url, '_blank');
    // this.router.navigateByUrl('/list-clients/client-account/plEvent/'+sportid+'/'+this.startDate?.singleDate?.jsDate+'/'+this.endDate?.singleDate?.jsDate);
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
  absValue(x: any) {
    return Math.abs(x)
  }

}