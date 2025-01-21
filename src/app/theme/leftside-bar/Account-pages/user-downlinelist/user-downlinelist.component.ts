import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../../../../services/backend.service';
import { first } from 'rxjs';
import { CONFIG } from '../../../../../../config';
import { CreditReferenceComponent } from '../credit-reference/credit-reference.component';
import { ExposureDetailComponent } from '../exposure-detail/exposure-detail.component';
import { DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { AddnewDownlineUserComponent } from '../addnew-downline-user/addnew-downline-user.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';



@Component({
  selector: 'app-user-downlinelist',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, DataTablesModule,
    AddnewDownlineUserComponent,
    CreditReferenceComponent,
    ExposureDetailComponent,
    FormsModule, RouterLink
  ],
  templateUrl: './user-downlinelist.component.html',
  styleUrl: './user-downlinelist.component.css'
})
export class UserDownlinelistComponent {
  @ViewChild(CreditReferenceComponent)
  CreditReferenceComponent!: CreditReferenceComponent;
  @ViewChild(ExposureDetailComponent)
  ExposureDetailComponent!: ExposureDetailComponent;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  // @ts-ignore
  dtOptions: DataTables.Settings = {};
  rows: any;
  eyeIcon: any = {
    confirmNewPassword: false,
    newPassword: false,
    currentPassword: false
  };
  isRefresh: boolean = false;
  agentBalance$: any;
  isMaster: any;
  UserSports: any = [];
  isChipSummary = false;
  selectedrow: any = {};
  customParams: any = {};
  agentBalance: any = {};
  routeToAssign: String = "";
  isRotating: boolean = false;

  constructor(private http: HttpClient, private router: Router,
    private backendService: BackendService, private toaster: ToastrService, private clipboard: Clipboard) {

  }
  ngOnInit(): void {

    setTimeout(() => {
      var filterInput = document.querySelector(".dataTables_filter input[type='search']") as HTMLInputElement;
      if (filterInput) {
        filterInput.value = ""
        filterInput.setAttribute("readonly", 'true');
        filterInput.removeAttribute("onfocus"); 
        filterInput.addEventListener("focus", function () {
          this.removeAttribute("readonly"); 
        });
   
      }
    }, 100);
    this.backendService.getNewUser().subscribe((res: any) => {
      this.rerender();
    });
    this.getAgentBalance();
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
      order: [0, 'asc'],
      processing: false,
      ajax: (dataTablesParameters: any, callback: any) => {
        that.http
          .post<any>(
            CONFIG.getUsersList,
            Object.assign(dataTablesParameters, {
              role: 'USER'
            })).subscribe(resp => {

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
      columns: [{ data: 'userName', orderable: true }, { data: 'creditReference', orderable: true }, { data: 'mainBalance', orderable: true }, { data: 'exposure', orderable: true }, { data: 'exposureLimit', orderable: true }, { data: 'availableBalance', orderable: false }, { data: 'referencepl', orderable: false }, { data: 'partnership', orderable: true }, { data: 'status', orderable: true }, { data: 'action', orderable: false }]
      // columns: [{ data: 'sportId' }, { data: '', }, { data: 'sportName' }]
    };
  }

  rerender(): void {
    this.isRotating = true;
    // Reset the animation after it's done to allow it to re-trigger on subsequent clicks
    setTimeout(() => {
      this.isRotating = false;
    }, 1000); // M
    // @ts-ignore
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
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
        data => {
          this.rerender();
          this.toaster.success(data.meta.message);
        },
        error => {
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
    // this.selectedrow.masterPassword = '';
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
        data => {
          this.rerender();
          this.backendService.getAgentBalanceRes();
          this.toaster.success(data.meta.message);

        },
        error => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  checkNumber() {
    this.selectedrow.amount = Math.abs(this.selectedrow.amount) == 0 ? '' : Math.abs(this.selectedrow.amount);
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
  changeUserStatus() {
    let req = {
      "status": this.selectedrow.type,
      "masterPassword": this.selectedrow.masterPassword,
      "userId": this.selectedrow._id
    }
    this.backendService.getAllRecordsByPost(CONFIG.changeUsersStatus, req)
      .pipe(first())
      .subscribe(
        data => {
          this.toaster.success(data.meta.message);
          this.rerender();
          this.selectedrow = {};
        },
        error => {
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
    if (this.routeToAssign == "bet-history") {
      this.router.navigateByUrl('bet-history');
    }
    else if (this.routeToAssign == "profit-loss") {
      this.router.navigateByUrl('profit-loss');
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
          data => {
            const arr2Map = new Map(data.data.map((item: any) => [item.sportId, true]));
            // Iterate through arr1 and add the "locked" property
            this.UserSports.data = this.UserSports.data.map((item: any) => ({
              ...item,
              locked: arr2Map.has(item.sportId),
            }));

          },
          error => {
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
        data => {
          this.toaster.success(data.meta.message);
        },
        error => {
          this.UserSports.data[index].locked = !sport.locked;
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  ConvertToIndianForamt(number: any) {
    if (number) {
      return number.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    }
    else {
      return 0
    }

  }
  copyToClipboard(text: any): void {
    this.clipboard.copy(text);
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
}

