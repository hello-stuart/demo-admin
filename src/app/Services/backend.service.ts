import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, firstValueFrom, first, of } from 'rxjs';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CONFIG } from '../../../config';
import { IndexDbService } from './index-db.service';

var $: any;

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public loggedUserData: any;
  private betStakes: any;
  private betstakeObs = new Subject<any>();
  private betPlaceObj = new Subject<any>();
  private setGetRules = new Subject<any>();
  private expoModal = new Subject<any>();
  private balanceExpo = new Subject<any>();
  private forClass = new Subject<any>();
  private lastActiveTab = new Subject<any>();
  private lastSportsActiveIdTab = new Subject<any>();
  private exposureDesktopbetSlip = new Subject<any>();
  private betstakeValueObs = new Subject<any>();
  private resultWinningAmount = new Subject<any>();
  private userCount = new Subject<any>();
  private eventData = new Subject<any>();
  private betslipPlaceDataObj = new Subject<any>();
  private resultObj = new Subject<any>();
  private resultSparkObj = new Subject<any>();
  private resultData = new Subject<string>();
  private videoId = new Subject<any>();
  private casinoResults = new Subject<any>();
  private headerNavSett = new Subject<any>();

  private AllEventlist: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private AllRacingEventlist: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  // for agentBalance 
  private AgentBalanceSubj: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  // for new user 
  private newUser = new Subject<any>();
  private ProfilePagesShowInLeftsideBar: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(false);
  private openBetsData: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private selectresultObj = new Subject<any>();







  themeConfig: any;

  constructor(private http: HttpClient, private toaster: ToastrService, private indexdb : IndexDbService, private router: Router,) {
    this.loggedUserData = JSON.parse(localStorage.getItem('userDetail') as string);
    this.themeConfig = JSON.parse(localStorage.getItem('getThemeConfig') as string);
  }
  getAllRecordsByPost(url: any, params: any) {
    return this.http.post<any>(url, params)
      .pipe(map(data => {
        return data;
      }));
  }
  // ----------

  async getAllRecordsByPostAsync(url: string, params: any): Promise<ResponseType | undefined> {
    try {
      const data = await firstValueFrom(this.http.post<ResponseType>(url, params));
      return data;
    } catch (error: any) {
      // Handle error as needed
      this.ErrorNotification_Manager(error?.error)
      // console.error('Error in getAllRecordsByPost:', error);
      // Return undefined or handle the error gracefully
      return undefined;
    }
  }

  ErrorNotification_Manager(responseData: any) {
    if (responseData.meta) {
      let errorObject = responseData.meta.message;
      if (typeof errorObject === 'object') {
        for (var key of Object.keys(errorObject)) {
          this.toaster.error(errorObject[key].message, '', {});
          return;
        }
      } else {
        this.toaster.error(errorObject, '', {});
        return;
      }

    } else {
      this.toaster.error('Hey, looks like something went wrong.', '', {});
      return;
    }
  }
  // ----------------


  dateManager(newValue: any) {
    let today = new Date();
    if (newValue == 'BACKUP') {
      const threeMonthsAgo = moment().subtract(3, 'months');
      return {
        date: {
          year: threeMonthsAgo.year(),
          month: threeMonthsAgo.month() + 1, // Note: Month is 0-indexed in JavaScript, but ng2-datepicker uses 1-indexed months
          day: threeMonthsAgo.date(),
        },
      };
    }
    else if (newValue == 'LIVE') {
      return { date: { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() } };
    }
    else {
      const oneYearAgo = moment().subtract(1, 'year');
      return {
        date: {
          year: oneYearAgo.year(),
          month: oneYearAgo.month() + 1, // Note: Month is 0-indexed in JavaScript, but ng2-datepicker uses 1-indexed months
          day: oneYearAgo.date(),
        },
      };
    }
  }
  getStartDate(date: any) {
    if (!date) {
      date = { year: new Date().getFullYear(), month: 1, day: 1 };
    }
    const year = date?.year || date?.date?.year;
    const month = date?.month || date?.date?.month;
    const day = date?.day || date?.date?.day;

    const startDate = new Date(year, month - 1, day);
    // Use moment to format the date with timezone offset
    const formattedStartDate = moment(startDate).format('YYYY-MM-DDTHH:mm:ssZ');
    // Replace the 'Z' with '+00:00' to match the desired output
    const modifiedStartDate = formattedStartDate.replace('Z', '+00:00');
    return modifiedStartDate;
  }
  getEndDate(date: any) {
    if (!date) {
      date = { year: new Date().getFullYear(), month: 1, day: 1 };
    }

    const year = date?.year || date?.date?.year;
    const month = date?.month || date?.date?.month;
    const day = date?.day || date?.date?.day;

    const endDate = new Date(year, month - 1, day);

    // Set the time to 23:59:00
    endDate.setHours(23, 59, 0, 0);
    const formattedEndDate = moment(endDate).format('YYYY-MM-DDTHH:mm:ssZ');

    return formattedEndDate;
  }
  getAllSports(): Observable<any> {
    return this.http.post(CONFIG.sportsList, { key: CONFIG.siteKey });

  }
  getIpLocation(): Observable<any> {
    return this.http.post(CONFIG.getIpLocation, {})
  }

  setBetStakes(stakes: any) {
    this.betStakes = stakes;
    this.betstakeObs.next(stakes);
  }
  getBetStakes() {
    return this.betStakes
  }
  getCurrentUserName() {
    if (this.loggedUserData) {
      return this.loggedUserData.userName;
    }
    else {
      let userData = JSON.parse(localStorage.getItem('userDetail') as string);
      return userData?.userName ? userData?.userName : '';
    }
  }

  isMultiMarket(eventid: any) {
    const multimarket = localStorage.getItem('multiMarket_' + this.getCurrentUserName());

    if (multimarket) {
      const filterData: any[] = JSON.parse(multimarket);
      if (filterData.some(entry => entry.eventid === eventid)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  addToMultimarket(eventid: any, sportId: any) {
    const selectorClass = '.' + eventid;
    $(selectorClass).toggleClass('pin-on');
    $('.btn-pin.' + eventid).removeClass('pin-on');
    const currentUserName = this.getCurrentUserName();
    const multiMarketKey = 'multiMarket_' + currentUserName;

    let multimarket = localStorage.getItem(multiMarketKey);
    let multiMarketData: any[] = [];

    if (multimarket) {
      multiMarketData = JSON.parse(multimarket);
    }
    const existingEntryIndex = multiMarketData.findIndex(entry => entry.sportId === sportId && entry.eventid === eventid);

    if (existingEntryIndex !== -1) {
      multiMarketData.splice(existingEntryIndex, 1);
      localStorage.setItem(multiMarketKey, JSON.stringify(multiMarketData));
    } else {
      multiMarketData.push({ sportId: sportId, eventid: eventid });
    }
    localStorage.setItem(multiMarketKey, JSON.stringify(multiMarketData));
  }
  setBetPlace(betObj: any) {
    this.betPlaceObj.next(betObj);
  }
  getBetPlace() {
    return this.betPlaceObj
  }

  setRules(value: any) {
    this.setGetRules.next(value);
  }
  getRules(): Observable<any> {
    return this.setGetRules.asObservable();
  }
  getDataFromServices(key: any, timeLimit: any, payload?: any): Observable<any> {
    const resultSubject = new Subject<any>();

    // const url = new URL(key);
    if (!payload) {
      payload = {};
    }

    const path = key.split('/').filter(Boolean).pop();

    this.indexdb?.getRecord(path + 'Time').subscribe(
      (data: any) => {
        if (data) {
          const date1 = new Date(data);
          const date2 = new Date();
          const diffInMilliseconds = date2.getTime() - date1.getTime();
          const minutes = Math.floor(diffInMilliseconds / (1000 * 60));

          if (minutes > timeLimit) {
            this.getRecordsFromDB(key, payload).subscribe(
              (dbData: any) => {
                if (path == 'allEventsList') {
                  this.AllEventlist.next(dbData.data);
                }
                if (path == 'racingEventsList') {
                  this.AllRacingEventlist.next(dbData);
                }
                // dbData.type = 'db';
                console.log('db', dbData);
                resultSubject.next(dbData);
                resultSubject.complete();
                this.getRecordsFromNetwork(key, payload).subscribe(
                  (networkData: any) => {
                    if (path == 'allEventsList') {
                      this.AllEventlist.next(networkData.data);
                    }
                    if (path == 'racingEventsList') {
                      this.AllRacingEventlist.next(networkData);
                    }
                    resultSubject.next(networkData);
                    resultSubject.complete();
                  },
                  (networkError: any) => {
                    resultSubject.error(networkError);
                  }
                );
              },
              (dbError: any) => {
                resultSubject.error(dbError);
              }
            );
          } else {
            this.getRecordsFromDB(key, payload).subscribe(
              (data: any) => {
                resultSubject.next(data);
                resultSubject.complete();
              },
              (error) => {
                resultSubject.error(error);
              }
            );
          }
        } else {
          this.getRecordsFromNetwork(key, payload).subscribe(
            (data: any) => {
              resultSubject.next(data);
              resultSubject.complete();
            },
            (error) => {
              resultSubject.error(error);
            }
          );
        }
      }
    );

    return resultSubject.asObservable();
  }

  // Private method to fetch records from IndexedDB
  // Parameters:
  //   - key: A unique identifier for the data (e.g., service endpoint)
  //   - payload: Optional payload to be sent with the request
  // Returns an observable to manage the asynchronous flow
  private getRecordsFromDB(key: any, payload?: any): Observable<any> {
    return new Observable<any>((observer) => {
      const path = key.split('/').filter(Boolean).pop();
      this.indexdb.getRecord(path).subscribe(
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
  // Returns an observable indicating the success of the operation
  private createtimestamp(key: any): Observable<Boolean> {
    return this.indexdb.createRecord(key, Date());
  }
  // expo modal
  seteposureMdalvalue(value: any) {
    this.expoModal.next(value);
  }
  geteposureMdalvalue(): Observable<any> {
    return this.expoModal.asObservable();
  }

  setBalanceExpo(tab: any) {
    this.balanceExpo.next(tab);
  }

  getBalanceExpo(): Observable<any> {
    return this.balanceExpo.asObservable();;
  }
  getForClass(): Observable<any> {
    return this.forClass.asObservable();
  }
  getExposureProfit(): Observable<any> {
    return this.exposureDesktopbetSlip.asObservable();
  }

  setLastActiveTab(tab: any) {
    this.lastActiveTab.next(tab);
  }

  getLastActiveTab(): Observable<any> {
    return this.lastActiveTab.asObservable();;
  }

  setLastActiveExchangesIdTab(tab: any) {
    this.lastSportsActiveIdTab.next(tab);
  }

  getLastActiveExchangesIdTab(): Observable<any> {
    return this.lastSportsActiveIdTab.asObservable();
  }
  setOnlyExchangeTypeFromHeaderNav(tab: any) {
    this.headerNavSett.next(tab);
  }
  getOnlyExchangeTypeFromHeaderNav(): Observable<any> {
    return this.headerNavSett.asObservable();
  }

  // casino URLs 
  goToMarketCurrent(eventId: any) {
    // Define a mapping object for eventIds and their corresponding routes
    const routeMapping: { [key: string]: string } = {
      '99.0001': '/baccarat/',
      '99.0002': '/baccarat/',
      '99.0004': '/dtlTeenpatti/',
      '99.0005': '/amarAkbarAnthony/',
      '99.0006': '/amarAkbarAnthony/',
      '99.0007': '/pocker2020/',
      '99.0008': '/pocker2020/',
      '99.0009': '/instantWorli/',
      '99.0010': '/2020-teenpatti/',
      '99.0011': '/euTeenpatti/',
      '99.0012': '/euTeenpatti/',
      '99.0013': '/oneday-teenpatti/',
      '99.0014': '/muflisTeenpatti/',
      '99.0015': '/2020-teenpatti/',
      '99.0016': '/2020-teenpatti/',
      '99.0017': '/euTeenpatti/',
      '99.0018': '/dragon-tiger/',
      '99.0019': '/20-20-dragonTiger/',
      '99.0020': '/20-20-dragonTiger/',
      '99.0021': '/1daydragontiger/',
      '99.0022': '/32cards/',
      '99.0023': '/32cards/',
      '99.0025': '/andarBahar/',
      '99.0026': '/andarBahar/',
      '99.0030': '/lucky7a/',
      '99.0031': '/lucky7a/',
      '99.0032': '/fastLucky7/',
      '99.0034': '/andarBahar/',
      '99.0036': '/baccarat/',
      '99.0040': '/3cardJudgment/',
      '99.0041': '/dtl/',
      '99.0042': '/dtl/',
      '99.0044': '/Casino/',
      '99.0045': '/Casino/',
      '99.0046': '/twentyCardRace/',
      '99.0047': '/cardrace/',
      '99.0049': '/3cardsJudgment/',
      '99.0059': '/kbc/',
      '99.0055': '/casinoMetter/',
      '99.0060': '/trio/',
      '99.0056': '/29cards-baccarat/',
      '99.0050': '/bollywood/',
      '99.0057': '/oneCard2020/',
      '99.0058': '/lottery/',
      '99.0051': '/one-card-meter/',
      '99.0052': '/jhandiMunda/',
      '99.0027': '/casinowar/',
      '99.0061': '/sicbo/',
      '99.0079': '/duskadam/',
      '99.0080': '/race2second/',
      '88.0019': '/lucky0To9/',
      '88.0020': '/dream-catcher/',
      '88.0021': '/headNtails/',
      // Add more entries for other eventIds
    };
    const targetRoute = routeMapping[eventId];

    if (targetRoute) {
      this.router.navigate([`${targetRoute}${eventId}`]);
    } else {
      this.router.navigate(['/not-found']);
    }

  }
  logout() {
    let time = localStorage.getItem('getThemeConfigTime') as string
    this.getAllRecordsByPost(CONFIG.logOutAgent, {})
      .pipe(first())
      .subscribe(
        (data: any) => {
          localStorage.clear();
          localStorage.setItem('getThemeConfig', JSON.stringify(this.themeConfig))
          localStorage.setItem('getThemeConfigTime', time)
        },
        (error: any) => {
          localStorage.clear();
          localStorage.setItem('getThemeConfig', JSON.stringify(this.themeConfig))
          localStorage.setItem('getThemeConfigTime', time)
          let responseData = error.error;
          this.ErrorNotification_Manager(responseData);
        });
    this.router.navigateByUrl('/login');
  }

  setStakeValue(stakes: any) {
    this.betstakeValueObs.next(stakes);
  }
  getStakeValue() {
    return this.betstakeValueObs
  } setResultWinningAmount(winAmountObj: any) {
    this.resultWinningAmount.next(winAmountObj);
  }
  setUserCount(count: any) {
    this.userCount.next(count);
  }
  getUserCout() {
    return this.userCount
  }
  public getRoundId(): Observable<any> {
    return this.eventData.asObservable();
  }

  public updateRoundId(message: any): void {
    this.eventData.next(message);
  }
  setBetSlipPlaceData(betObj: any) {
    this.betslipPlaceDataObj.next(betObj);
  }
  getBetSlipPlaceData() {
    return this.betslipPlaceDataObj
  }
  setResultData(betObj: any) {
    this.resultObj.next(betObj);
  }
  getResultData() {
    return this.resultObj
  }
  getCasinoEventOdds(eventId: any): Observable<any> {
    return this.http.post(CONFIG.getCasinoEventOdds, { eventId })
  }
  setResultSparkData(betObj: any) {
    this.resultSparkObj.next(betObj);
  }
  getResultSparkData() {
    return this.resultSparkObj
  }
  getCasinoPLURL(eventId: any): Observable<any> {
    return this.http.post(CONFIG.getAllMarketplURL, { eventId })
  }
  public getResultstream(): Observable<any> {
    return this.resultData.asObservable();
  }

  public updateResultstream(message: any): void {
    this.resultData.next(message);
  }
  // for new user
  setNewUser(value: any) {
    this.newUser.next(value);
  }
  getNewUser(): Observable<any> {
    return this.newUser.asObservable();
  }
  getAgentBalanceRes(): BehaviorSubject<any | null> {
    return this.AgentBalanceSubj;
  }
  setAgentBalance(value: any | null): void {
    this.AgentBalanceSubj.next(value);
  }
  getLocalStorage(key: any): Observable<any> {
    const record = localStorage.getItem(key);

    if (record) {
      if (key.includes('Time')) {
        return of(record);
      }
      else {
        const parsedRecord = JSON.parse(record);
        return of(parsedRecord); // Return parsed record using RxJS's 'of' operator
      }

    } else {
      return of(null); // Return an observable with null if record doesn't exist
    }
  }
  recordsFromLocalStorage(key: string, time: number, payload?: any): Observable<any> {
    return new Observable<any>((observer) => {
      const path = key.split('/').filter(Boolean).pop();

      this.getLocalStorage(path + 'Time').subscribe((res: any) => {
        if (res) {
          const date1 = new Date(res);
          const date2 = new Date();
          const diffInMilliseconds = date2.getTime() - date1.getTime();
          const minutes = Math.floor(diffInMilliseconds / (1000 * 60));

          if (minutes <= time) {
            this.getLocalStorage(path).subscribe((data: any) => {
              observer.next(data); // Emit the stored data if within the specified time
              observer.complete();
            });
          } else {
            this.getRecordsFromNetwork(key, payload).subscribe((res) => {
              observer.next(res);
              observer.complete();
            }, (error) => {
              observer.error(error);
            })
          }
        } else {
          this.getRecordsFromNetwork(key, payload).subscribe((res) => {
            observer.next(res);
            observer.complete();
          }, (error) => {
            observer.error(error);
          })
        }
      });
    });
  }

  private getRecordsFromNetwork(key: any, payload?: any): Observable<any> {
    return new Observable<any>((observer) => {
      const path = key.split('/').filter(Boolean).pop();;
      this.getAllRecordsByPost(key, payload).subscribe((record: any) => {

        this.setLocalStorage(path, record)
        observer.next(record);
        observer.complete();

      }, (error) => {
        observer.error(error);
      })
    });
  }
  getvideoStreamURL(eventId: any): Observable<any> {
    return this.http.post(CONFIG.videoStreamURL, { eventId })
  }
  setProfilePagesStatus(value: boolean | null) {
    this.ProfilePagesShowInLeftsideBar.next(value);
  }

  getProfilePagesStatus(): Observable<boolean | null> {
    return this.ProfilePagesShowInLeftsideBar.asObservable();
  }
  getMatchbetsListData(): BehaviorSubject<any | null> {
    return this.openBetsData;
  }
  setSelectedResult(betObj: any) {
    this.selectresultObj.next(betObj);
  }

  getSelectedResult() {
    return this.selectresultObj
  }
  setvidoeId(value: any) {
    this.videoId.next(value);
  }
  getvidoeId(): Observable<any> {
    return this.videoId.asObservable();
  }
  getCasinoResults() {
    return this.casinoResults;
  }
  getRulesOfMarketURL(eventId: any): Observable<any> {
    return this.http.post(CONFIG.getRulesOfMarketURL, { eventId })
  }
  setCasinoResults(betObj: any) {
    this.casinoResults.next(betObj);
  }
  private userRole = new Subject<any>();
  getRole() {
    return this.userRole.asObservable();
  }
  setUserRole(userRole: any) {
    this.userRole.next(userRole);
  }
  private setLocalStorage(key: any, data: any): void {
    // localStorage.setItem(key, JSON.stringify(data)); // Store data as a JSON string
    let obj = {
      data: data.data
    }
    localStorage.setItem(key, JSON.stringify(obj)); // Store data as a JSON string
    localStorage.setItem(key + 'Time', new Date().toString());
  }
}
