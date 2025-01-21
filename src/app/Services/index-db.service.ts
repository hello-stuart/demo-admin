import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { CONFIG } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class IndexDbService {
  private dbName = CONFIG.SiteName;
  private objectStoreName = CONFIG.SiteName+'Store';
  private db: any;
  private databaseReadySubject: ReplaySubject<void> = new ReplaySubject<void>(1);

  constructor() {
    this.openDatabase();
  }

  private openDatabase() {

    

    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event: any) => {
      console.error('Database error: ', event.target.errorCode);
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
      this.databaseReadySubject.next();
    };

    request.onupgradeneeded = (event: any) => {
      this.db = event.target.result;

      if (!this.db.objectStoreNames.contains(this.objectStoreName)) {
        const objectStore = this.db.createObjectStore(this.objectStoreName, {
          autoIncrement: false,
        });

        objectStore.createIndex('Index', 'propertyName', { unique: false });
      }
    };
  }

  // updateDatabaseReady() {
  //   this.databaseReadySubject.next();
  // }

  private databaseReady(): Observable<void> {
    return this.databaseReadySubject.asObservable();
  }

  createRecord(key: any, record: any): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.databaseReady().subscribe(() => {
        const transaction = this.db.transaction([this.objectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);

        const request = objectStore.add(record, key);

        request.onerror = (event: any) => {
          if (event.target.error.code === 0) {
            this.updateRecord(key, record).subscribe(() => {
              observer.next(true);
              observer.complete();
            },
            (error) => {
              observer.error(event.target.error);
            });
          }
        };

        request.onsuccess = (event: any) => {
          observer.next(true);
          observer.complete();
        };
      });
    });
  }

  getRecord(key: any): Observable<any> {
    return new Observable<any>((observer) => {
      this.databaseReady().subscribe(() => {
        const transaction = this.db.transaction([this.objectStoreName], 'readonly');
        const objectStore = transaction.objectStore(this.objectStoreName);

        const request = objectStore.get(key);

        request.onerror = (event: any) => {
          observer.error(event.target.error);
        };

        request.onsuccess = (event: any) => {
          const record = event.target.result;
          observer.next(record);
          observer.complete();
        };
      });
    });
  }

  updateRecord(key: any, record: any): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.databaseReady().subscribe(() => {
        const transaction = this.db.transaction([this.objectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);

        const request = objectStore.put(record, key);

        request.onerror = (event: any) => {
          observer.error(event.target.error);
        };

        request.onsuccess = (event: any) => {
          observer.next(true);
          observer.complete();
        };
      });
    });
  }

  deleteRecord(key: any): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.databaseReady().subscribe(() => {
        const transaction = this.db.transaction([this.objectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);

        const request = objectStore.delete(key);

        request.onerror = (event: any) => {
          observer.error(event.target.error);
        };

        request.onsuccess = (event: any) => {
          observer.next(true);
          observer.complete();
        };
      });
    });
  }


}
