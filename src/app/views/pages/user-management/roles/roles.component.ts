import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IRoleService, Role, TableAction, Option } from '@cms/core';
import { DialogDeleteComponent } from '@cms/partials';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

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

  ngOnInit(): void {
    this.getAllRoles();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllRoles(): void {
    this.subscription.add(
      this.service.getAllRoles()
        .pipe(finalize(() => this.isLoadingResults = false))
        .subscribe({next: roles => this.roles = roles})
    );

  }

  action(tableAction: TableAction): void {

    const { data, type } = tableAction;

    if (type === 'edit') {
      this.editRole(data as Role);
      return;
    }

    this.deleteRole(data as Role);
  }

  addRole(): void {
    this.router.navigate(['user-management/roles/add']);
  }

  private editRole(role: Role): void {
    this.router.navigate([`user-management/roles/${role.id}`]);
  }

  private deleteRole(role: Role): void {

    this.isLoadingAction = true;

    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '300px',
      data: { name: `o perfil ${role.name}`, title: 'Deletar perfil' }
    });

    this.subscription.add(dialogRef.afterClosed()
      .pipe(finalize(() => this.isLoadingAction = false))
      .subscribe({next: confirmed => {
        if (confirmed) {
          this.service.deleteRole(role.id)
            .subscribe({ next: _ => {
              this.handleDeleteResult();
              this.getAllRoles();
            }})
        }
      }}));
  }

  private handleDeleteResult(): void {
    this.snackBar.open('Perfil excluido com sucesso!', null, { duration: 2000});
  }

}
