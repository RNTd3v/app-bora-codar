import { Component, OnDestroy, OnInit } from '@angular/core';
import { Role, TableAction, Option, DialogData } from '@cms/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IRoleService } from '../services';
import { CreateRoleComponent } from './create-role/create-role.component';
import { UpdateRoleDataComponent } from './update-role-data/update-role-data.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {

  roles: Role[];

  roleOptions = [
    { id: 'name', name: 'Nome' }
  ] as Option[];

  dialogDataDefault = {
    confirmText: 'Salvar',
    width: '80vw'
  } as DialogData<any>;

  isLoadingResults = true;
  isLoadingAction = false;

  private subscription = new Subscription();

  constructor(private service: IRoleService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllRoles(): void {
    this.subscription.add(
      this.service.getAllRoles()
        .pipe(finalize(() => this.stopLoaders()))
        .subscribe({next: roles => this.roles = roles})
    );

  }

  action(tableAction: TableAction): void {

    const { data, type } = tableAction;

    switch (type) {
      case 'edit':
        this.openDialogToUpdateRole(data as Role);
        break;
      case 'delete':
        this.openDialogToDeleteRole(data as Role);
        break;
      default:
        break;
    }

  }

  async openDialogToCreateRole(): Promise<void> {

    this.handleRoleDialogs(new DialogData<null>({
      ...this.dialogDataDefault,
      title: 'Novo perfil',
      component: CreateRoleComponent
    }))

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
    }), role.id);

  }

  private async handleRoleDialogs(dialogData: DialogData<any>, roleId: string = null): Promise<void> {

    const roles = await this.service.handleRoleDialogs(dialogData, roleId);

    if (!!roles) {
      this.roles = roles;
    }

  }

  private stopLoaders(): void {
    this.isLoadingAction = false;
    this.isLoadingResults = false;
  }

}
