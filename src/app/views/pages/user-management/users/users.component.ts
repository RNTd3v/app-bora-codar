import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, NavigationExtras } from '@angular/router';
import { User, IUserService, IConfigService } from '@cms/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[]

  displayedColumns: string[] = ['foto', 'nome', 'email', 'acao'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  time = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private config: IConfigService,
    private service: IUserService,
    private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers(): void {

    this.isLoadingResults = true;

    this.service.getAllUsers()
      .pipe(finalize(() => this.isLoadingResults = false))
      .subscribe(users => this.users = users);

  }

  addUser(): void {
    this.router.navigate(['user-management/users/add'])
  }

  editUser(user: User): void {

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "user": JSON.stringify(user)
      }
    };

    this.router.navigate([`user-management/users/${user.id}`], navigationExtras)
  }

  deleteUser(user: User): void {
    console.log(user);
  }

  handleKeyUp(event): void {
    this.debounceEvent(event.target.value);
  }

  private debounceEvent(value: string): void {

    clearTimeout(this.time);

    this.time = setTimeout(() => {
      this.config.pagination = {
        ...this.config.pagination,
        filter: value
      }
      this.getAllUsers();
    }, 1000);
  }


}
