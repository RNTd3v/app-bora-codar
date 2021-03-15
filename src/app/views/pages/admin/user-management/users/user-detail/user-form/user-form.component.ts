import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormConfig, Role, User } from '@cms/core';
import { userFormConfig } from '../config/user-detail-form-config';

@Component({
  selector: 'cms-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input()
  user: User | undefined;

  @Input()
  roles: Role[] = [];

  @Input()
  newUser = false;

  @Output()
  submit = new EventEmitter<User>();

  rolesNames: string[] = [];
  formConfig: FormConfig;

  constructor() { }

  ngOnInit(): void {
    this.handleRoles();
    this.formConfig = userFormConfig(!!this.user ? this.user : undefined, this.newUser)
  }

  getPassword(password: string): void {

    this.user = {
      ...this.user,
      password
    }

    this.formConfig = userFormConfig(this.user, this.newUser);

  }

  addRoleId(roleName: string): void {

    const roleId = this.roles
      .filter(role => role.name === roleName)
      .map(role => role.id);

    const { roleIds } = this.user;

    this.user = {
      ...this.user,
      roleIds: [...roleIds, ...roleId]
    }

    this.formConfig = userFormConfig(this.user, this.newUser);

  }

  removeRoleId(index: number): void {

    const { roleIds } = this.user;
    roleIds.splice(index, 1);

    this.user = {
      ...this.user,
      roleIds: [...roleIds]
    }

    this.formConfig = userFormConfig(this.user, this.newUser);

  }

  saveUser(user: User): void {
    this.submit.emit(user);
  }

  private handleRoles(): void {

    const roleIds = this.user.roles.map(role => role.id);

    this.rolesNames = this.user.roles.map(role => role.name);

    this.user = {
      ...this.user,
      roleIds
    };

  }

}
