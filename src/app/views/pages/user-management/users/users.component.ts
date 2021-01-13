import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User, IUserService, Option, TableAction } from '@cms/core';
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

  userOptions = [
    { id: 'name', name: 'Nome' },
    { id: 'email', name: 'E-mail' }
  ] as Option[];

  isLoadingResults = true;

  private subscription = new Subscription();

  constructor(
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
    this.subscription.add(
      this.service.getAllUsers()
        .pipe(finalize(() => this.isLoadingResults = false))
        .subscribe(users => this.users = users)
    );

  }

  action(tableAction: TableAction): void {

    const { data, type } = tableAction;

    if (type === 'edit') {
      this.editUser(data as User);
      return;
    }

    this.deleteUser(data as User);
  }

  addUser(): void {
    this.router.navigate(['user-management/users/add']);
  }

  private editUser(user: User): void {
    this.router.navigate([`user-management/users/${user.id}`]);
  }

  private deleteUser(user: User): void {

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
