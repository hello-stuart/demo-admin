import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, forkJoin, map } from 'rxjs';
import { IndexDbService } from './index-db.service';
import { HttpClient } from "@angular/common/http";
import { BackendService } from './backend.service';
import { CONFIG } from '../../../config';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  // Subjects for various operations/events
  expireTime: any;
  public value: any;
  private AllSportsStatic: any;
  private AllSports = new Subject<any>();
  private isActiveHome = new Subject<any>();
  private CurrentSportObj = new Subject<any>();
  private Marquee_hide = new Subject<any>();
  private ods = new Subject<any>();
  private activesportSubject = new Subject<any>();
  private EventId = new Subject<any>();
  private expoModal = new Subject<any>();
  private betlist = new Subject<any>();
  private routeUrlForSideNav = new Subject<any>();
  private showHideStreaming: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private setCompttiondata = new Subject<any>();
  private sportsList: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private isCalledAfterBetplaceFun: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(false);
  private isSatusCloseBetslip: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(false);
  private odds = new Subject<any>();
  private exposureDesktopbetSlip = new Subject<any>();
  private afterBetPL = new Subject<any>();
  private betPlace = new Subject<any>();
  private forClass = new Subject<any>();
  private betsData = new Subject<any>();

  private setIplayget = new Subject<any>();
  private tabsportId = new Subject<any>()
  private gotoMarket = new Subject<any>();
  private balanceExpo = new Subject<any>();
  private LoggedIn = new Subject<any>();
  private hitmatchBets = new Subject<any>();

  constructor(
    private backendService: BackendService,
    private toastr: ToastrService,
    private indexedDBService: IndexDbService,
    private http: HttpClient) {
    // Constructor with dependency injection
  }

  setcompttion(value: any) {
    this.setCompttiondata.next(value);

  }

  getcompttion(): Observable<any> {
    return this.setCompttiondata.asObservable();
  }

  getStreamingStatus(): BehaviorSubject<any | null> {
    return this.showHideStreaming;
  }

  setStreamingStatus(value: any | null): void {
    this.showHideStreaming.next(value);
  }
  // Method to set Marquee value and notify subscribers
  set_Marquee_Value(value: any) {
    this.Marquee_hide.next(value);
  }

  // Method to get Marquee value as an observable
  get_Marquee_Value(): Observable<any> {
    return this.Marquee_hide.asObservable();
  }

  // Method to set sportId and notify subscribers
  setsportId(value: boolean) {
    this.activesportSubject.next(value);
  }

  // Method to get sportId as an observable
  getsportId(): Observable<any> {
    return this.activesportSubject.asObservable();
  }

  // Method to set Ods value and notify subscribers
  setOds(value: any) {
    this.ods.next(value);
  }

  // Method to get Ods value as an observable
  getOds(): Observable<any> {
    return this.ods.asObservable();
  }

  // Method to set IsActiveHome value, notify subscribers, and update CurrentSportObj
  setIsActiveHome(isActiveHome: any) {
    this.isActiveHome.next(isActiveHome);
    this.CurrentSportObj = isActiveHome;
  }

  // Method to get the IsActiveHome value as an observable
  // Observables are used to notify subscribers when the value changes
  getIsActiveHome(): Observable<any> {
    return this.isActiveHome.asObservable();
  }

  // Method to get data from services with caching mechanism
  // Parameters:
  //   - key: A unique identifier for the data (e.g., service endpoint)
  //   - timeLimit: Time limit (in minutes) for considering cached data as valid
  //   - payload: Optional payload to be sent with the request
  getDataFromServices(key: any, timeLimit: any, payload?: any): Observable<any> {
    return new Observable<any>((observer) => {
      // const url = new URL(key);
      if (!payload) {
        payload = {}
      }
      const path = key.split('/').filter(Boolean).pop();
      this.indexedDBService.getRecord(path + 'Time').subscribe(
        (data: any) => {
          if (data) {
            const date1 = new Date(data);
            const date2 = new Date();
            const diffInMilliseconds = date2.getTime() - date1.getTime();
            const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
            if (minutes > timeLimit) {

              this.getRecordsFromNetwork(key, payload).subscribe((data: any) => {

                observer.next(data);
                observer.complete();

              }, (error) => {
                observer.error(error);
              })
            } else {
              this.getRecordsFromDB(key, payload).subscribe((data: any) => {
                observer.next(data);
                observer.complete();
              }, (error) => {
                observer.error(error);
              })
            }
          } else {
            this.getRecordsFromNetwork(key, payload).subscribe((data: any) => {
              observer.next(data);
              observer.complete();

            }, (error) => {
              observer.error(error);
            })
          }
        });
    });
  }
  // method get event id in video player

  setEventId(eventId: any) {
    this.EventId = eventId;
  }
  getEventID() {
    return this.EventId;
  }

  // Method to get the static sports data
  getStaticSports(): any {
    // Return the static sports data
    return this.AllSportsStatic;
  }

  // Method to get all sports data as an observable
  getAllSports(): Observable<any> {
    // Return the AllSports subject as an observable
    return this.AllSports.asObservable();
  }

  // Method to set and notify subscribers about the updated sports data
  setAllSports(sports: any): void {
    // Update the static sports data and notify subscribers with the new data
    this.AllSportsStatic = sports;
    this.AllSports.next(sports);
  }

  // Private method to create a timestamp in IndexedDB
  // Parameters:
  //   - key: A unique identifier for the timestamp
  // Returns an observable indicating the success of the operation
  private createtimestamp(key: any): Observable<Boolean> {
    return this.indexedDBService.createRecord(key, Date());
  }

  // Private method to fetch records from the network
  // Parameters:
  //   - key: A unique identifier for the data (e.g., service endpoint)
  //   - payload: Optional payload to be sent with the request
  // Returns an observable to manage the asynchronous flow

  private getRecordsFromNetwork(key: any, payload?: any): Observable<any> {
    return new Observable<any>((observer) => {
      const path = key.split('/').filter(Boolean).pop();;
      this.backendService.getAllRecordsByPost(key, payload).subscribe((record: any) => {
        this.indexedDBService.createRecord(path, record).subscribe(() => {
          this.createtimestamp(path + 'Time').subscribe(() => {
            observer.next(record);
            observer.complete();
          }, (error) => {
            observer.error(error);
          });
        }, (error) => {
          observer.error(error);
        });
      }, (error) => {
        observer.error(error);
      })
    });
  }
  // Private method to fetch records from IndexedDB
  // Parameters:
  //   - key: A unique identifier for the data (e.g., service endpoint)
  //   - payload: Optional payload to be sent with the request
  // Returns an observable to manage the asynchronous flow
  private getRecordsFromDB(key: any, payload?: any): Observable<any> {
    return new Observable<any>((observer) => {
      const path = key.split('/').filter(Boolean).pop();
      this.indexedDBService.getRecord(path).subscribe(
        (data: any) => {
          if (data) {
            observer.next(data);
            observer.complete();
          }
          else {
            this.getRecordsFromNetwork(key, payload).subscribe((data: any) => {
              observer.next(data);
              observer.complete();
            }, (error) => {
              observer.error(error);
            })
          }
        },
        (error: any) => {
          console.error('Error retrieving record: ', error);
          observer.error(error);
        }
      );
    });
  }
  // Private method to manage tips and preview data
  // Parameters:
  //   - data: Tips and preview data from the network
  // Returns an observable with the combined tips and preview data
  private tipsAndPreviewManager(data: any): Observable<any> {
    // Create an empty object to store tips and preview data
    let obj: any = {};

    // Observable for handling preview data
    const previewObservable = this.casinoImgsManager(data.preview, '', 'preview').pipe(
      map((previewData: any) => {
        obj.preview = previewData;
        return previewData;
      })
    );

    // Observable for handling tips data
    const tipsObservable = this.casinoImgsManager(data.tips, '', 'tips').pipe(
      map((tipsData: any) => {
        obj.tips = tipsData;
        return tipsData;
      })
    );

    // Combine both observables and return the combined data
    return forkJoin([previewObservable, tipsObservable]).pipe(
      map(() => obj)
    );

  }

  // Private method to manage casino images
  // Parameters:
  //   - data: Array of casino image data
  //   - path: Path information (unused in the provided code)
  //   - returnObjName: Name for the returned object containing the processed images
  // Returns an observable with the processed images
  private casinoImgsManager(data: any[], path: string, returnObjName: any): Observable<any> {
    // Create an array of observables for each image
    const observables = data.map(record => {
      return Observable.create((observer: any) => {
        // Convert the image URL to Base64
        this.convertImageUrlToBase64(record.url ? record.url : record)
          .then(base64Data => {
            // Update the image URL or record with the Base64 data
            if (record.url) {
              record.url = base64Data == '' ? record.url : base64Data;
            }
            else {
              record = base64Data == '' ? record.url : base64Data;
            }
            // Notify observers with the processed record
            observer.next(record);
            observer.complete();
          })
          .catch(error => {
            // Notify observers with the error if conversion fails
            observer.error(error);
          });
      });
    });

    // Combine the observables and organize the results into an object
    return forkJoin(observables).pipe(
      map(results => {
        const resultObject = results.reduce((obj, record) => {
          const value = returnObjName;
          if (!obj[value]) {
            obj[value] = [];
          }
          obj[value].push(record);
          return obj;
        }, {});
        return resultObject;
      })
    );
  }

  // Private method to convert an image URL to Base64
  // Parameters:
  //   - url: Image URL to be converted
  // Returns a promise with the Base64 representation of the image
  private convertImageUrlToBase64(url: string): Promise<string> {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching image: ${response.status} ${response.statusText}`);
        }
        return response.blob();
      })
      .then(blob => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = () => resolve(''); // Return empty string in case of CORS error
          reader.readAsDataURL(blob);
        });
      })
      .catch(error => {
        // Handle the error here
        console.error("Error converting image to Base64:", error);
        return ''; // Return empty string to handle the error
      });
  }

  // Private method to manage the conversion of multiple image URLs to Base64
  // Parameters:
  //   - data: Object containing keys and image URLs
  // Returns an observable with the processed images
  private ImageToBase64Manager(data: any): Observable<any> {
    // Create an array of observables for each key-value pair
    const observables = Object.keys(data).map(key => {
      const value = data[key];
      return Observable.create((observer: any) => {
        // Convert the image URL to Base64
        this.convertImageUrlToBase64(value)
          .then(base64Data => {
            // Update the value in the data object with the Base64 data
            data[key] = base64Data;
            // Notify observers with the key and processed value
            observer.next({ key, value: base64Data });
            observer.complete();
          })
          .catch(error => {
            // Notify observers with the error if conversion fails
            observer.error(error);
          });
      });
    });

    // Combine the observables and return the processed data
    return forkJoin(observables).pipe(
      map(results => data)
    );
  }

  // Private method to manage the conversion of image URLs to Base64 for theme configuration
  // Parameters:
  //   - data: Object containing keys and image URLs
  // Returns an observable with the processed images
  private ImageToBase64ThemeConfigManager(data: any): Observable<any> {
    // Create an array of observables for each key-value pair
    const observables = Object.keys(data).map(key => {
      const value = data[key];
      return Observable.create((observer: any) => {
        // Check if the key includes 'exchangeFavicon' or 'exchangeLogo'
        if (key.includes('exchangeFavicon') || key.includes('exchangeLogo')) {
          // Convert the image URL to Base64
          this.convertImageUrlToBase64(value)
            .then(base64Data => {
              // Update the value in the data object with the Base64 data

              data[key] = base64Data;
              // Notify observers with the key and processed value

              observer.next({ key, value: base64Data });
              observer.complete();
            })
            .catch(error => {
              // Notify observers with the error if conversion fails

              observer.error(error);
            });
        }
        else {
          // If the key doesn't match, notify observers with the original key-value pair
          observer.next({ key, value: data[key] });
          observer.complete();
        }
      });
    });

    // Combine the observables and return the processed data
    return forkJoin(observables).pipe(
      map(results => data)
    );
  }

  // Method to get the user's bet list
  getUserBetList(): Observable<any> {
    // Make an HTTP post request to get the user's bet list
    return this.http.post(CONFIG.getUserBetList, {})
  }

  // Method to get the user's account statement
  userAccountStatement(): Observable<any> {
    // Make an HTTP post request to get the user's account statement
    return this.http.post(CONFIG.userAccountStatement, {})
  }

  // Method to add or remove records from the 'favourites' IndexedDB store
  // Parameters:
  //   - record: Record to be added or removed from 'favourites'
  // Returns an observable with the updated 'favourites' data
  AddFavourites(record: any): Observable<any> {
    // Get the current time as the expiration time for the record
    const expireTime = new Date();
    // Get the current 'favourites' data from IndexedDB

    return this.indexedDBService.getRecord('favourites').pipe(
      map((data: any) => {
        if (data) {
          // Check if the record already exists in 'favourites'
          const index = data.findIndex((obj: any) => obj?.exMarketId === record?.exMarketId && obj?.exEventId === record?.exEventId);
          if (index !== -1) {
            // If the record exists, remove it
            data.splice(index, 1);
            this.indexedDBService.updateRecord('favourites', data).subscribe((res: any) => { });
          } else {
            // If the record doesn't exist, add it with the expiration time
            record.expireTime = expireTime;
            data.push(record);
            // Update 'favourites' in IndexedDB
            this.indexedDBService.updateRecord('favourites', data).subscribe((res: any) => { });
          }
        } else {
          // If 'favourites' doesn't exist, create it with the record and expiration time
          record.expireTime = expireTime;
          const arr = [record];
          this.indexedDBService.createRecord('favourites', arr).subscribe((res: any) => { });
        }
        // Return the updated 'favourites' data
        return data;
      })
    );
  }

  // Method to get the 'favourites' data from IndexedDB
  // Returns an observable with the filtered and updated 'favourites' data
  getFavourites(): Observable<any> {
    return this.indexedDBService.getRecord('favourites').pipe(
      map((data: any) => {
        const date2 = new Date();
        // Filter out records with expiration time greater than the configured time
        data = data?.filter((record: any) => {
          let date1 = new Date(record.expireTime)
          let diffInMilliseconds = date2.getTime() - date1.getTime();
          let minutes = Math.floor(diffInMilliseconds / (1000 * 60));
          // if (minutes >= CONFIG.favouritesExpriTime) {
          //   return null
          // }
          // else {
          //   return record
          // }
        });
        // Update 'favourites' in IndexedDB with the filtered data
        this.indexedDBService.updateRecord('favourites', data).subscribe((res: any) => {
        });
        // Return the filtered 'favourites' data
        return data
      })
    )
  }
  seteposureModal(value: any) {
    this.expoModal.next(value);
  }
  geteposureModal(): Observable<any> {
    return this.expoModal.asObservable();
  }
  setbetlist(value: any) {
    this.betlist.next(value);
  }
  getbetlist(): Observable<any> {
    return this.betlist.asObservable();
  }
  getSportsList(): BehaviorSubject<any | null> {
    return this.sportsList;
  }

  setSportsList(value: any | null): void {
    this.sportsList.next(value);
  }



  setIplay(value: any) {
    this.setIplayget.next(value);
  }
  getIplay(): Observable<any> {
    return this.setIplayget.asObservable();
  }

  setgotoMarket(value: any) {
    this.gotoMarket.next(value);
  }
  getgotoMarket(): Observable<any> {
    return this.gotoMarket.asObservable();
  }

  // for tab balanceExpo
  setBalanceExpo(value: any) {
    this.balanceExpo.next(value);
  }
  getBalanceExpo(): Observable<any> {
    return this.balanceExpo.asObservable();
  }
  getLoggedIn(): Observable<any> {
    return this.LoggedIn.asObservable();
  }
  setLoggedIn(loginState:any){
    this.LoggedIn.next(loginState);
  }

  getCalledAfterBetplaceFun(): BehaviorSubject<any | null> {
    return this.isCalledAfterBetplaceFun;
  }

  setCalledAfterBetplaceFun(value: any | null): void {
    this.isCalledAfterBetplaceFun.next(value);
  }
  getSatusCloseBetslip(): BehaviorSubject<any | null> {
    return this.isSatusCloseBetslip;
  }

  setStatusCloseBetslip(value: any | null): void {
    this.isSatusCloseBetslip.next(value);
  }
  getOdds(): Observable<any> {
    return this.odds.asObservable();
  }
  setExposureProfit(value: any) {
    this.exposureDesktopbetSlip.next(value);

  }
  setAfterBetPL(value: any) {
    this.afterBetPL.next(value);
  }
  setForbetPlace(value: any) {
    this.betPlace.next(value);

  }
  setForClass(value: any) {
    this.forClass.next(value);

  }
  getBetsData(): Observable<any> {
    return this.betsData.asObservable();
  }
  setMatchbets(value: any) {
    this.hitmatchBets.next(value);
  }
  getAllRecordsByPost(url: any, params: any) {
    return this.http.post<any>(url, params)
      .pipe(map(data => {
        return data;
      }));
  }
  ErrorNotification_Manager(responseData: any) {
    if (responseData.meta) {
      let errorObject = responseData.meta.message;
      if (typeof errorObject === 'object') {
        for (var key of Object.keys(errorObject)) {
          this.toastr.error(errorObject[key].message, '', {});
          return;
        }
      } else {
        this.toastr.error(errorObject, '', {});
        return;
      }

    } else {
      this.toastr.error('Hey, looks like something went wrong.', '', {});
      return;
    }
  }
  
}
