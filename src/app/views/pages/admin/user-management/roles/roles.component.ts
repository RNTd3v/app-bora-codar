import { Component, OnDestroy, OnInit } from '@angular/core';
import { Role, TableAction, Option, DialogData, ButtonId, DialogTarget, RoleDialogData, RoleDialogTarget, TableConfig, ButtonConfig } from '@cms/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { State } from '../state/roles/roles.reducer';
import { CreateRoleComponent } from './create-role/create-role.component';
import { UpdateRoleDataComponent } from './update-role-data/update-role-data.component';
import * as RoleActions from '../state/roles/roles.actions';
import { IDialogService } from '@cms/partials';
import { buttonAddConfig, dialogDataDefaultConfig, filterConfig, tableConfig } from './config/index';
import { paginateRoles } from '../state/roles/roles.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {

  roles$: Observable<Role[]>;

  tableConfig = tableConfig as TableConfig;
  filterConfig = filterConfig as Option[];
  buttonAddConfig = buttonAddConfig as ButtonConfig;

  dialogDataDefault = dialogDataDefaultConfig as DialogData<any>;

  private subscription = new Subscription();

  constructor(
    private dialogService: IDialogService,
    private store: Store<State>,
    private router: Router) {
      this.roles$ = this.store.select(paginateRoles);
    }

  ngOnInit(): void {
    this.paginateRoles();
  }

  ngOnDestroy(): void {
    this.store.dispatch(RoleActions.paginateRolesCleared());
  }

  paginateRoles(): void {
    this.store.dispatch(RoleActions.paginateRolesRequested());
  }

  goToDetail(role: Role): void {
    this.store.dispatch(RoleActions.showRoleRequested({ roleId: role.id }))
  }

  action(tableAction: TableAction): void {

    const { data, buttonId } = tableAction;
    const role = data as Role;

    switch (buttonId) {
      case ButtonId.delete:
        this.openDialogToDeleteRole(role);
        break;
      default:
        this.goToDetail(role);
        break;
    }

  }

  async openDialogToCreateRole(): Promise<void> {
    this.router.navigate(['admin/user-management/roles/create']);
    // this.handleRoleDialogs(new DialogData<null>({
    //   ...this.dialogDataDefault,
    //   title: 'Novo perfil',
    //   component: CreateRoleComponent
    // }))

  }

  private async openDialogToUpdateRole(role: Role): Promise<void> {

    this.handleRoleDialogs(new DialogData<null>({
      ...this.dialogDataDefault,
      title: `Editar ${role.name}`,
      component: UpdateRoleDataComponent,
      componentData: role
    }))

  }

  private async openDialogToDeleteRole(role: Role): Promise<void> {

    this.handleRoleDialogs(new DialogData<null>({
      title: 'Deletar perfil',
      text: `Tem certeza que deseja excluir o perfil ${role.name}`
    }), {
      data: { id: role.id },
      target: RoleDialogTarget.delete
    });

  }

  async handleRoleDialogs(dialogData: DialogData<any>, dialogTarget?: DialogTarget<RoleDialogData, RoleDialogTarget>): Promise<void> {

    const wasItConfirmed = await this.dialogService.openDialog(dialogData);

    if (wasItConfirmed) {

      if (!!dialogTarget) {
        this.handleDialogTarget(dialogTarget);
      }

    }

  }

  private handleDialogTarget(dialogTarget: DialogTarget<RoleDialogData, RoleDialogTarget>): void {

    switch (dialogTarget.target) {

      case RoleDialogTarget.delete:
        this.store.dispatch(RoleActions.deleteRoleRequested({ roleId: dialogTarget.data.id }));
        break;

      default:
        break;
    }
  }


}
