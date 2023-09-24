import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
})
export class SingupComponent {
  public signUpForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password1: ['', [Validators.required, Validators.minLength(8)]],
    terms: [false, [Validators.required]],
  }, {
    validators: [
      this.equalsPasswordsValidator('password', 'password1'),
      this.termsValidator(),
    ],
  });

  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

  }

  createUser() {
    this.formSubmitted = true;

    if (this.signUpForm.valid) {
      this.authService.createUser(this.signUpForm.value)
        .subscribe((response: any) => {
          this.redirect()
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

  isFieldInvalid(field: string): boolean {
    if (!this.formSubmitted) {
      return false;
    }

    const formField = this.signUpForm.get(field);

    return formField ? formField.invalid : true;
  }

  isTermsInvalid(): boolean {
    if (!this.formSubmitted) {
      return false;
    }

    const formField = this.signUpForm.get('terms');

    return formField ? !formField.value || formField.invalid : true; 
  }

  notEqualsPasswords(): boolean {
    if (!this.formSubmitted) {
      return false;
    }

    const password = this.signUpForm.get('password')?.value;
    const password1 = this.signUpForm.get('password1')?.value;

    return password !== password1;
  }

  equalsPasswordsValidator(password: string, password1: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(password);
      const password1Control = formGroup.get(password1);

      if (passwordControl?.value === password1Control?.value) {
        password1Control?.setErrors(null);
      } else {
        password1Control?.setErrors({ notEqualsPasswords: true });
      }
    }
  }

  termsValidator() {
    return (formGroup: FormGroup) => {
      const termsControl = formGroup.get('terms');
      termsControl?.setErrors(termsControl?.value === true ? null : { terms: 'You must accept the terms' });
    }
  }

  hasSomeInvalidField(): boolean {
    return this.isFieldInvalid('name')
      || this.isFieldInvalid('email')
      || this.isFieldInvalid('password')
      || this.isFieldInvalid('password1')
      || this.isTermsInvalid()
      || this.notEqualsPasswords();
  }

  redirect() {
    this.router.navigateByUrl('/');
  }
}
