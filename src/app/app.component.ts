import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./theme/header/header.component";
import { LayoutComponent } from "./theme/layout/layout.component";
import { MainService } from './services/main.service';
import { ConditionhandlerService } from './Services/conditionhandler.service';
import { filter } from 'rxjs';
import { CONFIG } from '../../config';
import { LoginComponent } from './auth/login/login.component';
import { CasinoResultModalComponent } from "./modals/casino-result-modal/casino-result-modal.component";
import { PlayerResultModalComponent } from "./modals/player-result-modal/player-result-modal.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlayerResultModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'd247-admin';
  currentRoute: String = "";
  constructor(private mainService: MainService, private conditionhandlerService: ConditionhandlerService, private router: Router, private toastr:ToastrService) {
    this.sportsList();
  }
  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;

      // for layout 
      this.conditionhandlerService.setCurrentRoute(this.currentRoute);
    });

  }

  sportsList() {
    this.mainService.getDataFromServices(CONFIG.sportsList, CONFIG.mSportsListTime, { key: CONFIG.siteKey }).subscribe((data: any) => {
      this.mainService.setSportsList(data?.data);
    });
  }
}
