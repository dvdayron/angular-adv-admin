import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {
  users: any[] = [];

  ngOnInit(): void {
    this.getUsers().then((users) => this.users = users);
  }
    
  basicPromise(): void {
    const promise = new Promise((resolve, reject) => {
      if (false) {
        resolve('All is ok!');
      } else {
        reject('Han error occurred!');
      }
    });

    promise
      .then((message) => console.log(message))
      .catch((error) => console.log(error));

    console.log('PromisesComponent init');
  }

  getUsers() {
    return new Promise<any[]>((resolve, reject) => {
      fetch('https://reqres.in/api/users?page=2').then((res) => {
        res.json().then((data) => resolve(data.data));
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
