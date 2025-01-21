import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../../../../services/backend.service';
import { CONFIG } from '../../../../../../config';

@Component({
  selector: 'app-client-notification',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './client-notification.component.html',
  styleUrls: ['./client-notification.component.css']
})
export class ClientNotificationComponent {
  news:any=''
  // addNews
  constructor(private backendService:BackendService,private toaster:ToastrService){

  }
  updateNews() {
    this.backendService.getAllRecordsByPost(CONFIG.addNotification, {notification:this.news})
      .pipe(first())
      .subscribe(
        res => {
          this.toaster.success(res.meta.message);
        },
        error => {
          this.backendService.ErrorNotification_Manager(error.error)

        });
  }
}
