import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { CONFIG } from '../../../../config';
import { BackendService } from '../../services/backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restore-user',
  standalone: true,
  imports: [CommonModule,DataTablesModule],
  templateUrl: './restore-user.component.html',
  styleUrls: ['./restore-user.component.css']
})
export class RestoreUserComponent {
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;

  //@ts-ignore
  dtOptions: DataTables.Settings = {};
  rows: any = [];
  toaster: any;
  constructor(private http: HttpClient,private backendService:BackendService,
    private toastr:ToastrService) {
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
            CONFIG.deleteUserList,
            Object.assign(dataTablesParameters, {})).subscribe(resp => {
              let data = resp.data?.original?.data;
              this.rows = resp.data?.original?.data;
              callback({
                recordsTotal: resp.data?.original?.recordsTotal,
                recordsFiltered: resp.data?.original?.recordsFiltered,
                data: []
              });
            });
      },
    };
  }
  rerender(): void {
      //@ts-ignore
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  // restoreUser
  restoreUser(id:any){
    this.backendService.getAllRecordsByPost(CONFIG.restoreUser, {userId:id})
    .pipe(first())
    .subscribe(
      (data:any) => {
        this.rerender();
        this.toastr.success(data.meta.message);
      },
      (error:any) => {
        let responseData = error.error;
        this.backendService.ErrorNotification_Manager(responseData);
      });
      this.toastr.success('User Deleted Successfully')
  }
}
