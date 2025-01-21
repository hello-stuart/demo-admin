import { Component, ViewChild } from '@angular/core';
import { first } from 'rxjs';
import { CONFIG } from '../../../../../../config';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../../../../services/backend.service';
import { HttpClient } from '@angular/common/http';
import { CreditReferenceComponent } from '../credit-reference/credit-reference.component';
import { ExposureDetailComponent } from '../exposure-detail/exposure-detail.component';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddnewDownlineUserComponent } from "../addnew-downline-user/addnew-downline-user.component";
import {Clipboard} from '@angular/cdk/clipboard';


@Component({
  selector: 'app-master-downlinelist',
  standalone: true,
  imports: [NgClass,RouterLink, NgIf, NgFor, FormsModule, ExposureDetailComponent, CreditReferenceComponent, AddnewDownlineUserComponent, DataTablesModule],
  templateUrl: './master-downlinelist.component.html',
  styleUrl: './master-downlinelist.component.css'
})
export class MasterDownlinelistComponent {
  @ViewChild(CreditReferenceComponent)
  CreditReferenceComponent!: CreditReferenceComponent;
  @ViewChild(ExposureDetailComponent)
  ExposureDetailComponent!: ExposureDetailComponent;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  //@ts-ignore
  dtOptions: DataTables.Settings = {};
  rows: any;
  eyeIcon: any = {
    confirmNewPassword: false,
    newPassword: false,
    currentPassword: false
  };
  routeToAssign: String = "";
  userParentList: any = [];
  UserSports: any = [];
  isMaster: any;
  isChipSummary: any;
  selectedrow: any = {};
  customParams: any = {};
  userid: any;
  userDetail: any;
  agentBalance: any = {};
  isRefresh: boolean = false;;
  constructor(private http: HttpClient,
    private router: Router,
    private backendService: BackendService,
    private clipboard: Clipboard,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.isMaster = params['isMaster'];
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      var filterInput = document.querySelector(".dataTables_filter input[type='search']") as HTMLInputElement;
      if (filterInput) {
        filterInput.value = ""

        filterInput.setAttribute("readonly", 'true'); // Add the readonly attribute
        filterInput.removeAttribute("onfocus"); // Remove any existing onfocus attribute
        filterInput.addEventListener("focus", function () {
          this.removeAttribute("readonly"); // Remove readonly attribute when input field is focused
        });
      }
    }, 100);

    this.backendService.getNewUser().subscribe((res: any) => {
      this.rerender();
    });
    //
    this.isChipSummary = localStorage.getItem('isChipSummary')
    if (this.isChipSummary == null || this.isChipSummary == undefined) {
      this.isChipSummary = true;
    }
    else {
      this.isChipSummary = JSON.parse(this.isChipSummary)
    }
    this.getAgentBalance();
    if (this.isMaster) {
      this.userDetail = JSON.parse(localStorage.getItem('userDetail') as string)
      this.userid = localStorage.getItem('fromUid');
      this.getAgentClients();
    }
    else {
      this.getClients();
    }
  }
  getClients() {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      searching: true,
      autoWidth: false,
      order: [0, 'asc'],
      processing: false,
      ajax: (dataTablesParameters: any, callback: any) => {
        that.http
          .post<any>(
            CONFIG.getUsersList,
            Object.assign(dataTablesParameters, {
              role: 'MASTER'
            })).subscribe((resp: any) => {

              let data = resp.data.original.data;
              this.rows = resp.data.original.data;
              this.backendService.setUserRole(this.rows[0].role)
              // this.rows.sort((a: any, b: any) => a._id - b._id);
              callback({
                recordsTotal: resp.data.original.recordsTotal,
                recordsFiltered: resp.data.original.recordsFiltered,
                data: []
              });
            });
      },
      columns: [{ data: 'userName', orderable: true }, { data: 'creditReference', orderable: true }, { data: 'bankBalance', orderable: true }, { data: 'Client(P/L)', orderable: false }, { data: 'exposure', orderable: true }, { data: 'availableBalance', orderable: false }, { data: 'partnership', orderable: true }, { data: 'role', orderable: true }, { data: 'action', orderable: false }]
    };
  }
  getAgentClients() {

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
            CONFIG.getAgentUsersList,
            Object.assign(dataTablesParameters, {
              userId: this.userid
            })).subscribe((resp: any) => {

              let data = resp.data.original.data;
              this.rows = resp.data.original.data;
              this.userParentList = resp.parents;
              // this.rows.sort((a: any, b: any) => a._id - b._id);
              callback({
                recordsTotal: resp.data.original.recordsTotal,
                recordsFiltered: resp.data.original.recordsFiltered,
                data: []
              });
            });
      },
      columns: [{ data: 'userName', orderable: true }, { data: 'creditReference', orderable: true }, { data: 'bankBalance', orderable: true }, { data: 'Client(P/L)', orderable: false }, { data: 'exposure', orderable: true }, { data: 'availableBalance', orderable: false }, { data: 'uSt', orderable: false }, { data: 'BSt', orderable: false }, { data: 'exposureLimit', orderable: true }, { data: 'partnership', orderable: true }, { data: 'role', orderable: true }, { data: 'action', orderable: false }]
    };
  }

  rerender(): void {
    //@ts-ignore
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  calculateprcnt(balance: any, CreditRefeerence: any, partnership: any) {
    return (partnership / 100) * (balance - CreditRefeerence);
  }
  calculateMasterUplinePl() {
    return ((((this.agentBalance?.totalBalance + this.agentBalance?.availableBalance) - this.agentBalance.creditReference) / this.agentBalance.partnership) * 100)
  }
  formatNumber(value:any) {
    return value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}
  getAgentBalance() {
    this.isRefresh = true
    this.backendService.getAllRecordsByPost(CONFIG.getAgentBalance, {})
      .pipe(first())
      .subscribe(
        res => {
          this.isRefresh = false
          this.agentBalance = res?.data;
            let availBalance = this.agentBalance.availableBalance;
            $('.availBalance').text(this.formatNumber(availBalance));

        },
        error => {
          this.isRefresh = false
          //let statusError = error;
        });
  }
  trackByFn(index: number) {
    return index
  };

  // deleteUser
  deleteUser(userid: any) {

    this.backendService.getAllRecordsByPost(CONFIG.deleteUser, { userId: userid })
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.rerender();
          this.toaster.success(data.meta.message);
        },
        (error: any) => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  OpenModal(row: any, type: any): void {
    let remark = this.selectedrow.remark;
    this.selectedrow.masterPassword = '';
    this.selectedrow = row;
    this.selectedrow.remark = remark;
    this.selectedrow.type = type;

  }
  showCreditReference(row: any) {
    this.selectedrow.masterPassword = '';
    this.selectedrow = row;
    this.selectedrow.type = true;
    this.CreditReferenceComponent?.rerender(this.selectedrow._id);
  }
  showExposureDetail(row: any) {
    this.selectedrow.masterPassword = '';
    this.selectedrow = row;
    this.selectedrow.type = 'exposure';
    this.ExposureDetailComponent?.rerender(this.selectedrow._id);
  }
  DepositWithdraw(type: any) {
    let req =
    {
      remark: this.selectedrow.remark,
      amount: this.selectedrow.amount,
      masterPassword: this.selectedrow.masterPassword,
      userId: this.selectedrow._id,
      type: type
    }
    this.backendService.getAllRecordsByPost(CONFIG.setDw, req)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.rerender();
          this.backendService.getAgentBalanceRes();
          this.toaster.success(data.meta.message);
        },
        (error: any) => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  checkNumber() {
    this.selectedrow.amount = Math.abs(this.selectedrow.amount) == 0 ? '' : Math.abs(this.selectedrow.amount);
  }
  ConvertToIndianForamt(number: any) {
    if (number) {
      return number.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    }
    else {
      return 0
    }

  }
  UpdateChipsSummary() {
    this.isChipSummary = !this.isChipSummary;
    this.backendService.getAllRecordsByPost(CONFIG.updateChipSummary, { isChipSummary: this.isChipSummary })
      .pipe(first())
      .subscribe(
        (data: any) => {
          localStorage.setItem('isChipSummary', this.isChipSummary.toString())
          this.toaster.success(data.meta.message);
        },
        (error: any) => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
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
      url = CONFIG.updateUserPartnership;
      req = {

        "userId": this.selectedrow._id,
        "partnership": this.selectedrow.newLimitLable,
        "password": this.selectedrow.masterPassword,

      }
    }
    this.backendService.getAllRecordsByPost(url, req)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.rerender();
          this.toaster.success(data.meta.message);
        },
        (error: any) => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  changeUserStatus() {
    let req = {
      "status": this.selectedrow.type,
      "masterPassword": this.selectedrow.masterPassword,
      "userId": this.selectedrow._id
    }

    this.backendService.getAllRecordsByPost(CONFIG.changeUsersStatus, req)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.toaster.success(data.meta.message);
          this.rerender();
          this.selectedrow = {};
        },
        (error: any) => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  setRouteToAssign(route: string, row: any) {

    this.router.navigateByUrl('profile');
    this.routeToAssign = route; // Set the route first
    this.setUserIdToLocalStorage(row); // Then call the function
  }
  setUserIdToLocalStorage(row: any) {
    if (this.routeToAssign == "profile") {
      this.router.navigateByUrl('profile');
    }
    localStorage.setItem('fromUid', row._id);
    localStorage.setItem('childUserRole', row.role);
    localStorage.setItem('subUserReport', row.userName);
    localStorage.removeItem('subchild');
    this.backendService.setProfilePagesStatus(true);
  }
  getsportsLockedList(userId: any) {
    this.backendService.recordsFromLocalStorage(CONFIG.mSportsList, CONFIG.mSportsListTime).subscribe((sports: any) => {
      this.UserSports = sports;
      this.UserSports.userId = userId;
      this.backendService.getAllRecordsByPost(CONFIG.getsportsLockedList, { userId: userId })
        .pipe(first())
        .subscribe(
          (data: any) => {
            const arr2Map = new Map(data.data.map((item: any) => [item.sportId, true]));
            this.UserSports.data = this.UserSports.data.map((item: any) => ({
              ...item,
              locked: arr2Map.has(item.sportId),
            }));
          },
          (error: any) => {
            let responseData = error.error;
            this.backendService.ErrorNotification_Manager(responseData);
          });
    })
  }
  userSportsBetLocked(index: any,) {
    let sport = this.UserSports.data[index];
    this.UserSports.data[index].locked = !sport.locked;
    let req = {
      isLocked: sport.locked,
      userId: this.UserSports.userId,
      sportId: sport.sportId,
      sportName: sport.sportName,
    }
    this.backendService.getAllRecordsByPost(CONFIG.userSportsBetLocked, req)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.toaster.success(data.meta.message);
        },
        (error: any) => {
          this.UserSports.data[index].locked = !sport.locked;
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  copyToClipboard(text: any): void {
    this.clipboard.copy(text);
  }
}
