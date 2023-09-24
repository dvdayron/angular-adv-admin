import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

import { SidebarService } from 'src/app/services/sidebar.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  menuItems: any[] = [];
  user!: User;

  constructor (
    private sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.menuItems = sidebarService.getMenuItems();
    this.user = authService.user;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
