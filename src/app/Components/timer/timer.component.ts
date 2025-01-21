import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',

})
export class TimerComponent implements OnInit {
  initialMinutes$ = new BehaviorSubject(45);
  countdown: any;
  interval: any;
  resultDeclared: any;
  timer: any;
  strokeDasharray = '283';
  strokeDashoffset: string = '0';
  circleColor: string = 'green';

  animateFirstDigit = false;
  animateSecondDigit = false;

  @Input()
  set minutes(val: any) {
    setTimeout(() => {
      this.initialMinutes$.next(val);
      this.initialMinutes$.subscribe(
        async (val: any) => {
          this.timer = await val;
          this.countdown = this.timer;
          this.startCountdown();
        });
    }, 0);
  }

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getResultData().subscribe(data => {
      this.resultDeclared = data;
    });

    if (this.timer) {
      this.timer = this.initialMinutes$;
      this.countdown = this.timer;
    } else {
      this.timer = 0;
      this.countdown = this.timer;
      this.startCountdown();
    }
  }

  startCountdown() {
    this.circleColor = 'green';
    this.strokeDashoffset = this.strokeDasharray;

    clearInterval(this.interval);
    const totalTime = this.countdown;

    this.updateCircle(totalTime);

    let previousFirstDigit = this.firstDigit;
    let previousSecondDigit = this.secondDigit;

    this.interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;

        if (previousFirstDigit !== this.firstDigit) {
          this.animateFirstDigit = true;
          setTimeout(() => (this.animateFirstDigit = false), 200);
          previousFirstDigit = this.firstDigit;
        }

        if (previousSecondDigit !== this.secondDigit) {
          this.animateSecondDigit = true;
          setTimeout(() => (this.animateSecondDigit = false), 200);
          previousSecondDigit = this.secondDigit;
        }

        this.updateCircle(totalTime);
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  get firstDigit(): string {
    return this.countdown >= 10 ? this.countdown.toString().charAt(0) : '';
  }

  get secondDigit(): string {
    return this.countdown != null
      ? this.countdown.toString().padStart(2, '0').charAt(1)
      : '0'; //  
  }


  updateCircle(totalTime: number) {
    const timeFraction = this.countdown / totalTime;
    const circleLength = 283;
    this.strokeDashoffset = `${circleLength - (circleLength * timeFraction)}`;

    this.circleColor = this.countdown <= 3 ? 'red' :
      this.countdown <= 6 ? 'orange' : 'green';
  }

}
