import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get token() {
    return localStorage.getItem('auth-token') || '';
  }

  get headers() {
    return { 
      headers: {
        'auth-token': this.token,
      }
    };
  }

  getList(page: number = 0, term: string = '') {
    return this.httpClient.get(
      environment.apiUrl + 'users?page=' + page + (term ? '&term=' + term : ''), 
      this.headers
    ).pipe(
      map((response: any) => {
        return {
          ...response,
          users: this.convertToUsers(response.users),
        };
      })
    );
  }

  private convertToUsers(users: any): any[] {
    let models: any[] = [];

    users.forEach((user: any) => {
      models.push(new User(
        user.name, 
        user.email, 
        user.id, 
        user.password, 
        user.role, 
        user.image, 
        user.googleAuth
      ));
    });

    return models;
  }

  delete(id: string) {
    return this.httpClient.delete(
      environment.apiUrl + 'users/' + id, 
      this.headers
    );
  }

  update(user: User) {
    return this.httpClient.put(
      environment.apiUrl + 'users/' + user.id, 
      user, 
      this.headers
    );
  }
}
