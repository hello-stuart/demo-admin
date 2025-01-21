import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CONFIG } from '../../../../config';

@Component({
  selector: 'app-profit-loss-events',
  standalone: true,
  imports: [CommonModule,DataTablesModule],
  templateUrl: './profit-loss-events.component.html',
  styleUrls: ['./profit-loss-events.component.css']
})
export class ProfitLossEventsComponent {
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  //@ts-ignore
  dtOptions: DataTables.Settings = {};

  startDate: any;
  endDate: any;
  sportId:any;
  rows: any = [];
  userid: any;
  reqForBets: any = {}
  isMaster:any ;
  dataSource:any;
  constructor(private http: HttpClient,private route: ActivatedRoute,
    private router :Router) {
      this.route.params.subscribe(params => {
        this.sportId = params['sportId'];
        this.isMaster = params['isMaster'];
        this.dataSource = params['dataSource'];
      });
  }
  ngOnInit(): void {
    this.startDate = localStorage.getItem('startDate');
    this.endDate = localStorage.getItem('endDate');
    if(!this.isMaster){
      this.userid = localStorage.getItem('fromUid');
    }
    this.getAccountStatement();
  }
  getAccountStatement() {

    this.reqForBets = {
      startDate: this.startDate,
      endDate: this.endDate,
      userId: this.userid,
      sportId:this.sportId,
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
            CONFIG.agentEventsProfitloss,
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
      columns: [{ data: 'sportName',orderable: true }, { data: 'eventName',orderable: true}, { data: 'pl',orderable: true },{ data: 'downlinePl',orderable: false }, { data: 'commission',orderable: true }]
      // columns: [{ data: 'sportId' }, { data: '', }, { data: 'sportName' }]
    };
  }
  rerender(): void {
    this.reqForBets = {
      startDate: this.startDate,
      endDate: this.endDate,
      // userId: this.userid,
      sportId:this.sportId,
      dataSource: this.dataSource
    }
      //@ts-ignore
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  convert(num:number){
    return Math.abs(num);
  }
  goto(eventId:any){
    let url = ''
    if(!this.isMaster){
      url = this.router.serializeUrl(
        this.router.createUrlTree([`/my-account/plMarket/${this.sportId}/${eventId}/${this.dataSource}`])
      );
    }
    else{
      url = this.router.serializeUrl(
        this.router.createUrlTree([`/plMarket/${this.sportId}/${eventId}/${this.dataSource}/master`])
      );
    }
    // this.router.navigate(['/list-clients/client-account/plMarket/',this.sportId, eventId]);

    window.open(url, '_blank');
      // this.router.navigateByUrl('/list-clients/client-account/plEvent/'+sportid+'/'+this.startDate?.singleDate?.jsDate+'/'+this.endDate?.singleDate?.jsDate);
  }
}
