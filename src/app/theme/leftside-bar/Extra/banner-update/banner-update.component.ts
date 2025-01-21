import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../../../../services/backend.service';
import { CONFIG } from '../../../../../../config';

@Component({
  selector: 'app-banner-update',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner-update.component.html',
  styleUrls: ['./banner-update.component.css']
})
export class BannerUpdateComponent implements OnInit {
  sliderList: any = [];
  selectedFile: File | undefined;
  uploadedImages: string[] = [];
  previewImageUrl: string | ArrayBuffer | null = null;
  clearAllImg: boolean = false;;

  constructor(private networkservice: BackendService, private http: HttpClient,private toaster:ToastrService) { }


  ngOnInit(): void {

    this.getSliderList()

  }
  getSliderList() {
    this.networkservice.getAllRecordsByPost(CONFIG.getSliderList, {}).subscribe(res => {
      this.sliderList = res.data?.images;
    })
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }
  deleteImg(id:any) {
    this.networkservice.getAllRecordsByPost(CONFIG.deleteSlider, {sliderId:id}).subscribe(res => {
      this.toaster.success(res.meta.message);
      this.getSliderList();
    })
  }
  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();

     reader.onload = (e) => {
  this.previewImageUrl = e.target?.result as string | ArrayBuffer | null;
};

      reader.readAsDataURL(this.selectedFile);
    } else {
      this.previewImageUrl = null;
    }
  }
  savedata(index: any) {
    if (!this.selectedFile) {
      return;
    } const formData = new FormData();
    formData.append('sliderImage', this.selectedFile);
    formData.append('index', index);
    this.onUpload(formData)
  }
  clearAll() {
    const formData = new FormData();
    // Use an empty Blob to represent "no file"
    formData.append('sliderImage', new Blob());
  
    formData.append('index', '555');
    this.onUpload(formData);
  }
  onUpload(formData: any) {

    this.http.post<any>(CONFIG.saveSlider, formData)
      .subscribe(response => {

        this.uploadedImages.push(response.imageUrl);
        this.getSliderList();
        this.toaster.success(response.meta.message);
        this.selectedFile = undefined;
      }, error => {
        this.networkservice.ErrorNotification_Manager(error.error);
      });
  }
}

