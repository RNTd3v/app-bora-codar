import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, Option, TableAction, TableStatus, TableMoreAction } from '@cms/core';
import { DialogComponent } from '@cms/partials';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { IUserService } from '../services';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserDataComponent } from './update-user-data/update-user-data.component';
import { UpdateUserPasswordComponent } from './update-user-password/update-user-password.component';

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

  changePassword = {
    icon: 'lock',
    text: 'Alterar a senha'
  } as TableMoreAction;

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

    switch (type) {
      case 'edit':
        this.editUser(data as User);
        break;
      case 'delete':
        this.deleteUser(data as User);
        break;
      case 'more':
        this.changeUserPassword(data as User);
        break;
      default:
        break;
    }

  }

  async addUser(): Promise<void> {
    const confirmed = await this.handleDialog(`Novo usuário`, null,  CreateUserComponent, null, 'Salvar', null, '80vh');

    if (confirmed) {
      this.getAllUsers();
    }
  }

  async changeUserStatus(statusUser: TableStatus<User>): Promise<void> {

    const { data, checked } = statusUser;

    const confirmed = await this.handleDialog('Alterar o status do usuário', `Tem certeza que deseja alterar o status do usuário ${data.name}` );

    if (confirmed) {
      this.subscription.add(
        this.service.updateStatusUser({ isActive: checked }, data.id)
          .subscribe({ next: _ => this.getAllUsers() })
      );
    }

    this.isLoadingAction = false;

  }

  async changeUserPassword(user: User): Promise<void> {
    await this.handleDialog(`Alterar senha do usuário`, null,  UpdateUserPasswordComponent, null, 'Alterar', user);
    this.isLoadingAction = false;
  }

  private async editUser(user: User): Promise<void> {

    const confirmed = await this.handleDialog(`Editar ${user.name}`, null,  UpdateUserDataComponent, null, 'Salvar', user, '80vh');

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
      );
    }

    this.isLoadingAction = false;
  }

  private handleDeleteResult(): void {
    this.snackBar.open('Usuário excluido com sucesso!', null, { duration: 2000});
  }

  private handleDialog(title: string, text: string, component = null, cancelText?: string, confirmText?: string, user?: User, width = '300px'): Promise<boolean> {

    const dialogRef = this.dialog.open(DialogComponent, {
      width,
      maxWidth: '780px',
      data: { text, title, component, cancelText, confirmText, componentData: user }
    });

    this.subscription.add(
      dialogRef.afterOpened()
        .pipe(finalize(() => this.isLoadingAction = true))
        .subscribe());

    return new Promise<boolean>((resolve) => {
      this.subscription.add(
        dialogRef.afterClosed()
          .subscribe({ next: confirmed => resolve(confirmed)}));
    });

  }

}
