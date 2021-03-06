import { Component, OnDestroy, OnInit } from '@angular/core';
import { User,Option, TableAction, TableStatus, DialogData, DialogTarget, UserDialogData, UserDialogTarget, ButtonConfig, TableConfig, ButtonId, IPaginationService, ButtonToggles, LoaderService } from '@cms/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserPasswordComponent } from './update-user-password/update-user-password.component';
import { State } from '../state/users/users.reducer';
import { paginateUsers } from '../state/users/users.selectors';

import * as UserActions from '../state/users/users.actions';
import { buttonAddConfig, buttonTogglesConfig, dialogDataDefaultConfig, filterConfig, tableConfig } from './config/index';
import { IDialogService } from '@cms/partials';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users$: Observable<User[]>;

  tableConfig = tableConfig as TableConfig;
  filterConfig = filterConfig as Option[];
  buttonAddConfig = buttonAddConfig as ButtonConfig;
  buttonTogglesConfig = buttonTogglesConfig as ButtonToggles[];

  dialogDataDefault = dialogDataDefaultConfig as DialogData<any>;

  private subscription = new Subscription();

  constructor(
    private dialogService: IDialogService,
    private store: Store<State>,
    private config: IPaginationService,
    private router: Router
    ) {
      this.users$ = this.store.select(paginateUsers);
    }

  ngOnInit(): void {
    this.paginateUsers();
  }

  ngOnDestroy(): void {
    this.store.dispatch(UserActions.paginateUsersCleared());
  }

  paginateUsers(): void {
    this.store.dispatch(UserActions.paginateUsersRequested());
  }

  goToDetail(user: User): void {
    this.store.dispatch(UserActions.showUserRequested({ userId: user.id }))
  }

  action(tableAction: TableAction): void {

    const { data, buttonId } = tableAction;
    const user = data as User;

    switch (buttonId) {
        case ButtonId.delete:
          this.openDialogToDeleteUser(user);
          break;
        case ButtonId.changePassword:
          this.openDialogToChangePasswordUser(user);
          break;
        default:
          this.goToDetail(user);
          break;
    }

  }

  handleChangeStatus(event): void {

    this.config.applyDefaultValues();

    const value = event.target.value;

    if (value === 'all') {

      delete this.config.filter.isActive;

    } else {

      this.config.filter = { ...this.config.filter, ['isActive']: value };

    }

    this.paginateUsers();
  }

  goToCreateUser(): void {
    this.router.navigate(['admin/user-management/create-user']);
  }

  openDialogToChangeUserStatus(UserStatus: TableStatus<User>): void {

    const { data, checked } = UserStatus;

    this.handleUserDialogs(new DialogData<null>({
      title: 'Alterar o status do usu??rio',
      text: `Tem certeza que deseja alterar o status do usu??rio ${data.name}`
    }), {
      data: { id: data.id, status: { isActive: checked } },
      target: UserDialogTarget.changeStatus
    });

  }

  private openDialogToChangePasswordUser(user: User): void {

    this.handleUserDialogs(new DialogData<User>({
      title: 'Alterar senha do usu??rio',
      component: UpdateUserPasswordComponent,
      confirmText: 'Alterar',
      componentData: user
    }));
  }

  private openDialogToDeleteUser(user: User): void {

    this.handleUserDialogs(new DialogData<null>({
      title: 'Deletar usu??rio',
      text: `Tem certeza que deseja excluir o usu??rio ${user.name}`
    }), {
      data: { id: user.id },
      target: UserDialogTarget.delete
    });

  }


  async handleUserDialogs(dialogData: DialogData<any>, dialogTarget?: DialogTarget<UserDialogData, UserDialogTarget>): Promise<void> {

    const wasItConfirmed = await this.dialogService.openDialog(dialogData);

    if (wasItConfirmed) {

      if (!!dialogTarget) {
        this.handleDialogTarget(dialogTarget);
      }

    }

  }

  private handleDialogTarget(dialogTarget: DialogTarget<UserDialogData, UserDialogTarget>): void {

    switch (dialogTarget.target) {

      case UserDialogTarget.delete:
        this.store.dispatch(UserActions.deleteUserRequested({ userId: dialogTarget.data.id }));
        break;

      case UserDialogTarget.changeStatus:
        this.store.dispatch(UserActions.updateUserStatusRequested({ data: dialogTarget.data.status , userId: dialogTarget.data.id }));
        break;

      default:
        break;
    }
  }

}
