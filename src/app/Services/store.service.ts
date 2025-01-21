import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private casinoEvents: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private sportsRulesList: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  constructor( ) { }

  getSportsRulesList(): BehaviorSubject<any | null> {
    return this.sportsRulesList;
  }

  setSportsRulesList(value: any | null): void {
    this.sportsRulesList.next(value);
  }

  getCasinoEvents(): BehaviorSubject<any | null> {
    return this.casinoEvents;
  }

  setCasinoEvents(value: any | null): void {
    this.casinoEvents.next(value);
  }

 
  
}
