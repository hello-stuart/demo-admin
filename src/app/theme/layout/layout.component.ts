import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { LeftsideBarComponent } from "../leftside-bar/leftside-bar.component";
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { CasinoGamesComponent } from "../casino-games/casino-games.component";
import { FooterComponent } from "../footer/footer.component";
import { ConditionhandlerService } from '../../Services/conditionhandler.service';
import { CasinoMatchedBetsComponent } from "../../Components/casino-matched-bets/casino-matched-bets.component";
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, LeftsideBarComponent, RouterOutlet, NgClass, FooterComponent, CasinoMatchedBetsComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(private conditionalHandler: ConditionhandlerService, private route: ActivatedRoute, private BackendService: BackendService,) {
    {
      this.BackendService.getRole().subscribe((res: any) => {
        this.role = res;
      })
    }
  }
  showLeftSidebar: boolean = false;
  currentRoute: String = "";
  role: any;
  routesToCheck = [
    '/profile',
    '/account-statement',
    '/activity-log',
    '/profit-loss',
    '/bet-history',
  ];

  ngOnInit() {
    this.conditionalHandler.getCurrentRoute().subscribe((res: any) => {
      this.currentRoute = res;
    })
    this.conditionalHandler.getSideBarOpenStatus().subscribe((res: any) => {
      this.showLeftSidebar = res;
    })

  }
  isMatchingRoute(): boolean {
    return this.routesToCheck.some((route) =>
      this.currentRoute.includes(route)
    );
  }
}
