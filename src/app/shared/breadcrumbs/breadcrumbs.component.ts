import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  title: string = '';
  argumentsSubscription$: Subscription;

  constructor(
    private router: Router
  ) {
    this.argumentsSubscription$ = this.setPageData().subscribe((data: any) => {
      this.title = data.title;
      document.title = `Admin - ${this.title}`;
    });
  }

  ngOnDestroy(): void {
    this.argumentsSubscription$.unsubscribe();
  }

  setPageData() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd && event.snapshot.firstChild === null),
      map((event) => (event as ActivationEnd).snapshot.data)
    );
  }
}
