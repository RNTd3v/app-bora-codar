import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, Option, TableAction, TableStatus } from '@cms/core';
import { DialogComponent } from '@cms/partials';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { IUserService } from '../services';
import { UpdateUserDataComponent } from './update-user-data/update-user-data.component';

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
        .pipe(finalize(() => {
          this.isLoadingResults = false;
          this.isLoadingAction = false;
        }))
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

    if (confirmed) {
      this.subscription.add(
        this.service.updateStatusUser({ isActive: checked }, data.id)
          .subscribe({ next: _ => this.getAllUsers() })
      )
    }

    this.isLoadingAction = false;

  }

  private async editUser(user: User): Promise<void> {

    const confirmed = await this.handleDialog(`Editar ${user.name}`, null,  UpdateUserDataComponent, null, 'Salvar', user);

    if (confirmed) {
      this.getAllUsers();
    }

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

    this.isLoadingAction = false;
  }

  private handleDeleteResult(): void {
    this.snackBar.open('Usuário excluido com sucesso!', null, { duration: 2000});
  }

  private handleDialog(title: string, text: string, component = null, cancelText?: string, confirmText?: string, user?: User): Promise<boolean> {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: component ? '80vw' : '300px',
      maxWidth: '780px',
      data: { text, title, component, cancelText, confirmText, componentData: user }
    });

    this.subscription.add(
      dialogRef.afterOpened()
        .pipe(finalize(() => this.isLoadingAction = true))
        .subscribe())

    return new Promise<boolean>((resolve) => {
      this.subscription.add(
        dialogRef.afterClosed()
          .subscribe({ next: confirmed => resolve(confirmed)}));
    })

  }

}
