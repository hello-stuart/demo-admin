import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';
import moment from 'moment';
import { BackendService } from '../../../../services/backend.service';
import { CONFIG } from '../../../../../../config';

@Component({
  selector: 'app-activitylog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activitylog.component.html',
  styleUrls: ['./activitylog.component.css']
})
export class ActivitylogComponent {
  data: any = []
  userid: any;
  constructor(private backendService: BackendService) {

  }
  ngOnInit(): void {
    this.userid = localStorage.getItem('fromUid');
    this.clientActivity();
  }

  getLocalDateTime(date: Date) {
    var res = new Date(date);
    return moment(res, "D-M-YYYY hh:mm A").format('D-M-YYYY hh:mm A');
  }
  clientActivity() {
    let req:any ={};
    if(this.userid){
      req.userId = this.userid;
    }
    this.backendService.getAllRecordsByPost(CONFIG.userActivityList, req)
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
}
