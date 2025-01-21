import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../../../../../config';

@Component({
  selector: 'app-password-history',
  standalone: true,
  imports: [CommonModule,DataTablesModule],
  templateUrl: './password-history.component.html',
  styleUrls: ['./password-history.component.css']
})
export class PasswordHistoryComponent {
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
   // @ts-ignore
  dtOptions: DataTables.Settings = {};
  rows: any = [];

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.getAccountStatement();
  }
  getAccountStatement() {

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
            CONFIG.getPasswordChangeHistory,
            Object.assign(dataTablesParameters,{})).subscribe(resp => {
              let data = resp.data?.original?.data;
              this.rows = resp.data?.original?.data;

              callback({
                recordsTotal: resp.data?.original?.recordsTotal,
                recordsFiltered: resp.data?.original?.recordsFiltered,
                data: []
              });
            });
      },
      columns: [{ data: 'userName',orderable: false }, { data: 'remark',orderable: false},{ data: 'updatedAt',orderable: true }]
      // columns: [{ data: 'sportId' }, { data: '', }, { data: 'sportName' }]
    };
  }
  rerender(): void {
   // @ts-ignore
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
}
