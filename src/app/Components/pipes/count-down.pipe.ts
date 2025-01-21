


import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Pipe({
  name: 'countdown',
  standalone: true,
  pure: false // To allow the pipe to update over time
})
export class CountdownPipe implements PipeTransform, OnDestroy {
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  transform(value: string | Date): string {
    if (!value) return 'Invalid date';

    const futureDate = new Date(value);

    if (isNaN(futureDate.getTime())) {
      return 'Invalid date';
    }

    if (!this.intervalId) {
      this.startCountdown(futureDate);
    }

    const remainingTime = this.getRemainingTime(futureDate);

    // If countdown is zero, return the formatted date and time using DatePipe
    if (remainingTime === '00:00:00') {
      return '0';
    }

    return remainingTime;
  }

  private startCountdown(futureDate: Date): void {
    this.intervalId = setInterval(() => {
      this.cdr.markForCheck(); // Trigger change detection
    }, 1000);
  }

  private getRemainingTime(futureDate: Date): string {
    const currentTime = new Date();
    const remainingTimeMs = futureDate.getTime() - currentTime.getTime();

    // Ensure non-negative time
    const remainingTime = Math.max(remainingTimeMs, 0);

    const totalHours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Format the time as HH:mm:ss
    const formattedTime = `${this.pad(totalHours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    
    return formattedTime;
  }

  private formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = this.pad(date.getMonth() + 1); // Months are zero-indexed
    const day = this.pad(date.getDate());

    let hours = date.getHours();
    const minutes = this.pad(date.getMinutes());
    const seconds = this.pad(date.getSeconds());

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const formattedHours = this.pad(hours);

    // Return date and time in format YYYY-MM-DD hh:mm:ss AM/PM
    return `${year}-${month}-${day} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
  }


  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}