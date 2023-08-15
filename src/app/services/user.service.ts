import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

declare const google: any;

import { environment } from 'src/environments/environment';
import { RegisterInterface } from '../interfaces/register.interface';
import { LoginInterface } from '../interfaces/login.interface';
import { User } from '../models/user.model';
import { UpdateUserInterface } from '../interfaces/update-user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;

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

  updateUser(formData: UpdateUserInterface) {
    formData = {
      ...formData,
      role: this.user.role,
    }

    return this.httpClient.put(environment.apiUrl + 'users/' + this.userId, formData, { 
      headers: {
        'auth-token': this.token,
      }
    }).pipe(
      tap((response: any) => {
        const { name, email } = response.user;
        this.user.name = name;
        this.user.email = email;
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
    return this.httpClient.get(environment.apiUrl + 'auth/renew', { 
      headers: {
        'auth-token': this.token,
      }
    }).pipe(
      map((response: any) => {
        const { name, email, id, role, image = '', googleAuth } = response.user;
        this.user = new User(name, email, id, '', role, image, googleAuth);
        console.log(response);
        localStorage.setItem('auth-token', response.token);

        return true;
      }),
      catchError(error => of(false))
    );
  }

  logout() {
    localStorage.removeItem('auth-token');
  }

  get token() {
    return localStorage.getItem('auth-token') || '';
  }

  get userId() {
    return this.user.id || '';
  }
}
