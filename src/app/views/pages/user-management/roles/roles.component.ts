import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Role, TableAction, Option } from '@cms/core';
import { DialogComponent } from '@cms/partials';
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

  isLoadingResults = true;
  isLoadingAction = false;

  private subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private service: IRoleService,
    private snackBar: MatSnackBar,
    private router: Router) {}

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
        this.editRole(data as Role);
        break;
      case 'delete':
        this.deleteRole(data as Role);
        break;
      default:
        break;
    }

  }

  async addRole(): Promise<void> {
    const confirmed = await this.handleDialog(`Novo perfil`, null,  CreateRoleComponent, null, 'Salvar', null, '80vh');
    this.getAllRolesAgain(confirmed);
  }

  private async editRole(role: Role): Promise<void> {
    const confirmed = await this.handleDialog(`Editar ${role.name}`, null,  UpdateRoleDataComponent, null, 'Salvar', role, '80vw');
    this.getAllRolesAgain(confirmed);
  }

  private async deleteRole(role: Role): Promise<void> {

    const confirmed = await this.handleDialog('Deletar perfil', `Tem certeza que deseja excluir o perfil ${role.name}` );

    if (confirmed) {
      this.subscription.add(
        this.service.deleteRole(role.id)
          .subscribe({ next: _ => {
            this.handleDeleteResult();
            this.getAllRolesAgain(true);
          }
        })
      );
    }

    this.isLoadingAction = false;
  }

  private getAllRolesAgain(confirmed: boolean): void {
    if (confirmed) {
      this.getAllRoles();
    }
  }

  private handleDeleteResult(): void {
    this.snackBar.open('Perfil excluido com sucesso!', null, { duration: 2000});
  }

  private handleDialog(title: string, text: string, component = null, cancelText?: string, confirmText?: string, role?: Role, width = '300px'): Promise<boolean> {

    const dialogRef = this.dialog.open(DialogComponent, {
      width,
      maxWidth: '780px',
      data: { text, title, component, cancelText, confirmText, componentData: role }
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

  private stopLoaders(): void {
    this.isLoadingAction = false;
    this.isLoadingResults = false;
  }

}
