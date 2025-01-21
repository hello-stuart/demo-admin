import { ApplicationConfig, importProvidersFrom, NgZone, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UnityInterceptor } from './interceptors/jwt-intercepter.interceptor';
import { NgbDatepickerI18n, NgbDropdownMenu, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ConditionhandlerService } from './Services/conditionhandler.service';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFirestoreBinary, AngularFirestoreCricket, AngularFirestoreOther, AngularFirestoreScore, AngularFirestoreSoccer, AngularFirestoreTennis } from './services/firebase.service';
import { IMAGE_CONFIG } from '@angular/common';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),BrowserModule, provideToastr(), provideAnimations(), BrowserAnimationsModule,
    importProvidersFrom(ToastrModule.forRoot({
        maxOpened:1,
        autoDismiss:true,
         easeTime: 100,
         toastClass:'toast-container ngx-toastr toastr-styles swal2-popup.swal2-toast'
    }), HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass:  UnityInterceptor, multi: true } ,
    { provide: NgbDatepickerI18n, useClass: ConditionhandlerService, },
    NgbDropdownModule,
    NgbDropdownMenu,
    {
      provide: 'firebaseProjectCricket',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreCricket
  },
  {
      provide: 'firebaseProjectTennis',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreTennis
  },
  {
      provide: 'firebaseProjectSoccer',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreSoccer
  },
  {
      provide: 'firebaseProjectBinary',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreBinary
  },
  {
      provide: 'firebaseProjectOther',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreOther
  },
  {
      provide: 'firebaseProjectScore',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreScore
  },
  {
      provide: IMAGE_CONFIG,
      useValue: {
          disableImageSizeWarning: true,
          disableImageLazyLoadWarning: true
      }
  },
  ]
};
