import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

declare const google: any;

import { environment } from 'src/environments/environment';
import { RegisterInterface } from '../interfaces/register.interface';
import { LoginInterface } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  // add new user
  createUser(formData: RegisterInterface) {
    return this.httpClient.post(environment.apiUrl + 'users', formData)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('auth-token', response.token);
        })
      );
  }

  // login users
  login(formData: LoginInterface) {
    return this.httpClient.post(environment.apiUrl + 'auth/login', formData)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('auth-token', response.token);
        })
      );
  }

  loginGoogle(token: string) {
    return this.httpClient.post(environment.apiUrl + 'auth/google', { token })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('auth-token', response.token);
        })
      );
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('auth-token') || '';

    return this.httpClient.get(environment.apiUrl + 'auth/renew', { 
      headers: {
        'auth-token': token,
      }
    }).pipe(
      tap((response: any) => {
        localStorage.setItem('auth-token', response.token);
      }),
      map(response => true),
      catchError(error => of(false))
    );
  }

  logout() {
    localStorage.removeItem('auth-token');
  }
}
