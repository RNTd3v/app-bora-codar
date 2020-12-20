
import {Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { NavigationExtras, Router } from '@angular/router';
import { IUserService, User } from '@cms/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>

  displayedColumns: string[] = ['foto', 'nome', 'email', 'acao'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: IUserService,
    private router: Router) {}

  ngOnInit(): void {
    this.users$ = this.service.getAllUsers();
  }

  addUser(): void {
    this.router.navigate(['users/add'])
  }

  editUser(user: User): void {

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "user": JSON.stringify(user)
      }
    };

    this.router.navigate([`users/${user.id}`], navigationExtras)
  }

  deleteUser(user: User): void {
    console.log(user);
  }

}

export interface Users {
  items: User[];
  total_count: number;
}


