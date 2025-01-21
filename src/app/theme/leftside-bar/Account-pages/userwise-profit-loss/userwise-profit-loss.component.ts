import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../../../../../config';

@Component({
  selector: 'app-userwise-profit-loss',
  standalone: true,
  imports: [CommonModule,DataTablesModule],
  templateUrl: './userwise-profit-loss.component.html',
  styleUrls: ['./userwise-profit-loss.component.css']
})
export class UserwiseProfitLossComponent {
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;

  //@ts-ignore
  dtOptions: DataTables.Settings = {};
  data: any = {}
  userid: any;
  marketId: any;
  startDate: any;
  endDate: any;
  sportId: any;
  rows: any = [];
  reqForBets = {};
  dataSource:any;
  roundId:any;
  constructor(
     private route: ActivatedRoute, private http: HttpClient,private router:Router) {
    this.route.params.subscribe(params => {
      this.marketId = params['marketId'];
      this.sportId = params['sportId'];
      this.dataSource = params['dataSource'];
    });
  }
  ngOnInit(): void {
    this.roundId = localStorage.getItem('roundId');
    this.startDate = localStorage.getItem('startDate');
    this.endDate = localStorage.getItem('endDate');
    this.getAccountStatement();
  }


  textSpliter(value: any, before: any) {

  }
  getAccountStatement() {
    this.reqForBets = {
      startDate: this.startDate,
      endDate: this.endDate,
      marketId: this.marketId,
      sportId: this.sportId,
      roundId:this.roundId,
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
            CONFIG.marketProfitLossList,
            Object.assign(dataTablesParameters, this.reqForBets)).subscribe(resp => {
              let data = resp.data?.original?.data;
              this.rows = resp.data?.original?.data.sort((a: any, b: any) => a.sportId - b.sportId);;

              callback({
                recordsTotal: resp.data?.original?.recordsTotal,
                recordsFiltered: resp.data?.original?.recordsFiltered,
                data: []
              });
            });
      },
      columns: [{ data: 'userName',orderable: true }, { data: 'sportName',orderable: true},{ data: 'eventName',orderable: true}, { data: 'marketName',orderable: true},{ data: 'result',orderable: true },{ data: 'pl',orderable: true }, { data: 'commission',orderable: true }, { data: 'createdAt',orderable: true }]

      // columns: [{ data: 'sportId' }, { data: '', }, { data: 'sportName' }]
    };
  }
  rerender(): void {
    this.reqForBets = {
      startDate: this.startDate,
      endDate: this.endDate,
      marketId: this.marketId,
      sportId: this.sportId,
      dataSource: this.dataSource
    }
    //@ts-ignore
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  goto(id:any){
    localStorage.setItem('fromUid', id) // this.router.navigate(['/list-clients/client-account/plEvent/', sportid]);
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/userBetHistory/${this.sportId}/${this.marketId}/${this.dataSource}/master`])
    );
    window.open(url, '_blank');
      // this.router.navigateByUrl('/list-clients/client-account/plEvent/'+sportid+'/'+this.startDate?.singleDate?.jsDate+'/'+this.endDate?.singleDate?.jsDate);
  }
}
