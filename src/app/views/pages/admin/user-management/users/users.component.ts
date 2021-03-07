import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Option, TableAction, TableStatus, TableMoreAction, DialogData, DialogTarget, UserDialogData, UserDialogTarget, ButtonConfig, Role, TableConfig, ButtonId } from '@cms/core';
import { environment } from '@cms/environment';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IUserService } from '../services';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserDataComponent } from './update-user-data/update-user-data.component';
import { UpdateUserPasswordComponent } from './update-user-password/update-user-password.component';
import { getError, getUsers, State } from '../state/users.reducer';
import * as UserActions from '../state/users.actions';
import { tableConfig } from './config/index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users$: Observable<User[]>;
  users: User[];
  errorMessage$: Observable<string>;

  userTableConfig = tableConfig as TableConfig;

  userOptions = [
    { id: 'name', name: 'Nome' },
    { id: 'email', name: 'E-mail' }
  ] as Option[];

  dialogDataDefault = {
    confirmText: 'Salvar',
    width: '80vw'
  } as DialogData<any>;


  buttonAddConfig = {
    type: 'button',
    text: 'Novo usuário',
    iconLeftName: 'user-plus',
    classes: '-add'
  } as ButtonConfig;

  private subscription = new Subscription();

  constructor(private service: IUserService, private store: Store<State>, private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.errorMessage$ = this.store.select(getError);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllUsers(): void {

    this.subscription.add(
      this.store.select(getUsers)
        .subscribe(users => {

          if (!!users && users.length > 0) {
            this.users = users;
            return;
          }

          this.store.dispatch(UserActions.loadUsers());

        })
    );

  }

  getPathImage(image: string): string {
    return !!image ? `${environment.IMAGE_URL}${image}` : '/assets/icons/user.svg';
  }

  goToDetail(user: User): void {
    this.store.dispatch(UserActions.setCurrentUser({ currentUserId: user.id }))
  }

  action(tableAction: TableAction): void {

    const { data, buttonId } = tableAction;

    switch (buttonId) {
      case ButtonId.update:
        // this.store.dispatch(UserActions.setCurrentUser({ user }))
        this.openDialogToUpdateUser(data as User);
        break;
      case ButtonId.delete:
        this.openDialogToDeleteUser(data as User);
        break;
      case ButtonId.changePassword:
        this.openDialogToChangePasswordUser(data as User);
        break;
      default:
        this.router.navigate([`admin/user-management/user-detail/${data.id}`]);
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

  openDialogToChangeStatusUser(statusUser: TableStatus<User>): void {

    const { data, checked } = statusUser;

    this.handleUserDialogs(new DialogData<null>({
      title: 'Alterar o status do usuário',
      text: `Tem certeza que deseja alterar o status do usuário ${data.name}`
    }), {
      data: { id: data.id, status: { isActive: checked } },
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

    if (!!users) {
      this.users = users;
    }

  }

}
