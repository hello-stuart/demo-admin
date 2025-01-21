import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { CONFIG } from '../../../../config';

@Component({
  selector: 'app-casino-result-modal',
  standalone: true,
  imports: [],
  templateUrl: './casino-result-modal.component.html',
  styleUrl: './casino-result-modal.component.css'
})
export class CasinoResultModalComponent
  implements OnInit {
  rulesInfo: any[] = [];
  allSportRules: any;
  CasinoGameResult: any



  constructor(private backendservice: BackendService) {
    // this.ruleslist$.subscribe((data: any) => {
    //   this.gameRulesList(data);
    // });
  }


  ngOnInit() {
    let token = localStorage.getItem('token');
    this.backendservice.getCasinoResults().subscribe((res: any) => {
      this.CasinoGameResult = res;

    })
    this.backendservice.getRules().subscribe((res: any) => {
      // this.gameRulesList(res);
    })
    // this.gameRulesList();

  }
  gameRules() {
    this.backendservice.getDataFromServices(CONFIG.sportsRulesList, CONFIG.sportsRulesListTime, { key: CONFIG.siteKey })
      .subscribe(
        data => {
          this.rulesInfo = data?.data;
          console.log(data.data)

        },
        error => {
          console.error('Error fetching rules:', error);
        }
      );
  }
  gameRulesList() {
    this.backendservice.getAllRecordsByPost(CONFIG.sportsRulesList, {})
      .subscribe(
        data => {
          if (data.meta.status === true) {
            this.rulesInfo = data.data.filter((item: any, index: number) => {
              if (index === 0) {
                return (
                  item.sportID !== undefined &&
                  item.sportName !== undefined &&
                  item.Rules !== undefined
                );
              }
              return true;
            });
            console.log(data.data, 'RULES DATA')
          }

        },
        error => {
          console.error('Error fetching rules:', error);
        }
      );
  }

}
