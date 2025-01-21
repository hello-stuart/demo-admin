//imports
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import moment from 'moment';
import { IMyDpOptions } from 'mydatepicker';
import { first } from 'rxjs';
import { BackendService } from '../../../../services/backend.service';
import { CONFIG } from '../../../../../../config';
import { NgbDatepickerModule, NgbDropdownMenu, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomizedDatepickerComponent } from "../../../../Components/customized-datepicker/customized-datepicker.component";
import {
  NgbDate
} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-commission',
  standalone: true,
  imports: [CommonModule, RouterModule, DataTablesModule, FormsModule, NgbDatepickerModule, CustomizedDatepickerComponent],
  templateUrl: './commission.component.html',
  styleUrl: './commission.component.css'
})
export class CommissionComponent implements OnInit, AfterViewInit{
  //declarations
  @ViewChild(DataTableDirective) datatableElement!: DataTableDirective;
  public today = new Date();
  
   // @ts-ignore
  dtOptions: DataTables.Settings = {};
  rows: any = [];
  reqForComm = {};
  selectedType = 'fancy';
  type = '';
  date: any;
  rangeDate:any;
  dataSource = "";
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
  };
  public startDate: any = { date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() } };
  public endDate: any = { date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() } };
  fromFormattedRange: string = ''; 
  toFormattedRange: string = '';
  commission: any;
  agentName: any;
  private _id: any;
  settleData: any;
  rejectData: any;
  isLoder: boolean = false;;
  transferedURL: string = "";
  resetDate:any
  currentDate!:NgbDate
  showDatePicker:boolean=false
  constructor(private http: HttpClient, private backendService: BackendService) {
    this.currentDate = new NgbDate(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate());
   }
  selectedData: any = {};
  ngOnInit(): void {
    this.getCommission();
    this.transferedURL= CONFIG.transfered;
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showDatePicker=true
    }, 100);
  }
  // get commisssion
  getTabCommission(selectedType: any) {
    this.selectedType = selectedType;
    this.rerender();
  }
  updateReq(obj: any,selectedobj:any) {
    this.type = obj;
    this.agentName = selectedobj.username;
    this._id = selectedobj._id;
  }
  settleReject() {

    let startDate = this.backendService.getStartDate(this.startDate);
    let endDate = this.backendService.getEndDate(this.endDate);

    // let date = this.conertToDate(startDate,endDate);
    const NstartDate = moment(startDate);
    const NendDate = moment(endDate);
    let newStartDate = NstartDate.format("DD/MM/YYYY")
    let newEndDate =NendDate.format("DD/MM/YYYY")
    switch (this.type) {
      case 'Settle':
        this.settle(newStartDate,newEndDate);
        break;
      case 'Reject':
        this.reject(newStartDate,newEndDate);
        break;
    }

  }
  conertToDate(startDate:any,endDate:any) {
    const NstartDate = moment(startDate);
    const NendDate = moment(endDate);

    const formattedDatetime = NstartDate.format("DD-MM-YYYY") + " to " + NendDate.format("DD-MM-YYYY");
    return formattedDatetime
  }
  settle(startDate:any,endDate:any) {
    this.reqForComm = {
      startDate: startDate,
      endDate: endDate,
      // date:date,
      flag: this.selectedType,
      userId: this._id
    }

    this.backendService.getAllRecordsByPost(this.transferedURL, this.reqForComm)
    .pipe(first())
    .subscribe(
      data => {
        // $('#settleModal').modal('hide');
        this.rerender();
      },
      error => {
        console.log(error)
        this.backendService.ErrorNotification_Manager(error.error);
      });
  }
  reject(startDate:any,endDate:any) {
    this.reqForComm = {
      // date:date,
      startDate: startDate,
      endDate: endDate,
      flag: this.selectedType,
      userId: this._id
    }

    this.backendService.getAllRecordsByPost(CONFIG.reject, this.reqForComm)
    .pipe(first())
    .subscribe(
      data => {
        // $('#settleModal').modal('hide');
        this.rerender();
      },
      error => {
        console.log(error)
        this.backendService.ErrorNotification_Manager(error.error);
      });
  }

  getCommission() {
    // this.spinner.show();
    this.reqForComm = {
      startDate: this.backendService.getStartDate(this.startDate),
      endDate: this.backendService.getEndDate(this.endDate),
      flag: this.selectedType,
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
      feature:{
        empty:''
      },
      ajax: (dataTablesParameters: any, callback:any) => {
        that.http.post<any>(CONFIG.getCommission, Object.assign(dataTablesParameters, this.reqForComm)).subscribe(resp => {
          let data = resp.data?.original?.data || [];
          this.commission = data
          // setTimeout(() => {
          //   // this.spinner.hide();
          // }, 300);
          callback({
            recordsTotal: resp.data?.original?.recordsTotal,
            recordsFiltered: resp.data?.original?.recordsFiltered,
            data:[]
          });
        });
      },
      columns: [
        { data: 'AgentName', orderable: true }, 
        { data: 'turnOver', orderable: true },
         { data: 'Commission', orderable: true }, 
         { data: 'Action', orderable: true }
        ]

      // columns: [{ data: 'sportId' }, { data: '', }, { data: 'sportName' }]
    };
  }
  rerender(): void {
    this.reqForComm = {
      startDate: this.backendService.getStartDate(this.startDate),
      endDate: this.backendService.getEndDate(this.endDate),
      flag: this.selectedType,
      _id: this._id
    }
    // @ts-ignore
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  getLocalDateTime(date: Date) {
    var res = new Date(date);
    return moment(res, "D/M/YYYY hh:mm A").format('D/M/YYYY hh:mm A');
  }
  receiveRangeDate(data:any){
    this.rangeDate=data
    this.startDate.date = this.rangeDate.startDate
    this.endDate.date = this.rangeDate.endDate
  }
  onResetClick(){
    this.resetDate=this.currentDate
  }
    

}
