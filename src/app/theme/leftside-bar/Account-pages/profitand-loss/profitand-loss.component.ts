import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../../../../services/backend.service';
import { CONFIG } from '../../../../../../config';
import { IMyDpOptions, MyDatePicker, MyDatePickerModule } from 'mydatepicker';
import { CustomizedDatepickerComponent } from '../../../../Components/customized-datepicker/customized-datepicker.component';

@Component({
  selector: 'app-profitand-loss',
  standalone: true,
  imports: [NgIf, NgClass, NgFor, FormsModule, DataTablesModule, DecimalPipe, CustomizedDatepickerComponent],
  templateUrl: './profitand-loss.component.html',
  styleUrls: ['./profitand-loss.component.css']
})
export class ProfitandLossComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  //@ts-ignore
  dtOptions: DataTables.Settings = {};
  showDatePicker: boolean = false
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
  public startDate: any = { date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() } };
  public endDate: any = { date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() } };

  rows: any = [];
  sports: any = [];
  selectedSport = '4';
  selectedType = 'unsettle';
  userid: any;
  total: any;
  filterDate: any
  rangeDate: any;
  constructor(private http: HttpClient, private backendService: BackendService, private router: Router, private toaster: ToastrService) {

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
  getAccountStatement() {
    this.reqForBets = {
      startDate: this.backendService.getStartDate(this.startDate),
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
      userId: this.userid,
      dataSource: this.dataSource
    }
    //@ts-ignore
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  goto(sportid: any) {
    if (this.dataSource) {
      localStorage.setItem('startDate', this.backendService.getStartDate(this.rangeDate?.startDate));
      localStorage.setItem('endDate', this.backendService.getEndDate(this.rangeDate?.endDate));
      // this.router.navigate(['/list-clients/client-account/plEvent/', sportid]);
      const url = this.router.serializeUrl(
        this.router.createUrlTree([`/my-account/plEvent/${sportid}/${this.dataSource}`])
      );
      window.open(url, '_blank');
    }
    else {
      this.toaster.error('', 'Data Source is manadatory !')
    }

    // this.router.navigateByUrl('/list-clients/client-account/plEvent/'+sportid+'/'+this.startDate?.singleDate?.jsDate+'/'+this.endDate?.singleDate?.jsDate);
  }
  //
  changeUsersStatus() {
    this.backendService.recordsFromLocalStorage(CONFIG.mSportsList, CONFIG.mSportsListTime).subscribe((res: any) => {
      this.sports = res?.data;
    })

  }
  onDataSourceChange(newValue: string) {
    const tempDate = this.backendService.dateManager(newValue);
    this.filterDate = tempDate
  }
  getLocalDateTime(date: Date) {
    var res = new Date(date);
    return moment(res, "D/M/YYYY hh:mm A").format('D/M/YYYY hh:mm A');
  }
  receiveRangeDate(data: any) {
    this.rangeDate = data
  }
}