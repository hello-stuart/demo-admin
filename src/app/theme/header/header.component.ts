import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ChangePasswordComponent } from "../../auth/change-password/change-password.component";
import { ConditionhandlerService } from "../../Services/conditionhandler.service";
import { RulesComponent } from "../../modals/rules/rules.component";
import { BackendService } from "../../services/backend.service";
import { first } from "rxjs";
import { CONFIG } from "../../../../config";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [FormsModule, RouterLink, ChangePasswordComponent, RulesComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  searchTerm = "";
  sideBarStatus: boolean = false;
  isRefresh: boolean = false;
  agentBalance: any = {};
  userdata: any = {};
  constructor(
    private router: Router,
    private conditionalHandler: ConditionhandlerService,
    private backendService: BackendService,
    private toastr: ToastrService
  ) { }
  ngOnInit() {
    this.userdata = JSON.parse(localStorage.getItem('userDetail') as string);
    this.getAgentBalance();
    this.conditionalHandler.getSideBarOpenStatus().subscribe((res) => {
      this.sideBarStatus = res
    })
  }
  getAgentBalance() {
    this.isRefresh = true
    this.backendService.getAllRecordsByPost(CONFIG.getAgentBalance, {})
      .pipe(first())
      .subscribe(
        res => {
          this.isRefresh = false
          this.agentBalance = res?.data;
          this.backendService.setAgentBalance(res)
        },
        error => {
          this.isRefresh = false
          //let statusError = error;

        });
  }
  //  logout work 
  logout() {
    this.backendService.getAllRecordsByPost(CONFIG.logOutAgent, {})
      .pipe(first())
      .subscribe(
        data => {
          localStorage.removeItem('token');
          localStorage.removeItem('userDetail');
        },
        error => {
          localStorage.removeItem('token');
          localStorage.removeItem('userDetail');
          let responseData = error.error;
          this.backendService.ErrorNotification_Manager(responseData);
        });
    this.navigateTo('/login');
    this.toastr.success('Logout Successfully')
  }
  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
  setSideBarOpenStatus() {
    this.conditionalHandler.setSideBarOpenStatus(!this.sideBarStatus);

  }

  logoClickHandler() {
    this.router.navigateByUrl("/");
    this.backendService.setProfilePagesStatus(false);
  }
}