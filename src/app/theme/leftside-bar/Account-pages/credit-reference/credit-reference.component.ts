import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../../../../../config';

@Component({
  selector: 'app-credit-reference',
  standalone: true,
  imports: [CommonModule,DataTablesModule],
  templateUrl: './credit-reference.component.html',
  styleUrls: ['./credit-reference.component.css']
})
export class CreditReferenceComponent {
  @Input() mySelectedRowObj:any | undefined;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  // @ts-ignore
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  rows: any = [];
  dataTable: any;
  constructor(
    private http: HttpClient,) {}
  payloadreq = {}
  ngOnInit(): void {
    this.payloadreq = {
      userId: this.mySelectedRowObj
    }
    this.getCreditReference();
  }
  getCreditReference() {
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
            CONFIG.getCreditReferenceLogs,
            Object.assign(dataTablesParameters, this.payloadreq)).subscribe(resp => {
              let data = resp.data?.original?.data;
              this.rows = resp.data?.original?.data;

              callback({
                recordsTotal: resp.data?.original?.recordsTotal,
                recordsFiltered: resp.data?.original?.recordsFiltered,
                data: []
              });
            });
      },
      columns: [{ data: 'fromName',orderable: true }, { data: 'userName',orderable: false}, { data: 'bankBalance',orderable: true }, { data: 'oldCreditReference',orderable: true }, { data: 'newCreditReference',orderable: true }]
    };
  }
  rerender(id:any): void {
    this.payloadreq = {
      userId: id
    }
    if(this.dtElement.dtInstance){
      // @ts-ignore
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
    }
  }
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }
}
