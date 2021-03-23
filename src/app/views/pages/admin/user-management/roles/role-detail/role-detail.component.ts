import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu, Role } from '@cms/core';
import { IDialogService } from '@cms/partials';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from '../../state/roles/roles.reducer';
import { showRole } from '../../state/roles/roles.selectors';
import * as RoleActions from '../../state/roles/roles.actions';

@Component({
  selector: 'cms-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {

  role: Role;
  roleId: string | undefined;

  private subscription = new Subscription();

  constructor(
    private dialogService: IDialogService,
    private store: Store<State>,
    private route: ActivatedRoute) {
      this.roleId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.setRole();
    console.log(!!this.roleId);
  }
  // validationMessages: { [key: string]: { [key: string]: string } }
  submitRole(event: { role: Role, permissions: Menu[] }): void {

    if (event.permissions) {
      console.log(event.permissions);
      // TODO link permissions
    }

    !!this.roleId ?
    this.store.dispatch(RoleActions.updateRoleRequested({ role: event.role, roleId: this.roleId })) :
    this.store.dispatch(RoleActions.createRoleRequested({ role: event.role }))
  }

  private setRole(): void {

    if (this.roleId) {
      this.getRole();
      return
    }

    this.newRole();

  }

  private getRole(): void {
    this.subscription.add(
      this.store.select(showRole).subscribe(role => {
        console.log(role);


        if (!!role) {
          this.role = role;
          return
        }

        this.store.dispatch(RoleActions.showRoleRequested({ roleId: this.roleId }));

      })
    );
  }

  private newRole(): void {
    this.role = {
      name: '',
      admin: false
    } as Role
  }

}
