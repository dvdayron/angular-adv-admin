import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  loading: boolean = false;
  usersList: any[] = [];
  pagination: any;
  page:number = 0;
  term: string = '';

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getList():void {
    this.loading = true;

    this.sub = this.usersService.getList(this.page, this.term).subscribe((response: any) => {
      this.usersList = response.users;
      this.pagination = response.pagination;
    }, (err) => {
      Swal.fire({
        title: 'Error',
        text: err.error.error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }, () => {
      this.loading = false;
    })
  }

  searchTerm() {
    this.page = 0;
    this.getList();
  }

  changePage(newPage: number) {
    this.page += newPage;
    this.getList();
  }

  resetData(): void {
    this.usersList = [];
    this.page = 0;
    this.pagination = null;
  }

  disablePrevButton(): boolean {
    return this.page === 0;
  }

  disableNextButton(): boolean {
    if (!this.pagination) {
      return false;
    }

    return this.page >= this.pagination.maxPageCount - 1;
  }

  showDeleteAction(user: User) {
    return this.authService.userId !== user.id;
  }

  delete(user: User) {
    if (this.authService.userId === user.id) {
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (user.id) {
          this.usersService.delete(user.id).subscribe((response: any) => {
            console.log(response);
            this.getList();
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
    })
  }
}
