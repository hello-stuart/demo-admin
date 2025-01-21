import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../../../../services/backend.service';
import { CONFIG } from '../../../../../../config';

@Component({
  selector: 'app-news-update',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.css']
})
export class NewsUpdateComponent {
  news:any='';
  oldNews:any;
  // addNews
  constructor(private backendService:BackendService,private toaster:ToastrService){
    this.getNews();
  }
  updateNews() {
    this.backendService.getAllRecordsByPost(CONFIG.addNews, {news:this.news})
      .pipe(first())
      .subscribe(
        res => {
          this.toaster.success(res.meta.message);
        },
        error => {
          this.backendService.ErrorNotification_Manager(error.error)

        });
  }
  getNews(){
    this.backendService.getAllRecordsByPost(CONFIG.getNews, {})
    .pipe(first())
    .subscribe(
      res => {
       this.oldNews=res?.data?.news;
      },
      error => {
        this.backendService.ErrorNotification_Manager(error.error)

      });
  }
}
