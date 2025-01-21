import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { first, Subject } from 'rxjs';
import { BackendService } from '../../../../services/backend.service';
import { CONFIG } from '../../../../../../config';

@Component({
  selector: 'app-exposure-detail',
  standalone: true,
  imports: [CommonModule,DataTablesModule],
  templateUrl: './exposure-detail.component.html',
  styleUrls: ['./exposure-detail.component.css']
})
export class ExposureDetailComponent {
  @Input() mySelectedRowObj:any | undefined;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  //@ts-ignore
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  rows: any = [];
  dataTable: any;
  constructor(private backendService:BackendService) {}
  payloadreq = {}
  ngOnInit(): void {
    this.payloadreq = {
      userId: this.mySelectedRowObj
    }
    this.getExposure();
  }
  getExposure(){
    this.backendService.getAllRecordsByPost(CONFIG.parentuserEventsExposure, this.payloadreq)
    .pipe(first())
    .subscribe(
      (data:any) => {
        this.rows=data.data
      },
      (error:any) => {
        let responseData = error.error;
        this.backendService.ErrorNotification_Manager(responseData);
      });
  }
  rerender(id:any): void {
    this.payloadreq = {
      userId: id
    }
    this.getExposure();
  }
  openRiskMarketModal:boolean=false;
  userMarketListExposure:any=[];
  getuserUsMarketListExposure(exposure:any){
    this.openRiskMarketModal=true;
    let req = {
      userId: this.mySelectedRowObj,
      sportId:exposure.sportId,
      marketId:exposure.marketId
    }
    this.backendService.getAllRecordsByPost(CONFIG.userUsMarketListExposure, req)
    .pipe(first())
    .subscribe(
      (data:any) => {
        this.openRiskMarketModal=true;
        this.userMarketListExposure = data.data.sort((a: any, b: any) => a.updatedAt - b.updatedAt);;
      },
      (error:any) => {
        let responseData = error.error;
        this.backendService.ErrorNotification_Manager(responseData);
      });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }
  closeModal(){
    this.openRiskMarketModal =false;
  }
}
