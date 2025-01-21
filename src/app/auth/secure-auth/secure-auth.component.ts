import { Component } from '@angular/core';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../../services/backend.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CONFIG } from '../../../../config';

@Component({
  selector: 'app-secure-auth',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './secure-auth.component.html',
  styleUrl: './secure-auth.component.css'
})
export class SecureAuthComponent {
  otp1Box = '';
  otp2Box = '';
  otp3Box = '';
  otp4Box = '';
  otp5Box = '';
  otp6Box = '';
  secureStatus: any = {};
  connectionId: any;
  Password = '';
  interval: any;
  timerOtp=30;
  disableOtp = false
  timerInterval:any;
  constructor(private toaster: ToastrService, private backendService: BackendService) {

  }
  ngOnDestroy(): void {
    window.clearInterval(this.interval);
    window.clearInterval(this.timerInterval)
  }
  ngOnInit(): void {
    this.checkSecureStatus();

  }
  EnterFunction(event: any, prev: any, cur: any, next: any) {
    if (event.keyCode === 8 || event.keyCode === 27 || event.keyCode === 46) {
      if (prev !== "") {
        prev.value = "";
        if (prev.id == 'OTPBox1') {
          this.otp1Box = ''
        } else if (prev.id == 'OTPBox2') {
          this.otp2Box = ''
        }
        else if (prev.id == 'OTPBox3') {
          this.otp3Box = ''
        }
        else if (prev.id == 'OTPBox4') {
          this.otp4Box = ''
        }
        else if (prev.id == 'OTPBox5') {
          this.otp5Box = ''
        }
        else if (prev.id == 'OTPBox6') {
          this.otp6Box = ''
        }
        prev.focus();
      }
      return
    }
    else {
      if(cur.value.length>1){
        for (let i = 0; i < cur.value.length; i++) {
          if(i==0){
            this.otp1Box=cur.value[i]
          }else  if(i==1){
            this.otp2Box=cur.value[i]
          }
          else  if(i==2){
            this.otp3Box=cur.value[i]
          }
          else  if(i==3){
            this.otp4Box=cur.value[i]
          }
          else if(i==4){
            this.otp5Box=cur.value[i]
          }
          else  if(i==5){
            this.otp6Box=cur.value[i]
          }
        }
      }
      if (cur.value != "" && next) {
        next.focus();
      }
      if (!next) {
        // this.submitOtp();
      }
    }


  }
  submitOtp() {
    if (this.otp1Box && this.otp2Box && this.otp3Box && this.otp4Box && this.otp5Box && this.otp6Box) {
      let code = this.otp1Box + this.otp2Box + this.otp3Box + this.otp4Box + this.otp5Box + this.otp6Box;
      this.backendService.getAllRecordsByPost(CONFIG.disabled2FAOtpVerify, { otp: code })
        .pipe(first())
        .subscribe(
          (data:any) => {
            this.disableOtp = false;
            this.toaster.success(data.meta.message);
            this.checkSecureStatus();
          },
          (error:any) => {
            let responseData = error.error;
            this.backendService.ErrorNotification_Manager(responseData);
          });
    }
    else {
      this.toaster.error('Otp is invalid.!')
    }

  }
  checkSecureStatus() {
    this.backendService.getAllRecordsByPost(CONFIG.checkSecureStatus, {})
      .pipe(first())
      .subscribe(
        (data:any) => {
          if(this.secureStatus?.status!=data.data.status &&this.secureStatus?.status ){
            window.clearInterval(this.interval);
            this.backendService.logout();
          }
          this.secureStatus = data.data
          console.log(this.secureStatus,'secure status....')

        },
        (error:any) => {
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
  }
  getConnectionId() {
    if (this.Password.length > 0) {
      this.backendService.getAllRecordsByPost(CONFIG.getConnectionId, { password: this.Password })
        .pipe(first())
        .subscribe(
          (data:any) => {
            this.connectionId = data.data;
            this.connectionId.botName= this.connectionId.botName.slice(1);
            this.interval = window.setInterval(() => {
              this.checkSecureStatus();
            }, 1000);
          },
          (error:any) => {
            let responseData = error.error;
            this.backendService.ErrorNotification_Manager(responseData);
          });
    }
    else {
      this.toaster.error('Password is required !')
    }
  }
  disabled2FA() {
    this.backendService.getAllRecordsByPost(CONFIG.disabled2FA, {})
      .pipe(first())
      .subscribe(
        (data:any) => {
          this.toaster.success(data.meta.message);
          this.disableOtp = true;
          setTimeout(() => {
            document.getElementById('OTPBox1')?.focus();
          }, 200);
          this.timerOtp=30;
          this.timerInterval = window.setInterval(() => {
            this.timerOtp--;
            if(this.timerOtp==0){
              window.clearInterval(this.timerInterval)
            }
          }, 1000);
        },
        (error:any) => {
          let responseData = error.error;
          this.disableOtp = false;
          this.backendService.ErrorNotification_Manager(responseData);
        });

  }
}