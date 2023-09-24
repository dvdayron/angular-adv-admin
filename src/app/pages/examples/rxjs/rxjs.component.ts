import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, filter, interval, map, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  interval: Subscription;

  constructor() {
    /*this.initObserver().subscribe((value) => {
      console.log('value', value);
    });*/

    this.interval = this.initIntervalObserver().subscribe((value) => {
      console.log('initIntervalObserver', value);
    });
  }

  ngOnDestroy(): void {
    this.interval.unsubscribe();
  }

  initIntervalObserver(): Observable<number> {
    return interval(500).pipe(
      map((value) => {
        return value + 1;
      }),
      filter((value) => {
        return value % 2 === 0;
      }),
      take(5) 
    );
  }

  initObserver(): Observable<number> {
    let i = 0;

    return new Observable((observer) => {
      const interval = setInterval(() => {
        observer.next(++i);

        if (i >= 5) {
          clearInterval(interval);
          observer.complete();
          console.log('complete!!');
        }
      }, 1000);
    });
  }
}
