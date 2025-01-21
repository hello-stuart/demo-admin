


import { Pipe, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Pipe({
  name: 'countdownBetStart',
  standalone: true,
  pure: false // To allow the pipe to update over time
})
export class CountdownBetStartPipe implements PipeTransform, OnDestroy {
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  transform(value: string | Date): string {
    if (!value) return 'Invalid date';

    const futureDate = new Date(value);

    if (isNaN(futureDate.getTime())) {
      return 'Invalid date';
    }

    // Subtract 5 minutes from the future date
    futureDate.setMinutes(futureDate.getMinutes() - 5);

    if (!this.intervalId) {
      this.startCountdown(futureDate);
    }

    const remainingTime = this.getRemainingTime(futureDate);

    // If countdown reaches 0, return '0'
    if (remainingTime === '00:00:00') {
      clearInterval(this.intervalId);
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

    // If the remaining time is zero, return '0'
    if (totalHours === 0 && minutes === 0 && seconds === 0) {
      return '0';
    }

    // Format the time as HH:mm:ss
    const formattedTime = `${this.pad(totalHours)}:${this.pad(minutes)}:${this.pad(seconds)}`;

    return formattedTime;
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