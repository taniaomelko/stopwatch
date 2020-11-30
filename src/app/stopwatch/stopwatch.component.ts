import { Component, OnInit } from '@angular/core';
import { timer, fromEvent } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})

export class StopwatchComponent implements OnInit {
  time: number = 0;
  isRunning: boolean = false;
  text: string = 'Start';
  hours: any = '00';
  minutes: any = '00';
  seconds: any = '00';

  ngOnInit() {
    timer(0, 1000).subscribe(() => {
      if(this.isRunning) {
        this.time++;
        this.seconds = Math.floor(this.time % 3600 % 60);
        this.minutes = Math.floor(this.time % 3600 / 60);
        this.hours = Math.floor(this.time / 3600);

        if (this.hours < 10) {
          this.hours = '0' + this.hours;
        };

        if (this.minutes < 10) {
          this.minutes = '0' + this.minutes;
        };

        if (this.seconds < 10) {
          this.seconds = '0' + this.seconds;
        };
      }
    });
  }

  toggleStopwatch() {
    this.isRunning = !this.isRunning;
    this.text === 'Start'
      ? this.text = 'Stop'
      : this.text = 'Start';
  }

  wait() {
    const stopwatchButtonWait = document.querySelector('.stopwatch__button--wait');

    fromEvent(stopwatchButtonWait, 'mousedown')
      .pipe(timeInterval())
      .subscribe(iteration => {
        if (iteration.interval < 300) {
          this.isRunning = false;
          this.text = 'Start';
        }
    });
  }

  reset() {
    this.isRunning = false;
    this.text = 'Start';
    this.time = 0;
    this.hours = '00';
    this.minutes = '00';
    this.seconds = '00';
  }
}
