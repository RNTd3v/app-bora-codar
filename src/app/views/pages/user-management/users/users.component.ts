import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, Option, TableAction, TableStatus } from '@cms/core';
import { DialogConfirmComponent } from '@cms/partials';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { IUserService } from '../services';

enum DialogType {
  DELETE = 'DELETE',
  CHANGE_STATUS = 'CHANGE_STATUS'
}
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
    { id: 'roles', name: 'Perfis'},
    { id: 'isActive', name: 'Ativo'}
  ] as Option[];

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

  async changeUserStatus(statusUser: TableStatus<User>): Promise<void> {

    const { data, checked } = statusUser;

    const confirmed = await this.handleDialog('Alterar o status do usuário', `Tem certeza que deseja alterar o status do usuário ${data.name}` );

    const userData = {
      ...data,
      isActive: checked
    } as User;

    if (confirmed) {
      this.subscription.add(
        this.service.updateUser(userData, data.id)
          .subscribe({ next: _ => this.getAllUsers() })
      )
    }

  }

  private editUser(user: User): void {
    this.router.navigate([`user-management/users/${user.id}`]);
  }

  private async deleteUser(user: User): Promise<void> {

    const confirmed = await this.handleDialog('Deletar usuário', `Tem certeza que deseja excluir o usuário ${user.name}` );

    if (confirmed) {
      this.subscription.add(
        this.service.deleteUser(user.id)
          .subscribe({ next: _ => {
            this.handleDeleteResult();
            this.getAllUsers();
          }
        })
      )
    }
  }

  private handleDeleteResult(): void {
    this.snackBar.open('Usuário excluido com sucesso!', null, { duration: 2000});
  }

  private handleDialog(title: string, text: string): Promise<boolean> {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: { text, title }
    });

    this.subscription.add(
      dialogRef.afterOpened()
        .pipe(finalize(() => this.isLoadingAction = true))
        .subscribe())

    return new Promise<boolean>((resolve) => {
      this.subscription.add(
        dialogRef.afterClosed()
          .pipe(finalize(() => this.isLoadingAction = false))
          .subscribe({ next: confirmed => resolve(confirmed)}));
    })

  }

}
