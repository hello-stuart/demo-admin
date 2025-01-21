import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkService } from 'src/app/service/network.service';
import { CONFIG } from 'config';
import { first } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  data: any = {}
  userid: any;
  subchild: any;
  isMaster: any;
  eyeIcon: any = {
    confirmNewPassword: false,
    newPassword: false,
    currentPassword: false
  };
  showRolling = false;
  constructor(private backendService: NetworkService, private toaster: ToastrService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.isMaster = params['isMaster'];
      if(this.isMaster=='master'){
        this.isMaster=true;
      }
    });
  }
  passwordPattern = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&]*$';
  passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    confirmPassword: new FormControl('', Validators.required),
    MasterPassword: new FormControl('', Validators.required),
  }, { validators: passwordMatchValidator });
  ngOnInit(): void {
    
    this.userid = localStorage.getItem('fromUid');
    this.subchild = localStorage.getItem('subchild')? true : false;
    if(!this.isMaster){
    this.isMaster = localStorage.getItem('childUserRole') != 'USER' ? true : false;
  }
    this.getProfileData();

  }


  getProfileData() {

    let req: any = {}
    if (this.userid) {
      req.userId = this.userid;
    }

    this.backendService.getAllRecordsByPost(CONFIG.getUserProfileData, req)
      .pipe(first())
      .subscribe(
        data => {
          this.data = data.data;
        },
        error => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  updateUserRollingCommission(data: any) {
    let req = {
        "userId": this.userid,
        "password": data.mPassword,
        "rollingFancyCommission": data.rollingFancyCommission,
        "rollingCasinoCommission": data.rollingCasinoCommission,
        "rollingBinaryCommission": data.rollingBinaryCommission,
        "rollingSportsbookCommission": data.rollingSportsbookCommission,
        "rollingBookmakerCommission": data.rollingBookmakerCommission,
        "rollingVirtualSportsCommission": data.rollingVirtualSportsCommission,
        "rollingMatkaCommission": data.rollingMatkaCommission,
      }


    this.backendService.getAllRecordsByPost(CONFIG.updateUserRollingCommission, req)
      .pipe(first())
      .subscribe(
        data => {
          this.toaster.success(data.meta.message);
        },
        error => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  updateMasterRollingCommission(data: any) {
    let req = {
        "userId": this.userid,
        "password": data.mPassword,
        "masterFancyCommission": data.masterFancyCommission,
        "masterCasinoCommission": data.masterCasinoCommission,
        "masterBinaryCommission": data.masterBinaryCommission,
        "masterSportbookCommission": data.masterSportbookCommission,
        "masterBookmakerCommission": data.masterBookmakerCommission,
        "masterVirtualSportsCommission": data.masterVirtualSportsCommission,
        "masterMatkaCommission": data.masterMatkaCommission,
      }

    this.backendService.getAllRecordsByPost(CONFIG.updateMasterRollingCommission, req)
      .pipe(first())
      .subscribe(
        data => {
          this.toaster.success(data.meta.message);
        },
        error => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  CreditOrExposureLimit(datanew: any) {
    let req: any = {}
    let url = ''
    url = CONFIG.updateExposureLimit;
    req = {
      exposureLimit: datanew.newLimitLable,
      masterPassword: datanew.masterPassword,
      userId: this.userid,
    }

    this.backendService.getAllRecordsByPost(url, req)
      .pipe(first())
      .subscribe(
        data => {
          this.data.exposureLimit = datanew.newLimitLable;
          data.masterPassword = '';
          this.toaster.success(data.meta.message);


        },
        error => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  ChangeMobileNumber(datanew: any) {
    let req = {}

    req = {
      "mobileNo": datanew.mobileNumber,
      "password": datanew.masterPassword,
      "userId": this.userid
    }
    this.backendService.getAllRecordsByPost(CONFIG.updateUserMobileNo, req)
      .pipe(first())
      .subscribe(
        data => {

          data.masterPassword = '';
          this.toaster.success(data.meta.message);


        },
        error => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  updateUserMatchOddsCommission(datanew: any) {
    let req = {}

    req = {
      "commission": datanew.commission,
      "password": datanew.masterPassword,
      "userId": this.userid
    }
    this.backendService.getAllRecordsByPost(CONFIG.updateUserMatchOddsCommission, req)
      .pipe(first())
      .subscribe(
        data => {
          this.data.takenCommission=datanew.commission,
          data.masterPassword = '';
          this.toaster.success(data.meta.message);


        },
        error => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  changeUserPassword() {
    let req: any = {
      "newPassword": this.passwordForm.value.password,
      "masterPassword": this.passwordForm.value.MasterPassword,

    }
    if (this.userid) {
      req.userId = this.userid
    }
    this.backendService.getAllRecordsByPost(CONFIG.changeParentUserPassword, req)
      .pipe(first())
      .subscribe(
        data => {
          $('#changePasswordModal').modal('hide');
          this.toaster.success(data.meta.message);

        },
        error => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
}
function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const newPassword = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (newPassword?.value !== confirmPassword?.value) {
    return { passwordMismatch: true };
  }

  return null;
}
