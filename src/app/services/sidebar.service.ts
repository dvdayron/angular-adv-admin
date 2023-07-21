import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private menuItems: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      items: [
        {title: 'Dashboard', url: '/'},
        {title: 'Progress bar', url: '/dashboard/progress'},
        {title: 'Graph', url: '/dashboard/graph1'},
      ]
    }
  ]

  constructor() { }

  getMenuItems(): any[] {
    return this.menuItems;
  }
}
