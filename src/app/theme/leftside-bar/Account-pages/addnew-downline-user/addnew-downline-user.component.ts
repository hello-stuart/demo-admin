import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../../../../services/backend.service';
import { CONFIG } from '../../../../../../config';
declare var $: any;
@Component({
  selector: 'app-addnew-downline-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './addnew-downline-user.component.html',
  styleUrls: ['./addnew-downline-user.component.css']
})
export class AddnewDownlineUserComponent implements OnInit{
  @Output() addNewUser = new EventEmitter<any>();
  @Input() role: any = [];
  RollingCommission=false;
  agentRollingCommission=false;
  userName='';
  eyeIcon:any={
    confirmNewPassword:false,
    newPassword:false,
    currentPassword:false
  };
  passwordPattern = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&]*$';
  personalForm:any;

  agentAccountData:any =[];
  constructor(private networkService:BackendService,private toaster:ToastrService,private router: Router){

    if(this.router.url.includes('list/master')){
      this.personalForm = new FormGroup({
        userName: new FormControl('',Validators.required),
        name:new FormControl(''),
        password: new FormControl('',[Validators.required, Validators.pattern(this.passwordPattern)]),
        confirmPassword: new FormControl('', Validators.required),
        bankBalance: new FormControl('',Validators.required),
        level: new FormControl('',Validators.required),
        commission: new FormControl('',Validators.required),
        creditReference: new FormControl('',Validators.required),
        mobileNo: new FormControl ('',Validators.required),
        partnership:new FormControl( '' ,[Validators.required,Validators.pattern('^(?:[1-9][0-9]?|100)$')]),
        rollingFancyCommission: new FormControl('0'),
        rollingCasinoCommission: new FormControl('0'),
        rollingBinaryCommission: new FormControl('0'),
        rollingSportsbookCommission: new FormControl('0'),
        rollingBookmakerCommission: new FormControl('0'),
        rollingVirtualSportsCommission: new FormControl('0'),
        rollingLotteryCommission: new FormControl('0'),
        rollingMatkaCommission: new FormControl('0'),
        masterFancyCommission :  new FormControl('0'),
        masterMatkaCommission :  new FormControl('0'),
        masterCasinoCommission : new FormControl('0'),
        masterBinaryCommission :  new FormControl('0'),
        masterSportbookCommission :  new FormControl('0'),
        masterBookmakerCommission :  new FormControl('0'),
        // masterLotteryCommission :  new FormControl('0'),
        masterVirtualSportsCommission:  new FormControl('0'),
        masterPassword: new FormControl('',Validators.required),


      },{ validators: passwordMatchValidator });
    }
    else{
      this.personalForm = new FormGroup({
        userName: new FormControl('',Validators.required),
        name:new FormControl(''),
        password: new FormControl('',[Validators.required, Validators.pattern(this.passwordPattern)]),
        confirmPassword: new FormControl('', Validators.required),
        bankBalance: new FormControl('',Validators.required),
        level: new FormControl('7'),
        commission: new FormControl('',Validators.required),
        exposureLimit: new FormControl( '', Validators.required),
        creditReference: new FormControl('',Validators.required),
        mobileNo: new FormControl ('',Validators.required),
        partnership:new FormControl( '100'),
        rollingFancyCommission: new FormControl('0'),
        rollingCasinoCommission: new FormControl('0'),
        rollingBinaryCommission: new FormControl('0'),
        rollingSportsbookCommission: new FormControl('0'),
        rollingBookmakerCommission: new FormControl('0'),
        rollingVirtualSportsCommission: new FormControl('0'),
        rollingMatkaCommission: new FormControl('0'),

        masterPassword: new FormControl('',Validators.required),


      },{ validators: passwordMatchValidator });
    }
  }
  accountTypes:any  = [];
  userRole:any;
  ngOnInit(): void {
    this.getAccountStatmentData();
    let userdata = JSON.parse(localStorage.getItem('userDetail') as string);
    this.userRole = userdata?.role;
    this.assignedAccountTypes();
  }
  assignedAccountTypes(){
    if(this.userRole=='SUPER'){
      this.accountTypes = [
        {
          value:'5', AccountName:'MASTER'
        },
        {
          value:'6', AccountName:'AGENT'
        },
        {
          value:'7', AccountName:'USER'
        },
      ];
    }
    else if(this.userRole=='MASTER'){
      this.accountTypes = [
        {
          value:'6', AccountName:'AGENT'
        },
        {
          value:'7', AccountName:'USER'
        },
      ];
    }
    else if(this.userRole=='MAIN'){
      this.accountTypes = [
        {
          value:'2', AccountName:'ADMIN'
        },
        {
          value:'3', AccountName:'WHITE_LABEL'
        },
        {
          value:'4', AccountName:'SUPER'
        },
        {
          value:'5', AccountName:'MASTER'
        },
        {
          value:'6', AccountName:'AGENT'
        },
        {
          value:'7', AccountName:'USER'
        },
      ];
    }
    else if(this.userRole=='ADMIN'){
      this.accountTypes = [
        {
          value:'3', AccountName:'WHITE_LABEL'
        },
        {
          value:'4', AccountName:'SUPER'
        },
        {
          value:'5', AccountName:'MASTER'
        },
        {
          value:'6', AccountName:'AGENT'
        },
        {
          value:'7', AccountName:'USER'
        },
      ];
    }
    else if(this.userRole=='WHITE_LABEL'){
      this.accountTypes = [

        {
          value:'4', AccountName:'SUPER'
        },
        {
          value:'5', AccountName:'MASTER'
        },
        {
          value:'6', AccountName:'AGENT'
        },
        {
          value:'7', AccountName:'USER'
        },
      ];
    }
    else{
      this.accountTypes = [
        {
          value:'7', AccountName:'USER'
        },
      ];
    }
  }
  isCommission = false;
  showTable(event: any) {
    this.isCommission = !this.isCommission;
  }
  getAccountStatmentData() {
    this.networkService.getAllRecordsByPost(CONFIG.getAccountDetails, {})
      .pipe(first())
      .subscribe(
        data => {
          if (data.data) {
              this.agentAccountData = data.data;
          }
        },
        error => {
          console.log(error)
        });
  }
  checkRegisterUser() {
    this.networkService.getAllRecordsByPost(CONFIG.checkRegisterUser, {userName:this.personalForm.value.userName})
      .pipe(first())
      .subscribe(
        data => {
          this.toaster.success(data.meta.message);
        },
        error => {
          let responseData = error.error;
          this.networkService.ErrorNotification_Manager(responseData);
          this.personalForm.value.userName = ''
        });
  }
  createUser() {
    if(this.personalForm.invalid){
      return
    }
    this.networkService.getAllRecordsByPost(CONFIG.createAccount, this.personalForm.value)
      .pipe(first())
      .subscribe(
        data => {
          $('#AddNewUserModal').modal('hide');
          this.networkService.setNewUser('');
          this.toaster.success(data.meta.message);
        },
        error => {
          let responseData = error.error;
          this.networkService.ErrorNotification_Manager(responseData);
        });
  }
  changerollingcOmmsion(event:any){
    this.RollingCommission = event.target.value
  }
  levelchanged(){
    if(this.personalForm.get('level')?.value=='7'){
      this.personalForm.get('partnership')?.setValue('100');
      this.personalForm.get('partnership')?.disable();
    }
    else{
      this.personalForm.get('partnership')?.enable();
    }
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
