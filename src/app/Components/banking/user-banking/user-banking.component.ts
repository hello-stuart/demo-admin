import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../../../services/backend.service';
import { CONFIG } from '../../../../../config';

@Component({
  selector: 'app-user-banking',
  standalone: true,
  imports: [CommonModule,DataTablesModule,FormsModule],
  templateUrl: './user-banking.component.html',
  styleUrls: ['./user-banking.component.css']
})
export class UserBankingComponent {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  // @ts-ignore
  dtOptions: DataTables.Settings = {};
  rows: any;
  isMaster: any;
  isChipSummary:any;
  selectedrow: any = {};
  customParams: any = {};
  agentBalance: any = {};
  payloadReq:any ={};
  depositwithdraw:any;
  depositObj:any={
    _id:'',
    type:'',

  };
  constructor(private http: HttpClient, private backendService: BackendService,private toaster : ToastrService) {
      if(window.location.pathname.includes('user-banking')){
        this.payloadReq.role = 'USER';
      }
      else{
        this.payloadReq.role = 'MASTER';
      }
  }
  ngOnInit(): void {
    this.isChipSummary = localStorage.getItem('isChipSummary')
    if (this.isChipSummary == null || this.isChipSummary == undefined) {
      this.isChipSummary = true;
    }
    else {
      this.isChipSummary = JSON.parse(this.isChipSummary)
    }
    this.getClients();
  }
  getClients() {
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
            CONFIG.getUsersList,
            Object.assign(dataTablesParameters, this.payloadReq)).subscribe(resp => {
              let data = resp.data.original.data;
              this.rows = resp.data.original.data;
              callback({
                recordsTotal: resp.data.original.recordsTotal,
                recordsFiltered: resp.data.original.recordsFiltered,
                data: []
              });
            });
      },
      columns: [{ data: 'userName', orderable: true }, { data: 'creditReference', orderable: true }, { data: 'bankBalance', orderable: true }, { data: 'Client(P/L)', orderable: false }, { data: 'exposure', orderable: true }, { data: 'availableBalance', orderable: false }, { data: 'partnership', orderable: true }, { data: 'role', orderable: true }]
    };
  }
  getAgentBalance() {
    this.backendService.getAllRecordsByPost(CONFIG.getAgentBalance, {})
      .pipe(first())
      .subscribe(
        res => {

          this.agentBalance = res?.data;
          $('#mainBalance').text(this.agentBalance.availableBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
        },
        error => {
        });
  }
  trackByFn(index: number) {
    return index
  };
  CreditOrExposureLimit() {
    let req = {}
    let url = ''
    if (this.selectedrow.type == 'C') {
      url = CONFIG.updateCreditReference;
      req = {
        creditReference: this.selectedrow.newLimitLable,
        masterPassword: this.selectedrow.masterPassword,
        userId: this.selectedrow._id,
      }
    }
    else {
      url = CONFIG.updateExposureLimit;
      req = {
        exposureLimit: this.selectedrow.newLimitLable,
        masterPassword: this.selectedrow.masterPassword,
        userId: this.selectedrow._id,
      }
    }
    this.backendService.getAllRecordsByPost(url, req)
      .pipe(first())
      .subscribe(
        data => {
          this.rerender();
          this.toaster.success(data.meta.message);
        },
        error => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  OpenModal(row: any,type:any): void {
    this.selectedrow.masterPassword = '';
    this.selectedrow = row;
    this.selectedrow.type = type;

  }
  depositWithdrawManager(type:any,item:any){
    this.depositObj=item;
    this.depositObj.type=type
    this.depositObj._id=item._id
    if(type=='D'){
      this.depositObj.withdraw=false;
      this.depositObj.deposit=true;

    }
    else{
      this.depositObj.withdraw=true;
      this.depositObj.deposit=false;
    }

  }
  DepositWithdraw() {
    let req =
    {
      remark: this.depositObj.remark,
      amount: this.depositObj.withdrawAmount,
      masterPassword: this.depositObj.masterPassword,
      userId: this.depositObj._id,
      type: this.depositObj.type
    }
    this.backendService.getAllRecordsByPost(CONFIG.setDw, req)
      .pipe(first())
      .subscribe(
        data => {
          this.rerender();
          this.getAgentBalance();
          this.depositObj={};
          this.toaster.success(data.meta.message);

        },
        error => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  rerender(): void {
    this.selectedrow={};
    // @ts-ignore
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  UpdateChipsSummary() {
    this.isChipSummary=!this.isChipSummary;
    this.backendService.getAllRecordsByPost(CONFIG.updateChipSummary, { isChipSummary: this.isChipSummary })
      .pipe(first())
      .subscribe(
        data => {
          localStorage.setItem('isChipSummary', this.isChipSummary.toString())
          this.toaster.success(data.meta.message);

        },
        error => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
}
