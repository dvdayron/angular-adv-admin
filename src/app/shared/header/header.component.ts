import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  user!: User;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.user = authService.user;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
