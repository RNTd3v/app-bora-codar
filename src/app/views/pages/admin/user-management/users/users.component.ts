import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, Option, TableAction, TableStatus, TableMoreAction, DialogData, DialogTarget, UserDialogData, UserDialogTarget, ButtonConfig, Role } from '@cms/core';
import { environment } from '@cms/environment';
import { DialogComponent } from '@cms/partials';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { IUserService } from '../services';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserDataComponent } from './update-user-data/update-user-data.component';
import { UpdateUserPasswordComponent } from './update-user-password/update-user-password.component';

import { getError, getUsers, State } from '../state/users.reducer';
import * as UserActions from '../state/users.actions';

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

  users$: Observable<User[]>;
  errorMessage$: Observable<string>;

  userOptions = [
    { id: 'name', name: 'Nome' },
    { id: 'email', name: 'E-mail' }
  ] as Option[];

  userOptionsTable = [
    { id: 'avatar', name: 'Avatar'},
    ...this.userOptions,
    { id: 'roles', name: 'Perfis'},
    { id: 'isActive', name: 'Ativo'}
  ] as Option[];

  dialogDataDefault = {
    confirmText: 'Salvar',
    width: '80vw'
  } as DialogData<any>;

  changePassword = {
    icon: 'lock',
    text: 'Alterar a senha'
  } as TableMoreAction;

  buttonAddConfig = {
    type: 'button',
    text: 'Novo usuário',
    iconLeftName: 'user-plus',
    classes: '-add'
  } as ButtonConfig;

  buttonViewConfig = {
    type: 'button',
    iconLeftName: 'eye',
    classes: '-add'
  } as ButtonConfig;

  buttonEditConfig = {
    type: 'button',
    iconLeftName: 'pen',
    classes: '-icon -edit -border',
    matTooltip: 'Editar'
  } as ButtonConfig;

  buttonDeleteConfig = {
    type: 'button',
    iconLeftName: 'trash',
    classes: '-icon -delete -border',
    matTooltip: 'Deletar'
  } as ButtonConfig;

  buttonForgotPassConfig = {
    type: 'button',
    iconLeftName: 'lock',
    classes: '-icon -border -dark',
    matTooltip: 'Alterar Senha'
  } as ButtonConfig;

  isLoadingResults = true;
  isLoadingAction = false;

  private subscription = new Subscription();

  constructor(private service: IUserService, private store: Store<State>, private router: Router) {}

  ngOnInit(): void {
    this.users$ = this.store.select(getUsers);
    this.errorMessage$ = this.store.select(getError);
    this.store.dispatch(UserActions.loadUsers());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // getAllUsers(): void {
  //   this.subscription.add(
  //     this.service.getAllUsers()
  //       .pipe(finalize(() => this.stopLoaders()))
  //       .subscribe({ next: users => this.users = users })
  //   );

  // }

  getPathImage(image: string): string {
    return !!image ? `${environment.IMAGE_URL}${image}` : '/assets/icons/user.svg';
  }

  goToDetail(user: User): void {
    this.store.dispatch(UserActions.setCurrentUser({ currentUserId: user.id }))
  }

  action(user: User, type: string): void {

    switch (type) {
      case 'edit':
        // this.store.dispatch(UserActions.setCurrentUser({ user }))
        this.openDialogToUpdateUser(user);
        break;
      case 'delete':
        this.openDialogToDeleteUser(user);
        break;
      case 'more':
        this.openDialogToChangePasswordUser(user);
        break;
      default:
        break;
    }

  }

  openDialogToCreateUser(): void {

    this.handleUserDialogs(new DialogData<null>({
      ...this.dialogDataDefault,
      title: 'Novo usuário',
      component: CreateUserComponent
    }))
  }

  openDialogToChangeStatusUser(checked: boolean, user: User): void {

    this.handleUserDialogs(new DialogData<null>({
      title: 'Alterar o status do usuário',
      text: `Tem certeza que deseja alterar o status do usuário ${user.name}`
    }), {
      data: { id: user.id, status: { isActive: checked } },
      target: UserDialogTarget.changeStatus
    });

  }

  getRolesName(roles: Role[]): string[] {
    return roles.map(role => role.name);
  }

  private openDialogToChangePasswordUser(user: User): void {

    this.handleUserDialogs(new DialogData<User>({
      title: 'Alterar senha do usuário',
      component: UpdateUserPasswordComponent,
      confirmText: 'Alterar',
      componentData: user
    }));
  }

  private openDialogToUpdateUser(user: User): void {

    this.handleUserDialogs(new DialogData<User>({
      ...this.dialogDataDefault,
      title: `Editar ${user.name}`,
      component: UpdateUserDataComponent,
      componentData: user
    }))

  }

  private openDialogToDeleteUser(user: User): void {

    this.handleUserDialogs(new DialogData<null>({
      title: 'Deletar usuário',
      text: `Tem certeza que deseja excluir o usuário ${user.name}`
    }), {
      data: { id: user.id },
      target: UserDialogTarget.delete
    });

  }

  private async handleUserDialogs(dialogData: DialogData<any>, dialogTarget: DialogTarget<UserDialogData, UserDialogTarget> = null): Promise<void> {

    const users = await this.service.handleUserDialogs(dialogData, dialogTarget);

    // if (!!users) {
    //   this.users = users;
    // }

  }

  private stopLoaders(): void {
    this.isLoadingAction = false;
    this.isLoadingResults = false;
  }

}
