import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { CONFIG } from '../../../../config';

@Component({
  selector: 'app-user-bet-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-bet-history.component.html',
  styleUrls: ['./user-bet-history.component.css']
})
export class UserBetHistoryComponent {
  data: any = [];
 userid: any;
 marketId:any;
 startDate: any;
 selectedObj:any={};
  endDate: any;
 sportId:any;
 isMaster:any;
 constructor(private backendService: BackendService,private route: ActivatedRoute,) {
  this.route.params.subscribe(params => {
    this.marketId = params['marketId'];
    this.sportId = params['sportId'];
    this.isMaster = params['isMaster'];
  });
 }
 ngOnInit(): void {
  this.startDate = localStorage.getItem('startDate');
  this.endDate = localStorage.getItem('endDate');
   this.userid = localStorage.getItem('fromUid');
   this.UpdateChipsSummary();
 }


 UpdateChipsSummary() {
    let reqForBets = {
      startDate: this.startDate,
      endDate: this.endDate,
      marketId:this.marketId,
      userId: this.userid,
      sportId:this.sportId
    }
   this.backendService.getAllRecordsByPost(CONFIG.getUserBetHistory, reqForBets)
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
 textSpliter(betPl:any,isfirst:any){
  const parts = betPl.split("(");
  if(isfirst){
    return parts[0]
  }
  else{
    let number = parts[1].substring(0, parts[1].length - 1);
    // console.log(number)
    return number
  }
  // const part1 = parts[0]; //
  // const part2 = parts[1].substring(0, parts[1].length - 1);
  // console.log("Part 1:", part1);
  // console.log("Part 2:", part2);

 }
 openDeviceInfo(item:any){
  this.selectedObj = item;
 }
}
