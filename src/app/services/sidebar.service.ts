import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private menuItems: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-folder-lock-open',
      items: [
        {title: 'Users', url: '/dashboard/users'},
        {title: 'Doctors', url: '/dashboard/doctors'},
        {title: 'Hospitals', url: '/dashboard/hospitals'},
      ]
    },
    {
      title: 'Examples',
      icon: 'mdi mdi-gauge',
      items: [
        {title: 'Dashboard', url: '/dashboard'},
        {title: 'Progress bar', url: '/dashboard/progress'},
        {title: 'Graph', url: '/dashboard/graph1'},
        {title: 'Promises', url: '/dashboard/promises'},
        {title: 'Rxjs', url: '/dashboard/rxjs'},
      ]
    }
  ]

  constructor() { }

  getMenuItems(): any[] {
    return this.menuItems;
  }
}
