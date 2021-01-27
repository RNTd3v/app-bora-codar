import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, Option, TableAction } from '@cms/core';
import { DialogDeleteComponent } from '@cms/partials';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IUserService } from '../services';
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

  userOptionsTable = [
    ...this.userOptions,
    { id: 'roles', name: 'Perfis'}
  ]

  isLoadingResults = true;
  isLoadingAction = false;

  private subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private service: IUserService,
    private snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllUsers(): void {
    this.subscription.add(
      this.service.getAllUsers()
        .pipe(finalize(() => this.isLoadingResults = false))
        .subscribe({ next: users => this.users = users })
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

    this.isLoadingAction = true;

    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '300px',
      data: { name: `o usuário ${user.name}`, title: 'Deletar usuário' }
    });

    this.subscription.add(dialogRef.afterClosed()
      .pipe(finalize(() => this.isLoadingAction = false))
      .subscribe({next: confirmed => {
        if (confirmed) {
          this.service.deleteUser(user.id)
              .subscribe({next: _ => {
                this.handleDeleteResult();
                this.getAllUsers();
              }})
        }
    }}));
  }

  private handleDeleteResult(): void {
    this.snackBar.open('Usuário excluido com sucesso!', null, { duration: 2000});
  }

}
