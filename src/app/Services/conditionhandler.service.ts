import { Injectable } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConditionhandlerService extends NgbDatepickerI18n {
  private isUserLogedIn: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(false);
  private showSportsBar: BehaviorSubject<any | null> = new BehaviorSubject<string | null>('home');
  private isInnerWidth: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private isSearchEventListRender: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(false);
  private isSliderHide: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(true);
  private currentRoute: BehaviorSubject<any | null> = new BehaviorSubject<string | null>('');
  constructor() {
    super()
    this.setDefaultSidebarState();
  }
  // ngbDatePicker localization

  // Override the getWeekdayLabel method to display two-letter labels like Mo, Tu, etc.
  getWeekdayLabel(weekday: number, width?: 'short' | 'long'): string {
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];  // Custom two-letter weekday labels
    return weekdays[weekday - 1];  // -1 because NgbDatepickerI18n's weekday numbering starts from 1 (Monday=1, Sunday=7)
  }
  // Other methods can remain unchanged
  getMonthShortName(month: number): string {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month - 1];
  }

  getMonthFullName(month: number): string {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month - 1];
  }

  getDayAriaLabel(date: any): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

  getSideBarOpenStatus(): BehaviorSubject<any | null> {
    return this.isSliderHide;
  }

  setSideBarOpenStatus(value: any | null): void {
    this.isSliderHide.next(value);
  }

  private setDefaultSidebarState(): void {
    const isDesktopView = this.isDesktop();
    this.isSliderHide.next(isDesktopView);
  }

  isDesktop(): boolean {
    return window.innerWidth >= 768; // Example breakpoint
  }

  getUserLogedIn(): BehaviorSubject<any | null> {
    return this.isUserLogedIn;
  }

  setUserLogedIn(value: any | null): void {

    this.isUserLogedIn.next(value);
  }
  getSportsBarStatus(): BehaviorSubject<string | null> {
    return this.showSportsBar;
  }

  setSportsBarStatus(value: string | null): void {
    this.showSportsBar.next(value);
  }

  getInnerWidth(): BehaviorSubject<any | null> {
    return this.isInnerWidth;
  }

  setInnerWidth(value: any | null): void {
    this.isInnerWidth.next(value);
  }
  getSearchEventListRender(): BehaviorSubject<any | null> {
    return this.isSearchEventListRender;
  }

  setSearchEventListRendert(value: any | null): void {
    this.isSearchEventListRender.next(value);
  }
  getCurrentRoute(): BehaviorSubject<string | null> {
    return this.currentRoute;
  }

  setCurrentRoute(value: String | null): void {
    this.currentRoute.next(value);
  }
}