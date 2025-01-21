import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { CONFIG } from "../../../../config";
import { first } from "rxjs";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BackendService } from "../../services/backend.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @ViewChild('userNameInput') userNameInput: ElementRef | any;
  loginForm: FormGroup | any;
  isDemoButtonDisable: boolean = false;
  isLoadingDemo: boolean = false;
  isLoadingReal: boolean = false;
  show_Eye: boolean = false;
  submitted: boolean = false;
  errorMessage: string = '';
  
  staticIpRes = {
    as: '0',
    city: '0',
    country: '0',
    countryCode: '0',
    isp: '0',
    lat: '0',
    lon: '0',
    org: '0',
    query: '0',
    region: '0',
    regionName: '0',
    status: '0',
    timezone: '0',
    zip: '0',
  };

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    public router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Mark all fields as touched so validation messages show up if empty
    this.loginForm.markAllAsTouched();

    // If the form is invalid, stop submission
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;
    this.loginAuthentication("REAL", username, password);
}


  loginAuthentication(type: string, username?: string, password?: string): void {
    if (type === 'demo') {
      this.backendService.getIpLocation().subscribe((locRes: any) => {
        this.Postlogin('jkbhai', 'irfan@123', locRes);
      });
    } else {
      const usernameValue = this.loginForm.get('username')?.value;
      const passwordValue = this.loginForm.get('password')?.value;

      this.errorMessage = '';   
      this.backendService.getIpLocation().subscribe(
        (locRes: any) => {
          this.isLoadingReal = true;
          this.Postlogin(usernameValue, passwordValue, locRes);
        },
        (error) => {
          this.Postlogin(usernameValue, passwordValue, this.staticIpRes);
        }
      );
    }
    this.router.navigateByUrl("/");
    this.toaster.success('success')
  }

  Postlogin(username: string, password: string, ipInfo: any): void {
    localStorage.setItem("loginAuth", "loginAuth");

    this.backendService
      .getAllRecordsByPost(CONFIG.userLoginURL, { username, password, ipInfo })
      .pipe(first())
      .subscribe(
        (res: any) => {
          if (res.meta.status_code === 200) {
            localStorage.setItem("token", res.data.accessToken);
            const currentTime = new Date();
            const userDetails = {
              data: res.data.userDetail,
              timestamp: currentTime.toISOString(),
            };
            localStorage.setItem("userDetail", JSON.stringify(userDetails));
            this.router.navigate([res.data.userDetail.isLogin === 0 ? "/change-password" : "/"]);
          }
        },
        (error: any) => {
          this.errorMessage = 'Login failed. Please try again.';
          // this.toaster.error(this.errorMessage);
        }
      );
  }

  togglePasswordVisibility(): void {
    this.show_Eye = !this.show_Eye;
  }

  checkAndFocusInput(): void {
    if (!this.f.username.value) {
      this.userNameInput.nativeElement.focus();
    }
  }
}
