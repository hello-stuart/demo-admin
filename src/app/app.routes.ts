import { Router, Routes } from "@angular/router";
import { MultiLoginAccountsComponent } from "./Components/multi-login-accounts/multi-login-accounts.component";
import { LoginComponent } from "./auth/login/login.component";
import { AccountListComponent } from "./theme/leftside-bar/Account-pages/account-list/account-list.component";
import { CreateAccountComponent } from "./theme/leftside-bar/Account-pages/create-account/create-account.component";
import { BankingComponent } from "./Components/banking/banking.component";
import { AccountStatementComponent } from "./theme/leftside-bar/Reports/account-statement/account-statement.component";
import { WinLossComponent } from "./theme/leftside-bar/Reports/win-loss/win-loss.component";
import { GeneralLockComponent } from "./theme/leftside-bar/Reports/general-lock/general-lock.component";
import { MarketDetailsComponent } from "./Components/market-details/market-details.component";
import { CurrentBetsComponent } from "./theme/leftside-bar/Reports/current-bets/current-bets.component";
import { LiveCasinoResultComponent } from "./theme/leftside-bar/Reports/live-casino-result/live-casino-result.component";
import { OurCasinoResultComponent } from "./theme/leftside-bar/Reports/our-casino-result/our-casino-result.component";
import { TurnOverReportComponent } from "./theme/leftside-bar/Reports/turn-over-report/turn-over-report.component";
import { LobbyComponent } from "./theme/lobby/lobby.component";
import { SecureAuthComponent } from "./auth/secure-auth/secure-auth.component";
import { DashboardComponent } from "./theme/dashboard/dashboard.component";
import { ThemeLayoutComponent } from "./theme-layout/theme-layout.component";
import { MarketAnalysisComponent } from "./theme/market-analysis/market-analysis.component";
import { UserDownlinelistComponent } from './theme/leftside-bar/Account-pages/user-downlinelist/user-downlinelist.component';
import { MasterDownlinelistComponent } from "./theme/leftside-bar/Account-pages/master-downlinelist/master-downlinelist.component";
import { UserBankingComponent } from "./Components/banking/user-banking/user-banking.component";
import { PasswordHistoryComponent } from './theme/leftside-bar/Reports/password-history/password-history.component';
import { ProfitandLossComponent } from "../app/theme/leftside-bar/Account-pages/profitand-loss/profitand-loss.component";
import { BetHistoryComponent } from "./theme/leftside-bar/Account-pages/bet-history/bet-history.component";
import { ProfileComponent } from "./theme/leftside-bar/Account-pages/profile/profile.component";
import { ActivitylogComponent } from "./theme/leftside-bar/Account-pages/activitylog/activitylog.component";
import { EventProfitLossComponent } from "./theme/leftside-bar/Reports/event-profit-loss/event-profit-loss.component";
import { DownlineProfitLossComponent } from "./theme/leftside-bar/Reports/downline-profit-loss/downline-profit-loss.component";
import { BannerUpdateComponent } from "./theme/leftside-bar/Extra/banner-update/banner-update.component";
import { NewsUpdateComponent } from "./theme/leftside-bar/Extra/news-update/news-update.component";
import { ClientNotificationComponent } from "./theme/leftside-bar/Extra/client-notification/client-notification.component";
import { MyAccountComponent } from "./theme/leftside-bar/my-account/my-account.component";
import { ProfitLossMarketsComponent } from "../app/Components/profit-loss-markets/profit-loss-markets.component";
import { UserBetHistoryComponent } from "./Components/user-bet-history/user-bet-history.component";
import { ProfitLossEventsComponent } from "../app/Components/profit-loss-events/profit-loss-events.component";


