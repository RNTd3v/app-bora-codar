import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { User, IUserService, IConfigService, Filter } from '@cms/core';
import { DialogDeleteComponent } from '@cms/partials';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[];

  filters = [
    { key: 'name', value: 'Nome' },
    { key: 'email', value: 'E-mail' }
  ] as Filter[];

  displayedColumns = ['foto', 'nome', 'email', 'acao'];

  isLoadingResults = true;

  private subscription = new Subscription();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private config: IConfigService,
    public dialog: MatDialog,
    private service: IUserService,
    private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllUsers(): void {

    this.isLoadingResults = true;

    this.subscription.add(
      this.service.getAllUsers()
        .pipe(finalize(() => this.isLoadingResults = false))
        .subscribe(users => this.users = users)
    );

  }

  addUser(): void {
    this.router.navigate(['user-management/users/add']);
  }

  editUser(user: User): void {
    this.router.navigate([`user-management/users/${user.id}`]);
  }

  deleteUser(user: User): void {

    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      data: { name: user.name, title: 'Deletar usuário' }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.subscription.add(
          this.service.deleteUser(user.id)
            .subscribe(response => console.log(response))
        )
      }
    });
  }

}
