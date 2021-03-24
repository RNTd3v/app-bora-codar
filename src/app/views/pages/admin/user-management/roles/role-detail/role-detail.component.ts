import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkMenus, Menu, Role, RoleMenusPermissions } from '@cms/core';
import { IDialogService } from '@cms/partials';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { State } from '../../state/roles/roles.reducer';
import { showRole, showRoleMenus } from '../../state/roles/roles.selectors';
import * as RoleActions from '../../state/roles/roles.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cms-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {

  role: Observable<Role | Partial<Role>>;
  roleMenus: Observable<Menu[] | null> = of(null);
  roleId: string | undefined;

  constructor(
    private dialogService: IDialogService,
    private store: Store<State>,
    private route: ActivatedRoute) {
      this.roleId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.setRole();
  }

  changeRoleMenus(roleMenusPermissions: RoleMenusPermissions) {
    this.store.dispatch(RoleActions.updateRoleMenus({ roleMenusPermissions }));
  }

  submitRole(event: { role: Role, roleMenus: Menu[] }): void {

    if (!!this.roleId) {

      const linkMenus = {
        menus: event.roleMenus
      } as LinkMenus;

      this.store.dispatch(RoleActions.updateRoleRequested({ role: event.role, roleId: this.roleId, linkMenus }));

      return

    }

    this.store.dispatch(RoleActions.createRoleRequested({ role: event.role }))
  }

  private setRole(): void {

    if (this.roleId) {
      this.getRole();
      this.getPermissions();
      return
    }

    this.newRole();

  }

  private getRole(): void {
    this.role = this.store.select(showRole);
    this.store.dispatch(RoleActions.showRoleRequested({ roleId: this.roleId }));
  }

  private getPermissions(): void {
    this.roleMenus = this.store.select(showRoleMenus);
    this.store.dispatch(RoleActions.menuShowByRoleRequested({ roleId: this.roleId }));
  }

  private newRole(): void {
    this.role = of({
      name: '',
      admin: false
    } as Partial<Role>)
  }

}
