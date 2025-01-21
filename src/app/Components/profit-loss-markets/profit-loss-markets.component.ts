import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { CONFIG } from '../../../../config';

@Component({
  selector: 'app-profit-loss-markets',
  standalone: true,
  imports: [CommonModule,DataTablesModule],
  templateUrl: './profit-loss-markets.component.html',
  styleUrls: ['./profit-loss-markets.component.css']
})
export class ProfitLossMarketsComponent {
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
    //@ts-ignore
  dtOptions: DataTables.Settings = {};
  startDate: any;
  endDate: any;
  eventId:any;
  sportId:any;
  rows: any = [];
  userid: any;
  reqForBets: any = {}
  isMaster:any ;
  dataSource:any;
  constructor(private http: HttpClient,private route: ActivatedRoute,
    private router :Router) {
      this.route.params.subscribe(params => {
        this.eventId = params['eventId'];
        this.sportId = params['sportId'];
        this.isMaster = params['isMaster'];
        this.dataSource = params['dataSource'];
      });
  }
  subUserReport : any;
  ngOnInit(): void {
    this.subUserReport = localStorage.getItem('subUserReport');
    this.startDate = localStorage.getItem('startDate');
    this.endDate = localStorage.getItem('endDate');
    let uid = localStorage.getItem('fromUid');
    if(uid){
      this.userid = localStorage.getItem('fromUid');
    }
    this.getAccountStatement();

  }
  getAccountStatement() {
    this.reqForBets = {
      startDate: this.startDate,
      endDate: this.endDate,
      eventId:this.eventId,
      // userId: this.userid,
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
            
            CONFIG.agentMarketsProfitloss,
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
      columns: [{ data: 'sportName',orderable: true },
        { data: 'eventName',orderable: true},
        {
          data: 'marketId',
          orderable: true,
          render: (data: any, type: any, row: any) => {
              return row.sportId === 66102 ? data : '&nbsp;';
          }
      },
        { data: 'marketName',orderable: true},
        { data: 'result',orderable: true },
        { data: 'pl',orderable: true }, 
        { data: 'commission',orderable: true }, 
        { data: 'createdAt',orderable: true }]

      // columns: [{ data: 'sportId' }, { data: '', }, { data: 'sportName' }]
    };
    console.log(this.dtOptions.columns)
  }
  rerender(): void {
    this.reqForBets = {
      startDate: this.startDate,
      endDate: this.endDate,
      eventId:this.eventId,
      userId: this.userid,
      sportId:this.sportId,
      dataSource: this.dataSource
    }
      //@ts-ignore
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  goto(sportId:any,marketId:any,roundId?:any){
    let url = ''
    localStorage.setItem('roundId',marketId)
    if(this.subUserReport){
      url = this.router.serializeUrl(
        this.router.createUrlTree([`/userwise-profitloss/${this.sportId}/${marketId}/${this.dataSource}`])
      );
    }
    else{
      url = this.router.serializeUrl(
        this.router.createUrlTree([`/userBetHistory/${this.sportId}/${marketId}/${this.dataSource}/master`])

      );
    }
    // this.router.navigate(['/list-clients/client-account/userBetHistory/', sportId,marketId]);

    window.open(url, '_blank');
      // this.router.navigateByUrl('/list-clients/client-account/plEvent/'+sportid+'/'+this.startDate?.singleDate?.jsDate+'/'+this.endDate?.singleDate?.jsDate);
  }
}
