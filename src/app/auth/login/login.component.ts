import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: [localStorage.getItem('password') || '', [Validators.required, Validators.minLength(8)]],
    remember: [false],
  });

  formSubmitted: boolean = false;
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone,
  ) {

  }
  ngAfterViewInit(): void {
    this.googleAuthInit();
  }

  googleAuthInit() {
    google.accounts.id.initialize({
      client_id: environment.googleId,
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" },
    );
  }

  handleCredentialResponse(response: any) {
    this.userService.loginGoogle(response.credential)
      .subscribe((response: any) => {
        this.ngZone.run(() => {
          this.redirect();
        })
      }, (err) => {
        Swal.fire({
          title: 'Error',
          text: err.error.error,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
  }

  isFieldInvalid(field: string): boolean {
    if (!this.formSubmitted) {
      return false;
    }

    const formField = this.loginForm.get(field);

    return formField ? formField.invalid : true;
  }

  hasSomeInvalidField(): boolean {
    return this.isFieldInvalid('email')
      || this.isFieldInvalid('password');
  }

  login() {
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value)
        .subscribe((response: any) => {
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value)
            localStorage.setItem('password', this.loginForm.get('password')?.value)
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
          }

          this.redirect();
        }, (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error.error,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        });
    }
  }

  redirect() {
    this.router.navigateByUrl('/');
  }
}