function PasswordCHanged(router: Router) {
  const userdata = JSON.parse(localStorage.getItem('userDetail') as string);
  const isLogin = userdata.isLogin;
  if (isLogin == '0') {
    return false;
  } else {
    return true; // Allow access to the route
  }
}
export const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: ThemeLayoutComponent,
    children: [
      { path: "profit-loss", component: ProfitandLossComponent },
      { path: "account-statement", component: AccountStatementComponent },
      { path: "activity-log", component: ActivitylogComponent },
      { path: "event-profit-loss", component: EventProfitLossComponent },
      { path: "downline-profit-loss", component: DownlineProfitLossComponent },

      { path: "profile", component: ProfileComponent },
      { path: "bet-history", component: BetHistoryComponent },
      { path: "", component: DashboardComponent },
      { path: "multiusers", component: MultiLoginAccountsComponent },
      { path: "banking", component: BankingComponent },
      { path: "account-statement", component: AccountStatementComponent },
      { path: "win-loss", component: WinLossComponent },
      { path: "general-lock", component: GeneralLockComponent },
      { path: "marketdetails/:eventId/:id", component: MarketDetailsComponent },
      { path: "current-bets", component: CurrentBetsComponent },
      { path: "live-casino-result", component: LiveCasinoResultComponent },
      { path: "our-casino-result", component: OurCasinoResultComponent },
      { path: "turn-over-report", component: TurnOverReportComponent },
      { path: "casino", component: LobbyComponent },
      { path: "virtual-games", component: LobbyComponent },
      { path: "secure-auth", component: SecureAuthComponent },
      { path: "market-analysis", component: MarketAnalysisComponent },
      { path: "user-downlinelist", component: UserDownlinelistComponent },
      { path: "master-downlinelist", component: MasterDownlinelistComponent },
      { path: "user-banking", component: UserBankingComponent },
      { path: "banner-update", component: BannerUpdateComponent },
      { path: "news", component: NewsUpdateComponent },
      { path: "client-notification", component: ClientNotificationComponent },
      { path: "my-account", component: MyAccountComponent },
      {
        path: 'plMarket/:sportId/:eventId/:dataSource/:isMaster',
        component: ProfitLossMarketsComponent
      },
      {
        path: 'userBetHistory/:sportId/:marketId/:dataSource/:isMaster',
        component: UserBetHistoryComponent
      },
      {
        path: 'plEvent/:sportId/:dataSource/:isMaster',component: ProfitLossEventsComponent
      },
    
      {
        path: "2020-teenpatti/:id", loadComponent: () => import("./casino-games/twenty-20-teenpatti/twenty-20-teenpatti.component").then((m) => m.Twenty20TeenpattiComponent),
      },
      {
        path: "20-20-dragonTiger/:id", loadComponent: () => import("./casino-games/dragon-tiger-2020/dragon-tiger-2020.component").then((m) => m.DragonTiger2020Component),
      },
      {
        path: "baccarat/:id", loadComponent: () => import("./casino-games/baccarat/baccarat.component").then((m) => m.BaccaratComponent),
      },
      {
        path: "fastLucky7/:id", loadComponent: () => import("./casino-games/fast-lucy7/fast-lucy7.component").then((m) => m.FastLucy7Component),
      },
      {
        path: "twentyCardRace/:id", loadComponent: () => import("./casino-games/twenty-card-race/twenty-card-race.component").then((m) => m.TwentyCardRaceComponent),
      },
      {
        path: "lottery/:id", loadComponent: () => import("./casino-games/lottery/lottery.component").then((m) => m.LotteryComponent),
      },
      {
        path: "trio/:id", loadComponent: () => import("./casino-games/trio/trio.component").then((m) => m.TrioComponent),
      },
      {
        path: "oneCard2020/:id", loadComponent: () => import("./casino-games/one-card2020/one-card2020.component").then((m) => m.OneCard2020Component),
      },
      {
        path: "instantWorli/:id", loadComponent: () => import("./casino-games/instand-worli/instand-worli.component").then((m) => m.InstandWorliComponent),
      },
      {
        path: "casinoMetter/:id", loadComponent: () => import("./casino-games/casino-metter/casino-metter.component").then((m) => m.CasinoMetterComponent),
      },
      {
        path: "muflisTeenpatti/:id", loadComponent: () => import("./casino-games/muflis-teenpatti/muflis-teenpatti.component").then((m) => m.MuflisTeenpattiComponent),
      },
      {
        path: "3cardJudgment/:id", loadComponent: () => import("./casino-games/three-card-judgement/three-card-judgement.component").then((m) => m.ThreeCardJudgementComponent),
      },
      {
        path: "oneday-teenpatti/:id", loadComponent: () => import("./casino-games/oneday-teenpatti/oneday-teenpatti.component").then((m) => m.OnedayTeenpattiComponent),
      },
      {
        path: "dragon-tiger/:id", loadComponent: () => import("./casino-games/dragon-tiger/dragon-tiger.component").then((m) => m.DragonTigerComponent),
      },
      {
        path: "1daydragontiger/:id", loadComponent: () => import("./casino-games/dragon-tiger-oneday/dragon-tiger-oneday.component").then((m) => m.DragonTigerOnedayComponent),
      },
      {
        path: "29cards-baccarat/:id", loadComponent: () => import("./casino-games/baccarat-29/baccarat-29.component").then((m) => m.Baccarat29Component),
      },
      {
        path: "lucky7a/:id", loadComponent: () => import("./casino-games/lucky-7-a/lucky-7-a.component").then((m) => m.Lucky7AComponent),
      },
      {
        path: "casinowar/:id", loadComponent: () => import("./casino-games/casino-war/casino-war.component").then((m) => m.CasinoWarComponent),
      },
      {
        path: 'pocker2020/:id', loadComponent: () => import('./casino-games/poker/poker.component').then(m => m.PokerComponent),
      },
      {
        path: 'amarAkbarAnthony/:id', loadComponent: () => import('./casino-games/amar-akbar-anthony/amar-akbar-anthony.component').then(m => m.AmarAkbarAnthonyComponent),
      },
      {
        path: 'bollywood/:id', loadComponent: () => import('./casino-games/bollywood-casino/bollywood-casino.component').then(m => m.BollywoodCasinoComponent),
      },
      {
        path: "andarBahar/:id", loadComponent: () => import("./casino-games/andar-bahar-a/andar-bahar-a.component").then((m) => m.AndarBaharAComponent),
      },
      {
        path: "32cards/:id", loadComponent: () => import("./casino-games/card-32-a/card-32-a.component").then((m) => m.Card32AComponent),
      },
      {
        path: 'kbc/:id', loadComponent: () => import('./casino-games/kbc/kbc.component').then((m) => m.KbcComponent)
      },
      {
        path: 'one-card-meter/:id', loadComponent: () => import('./casino-games/one-card-meter/one-card-meter.component').then((m) => m.OneCardMeterComponent)
      },
      {
        path: 'dtlTeenpatti/:id', loadComponent: () => import('./casino-games/dtl-teenpatti/dtl-teenpatti.component').then((m) => m.DtlTeenpattiComponent)
      },
      {
        path: 'lucky0To9/:id', loadComponent: () => import('./casino-games/lucky0-to9/lucky0-to9.component').then((m) => m.Lucky0To9Component)
      },
      {
        path: 'headNtails/:id', loadComponent: () => import('./casino-games/head-ntails/head-ntails.component').then((m) => m.HeadNtailsComponent)
      },
      {
        path: 'dream-catcher/:id', loadComponent: () => import('./casino-games/dream-catcher/dream-catcher.component').then((m) => m.DreamCatcherComponent)
      },
      {
        path: 'dtl/:id', loadComponent: () => import('./casino-games/dtl/dtl.component').then((m) => m.DtlComponent)
      },
      // {
      //   path: 'profit-loss',
      //   loadComponent: () => import('../app/theme/leftside-bar/Account-pages/profitand-loss/profitand-loss.component').then(m => m.ProfitandLossComponent),
      // },
      {
        path: 'master-banking',
        loadComponent: () => import('../app/Components/banking/user-banking/user-banking.component').then(m => m.UserBankingComponent),
        canActivate: [PasswordCHanged],
      },
      {
        path: 'user-banking',
        loadComponent: () => import('../app/Components/banking/user-banking/user-banking.component').then(m => m.UserBankingComponent),
        canActivate: [PasswordCHanged],
      },
      {
        path: 'restore-user',
        loadComponent: () => import('./theme/restore-user/restore-user.component').then(m => m.RestoreUserComponent),
        canActivate: [PasswordCHanged],
      },
      {
        path: 'password-history',
        loadComponent: () => import('../app/theme/leftside-bar/Reports/password-history/password-history.component').then(m => m.PasswordHistoryComponent),
        canActivate: [PasswordCHanged],
      },
      {
        path: 'commission',
        loadComponent: () => import('../app/theme/leftside-bar/Reports/commission/commission.component').then(m => m.CommissionComponent),
        canActivate: [PasswordCHanged],
      },
      {
        path: 'plEvent/:sportId/:dataSource',
        loadComponent: () => import('../app/Components/profit-loss-events/profit-loss-events.component').then(m => m.ProfitLossEventsComponent),
      },
      {
        path: 'plMarket/:sportId/:eventId/:dataSource',
        loadComponent: () => import('../app/Components/profit-loss-markets/profit-loss-markets.component').then(m => m.ProfitLossMarketsComponent),
      },{
        path: 'userwise-profitloss/:sportId/:marketId/:dataSource',
        loadComponent: () => import('../app/theme/leftside-bar/Account-pages/userwise-profit-loss/userwise-profit-loss.component').then(m => m.UserwiseProfitLossComponent),
        canActivate: [PasswordCHanged],
      },
      {
        path:'my-account/plEvent/:sportId/:dataSource',
        loadComponent: () => import('../app/Components/profit-loss-events/profit-loss-events.component').then(m => m.ProfitLossEventsComponent)
      },
      {
        path: 'my-account/plMarket/:sportId/:eventId/:dataSource',
        loadComponent: () => import('../app/Components/profit-loss-markets/profit-loss-markets.component').then(m => m.ProfitLossMarketsComponent),
      },
      
    ],
  },
];
