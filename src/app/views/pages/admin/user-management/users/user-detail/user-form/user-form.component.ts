import { Component, Input, OnInit } from '@angular/core';
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

  rolesNames: string[] = [];
  formConfig: FormConfig;

  constructor() { }

  ngOnInit(): void {
    this.handleRoles();
    this.formConfig = userFormConfig(!!this.user ? this.user : undefined)
  }

  addRoleId(roleName: string): void {

    // const roleId = this.roles
    //   .filter(role => role.name === roleName)
    //   .map(role => role.id);

    // const roleIds = this.formConfig.fields
    //   .filter(config => config.name === 'roleIds')
    //   .map(roleIds => roleIds.value);

    // const fields = {
    //   ...this.formConfig.fields,
    // }

    // this.formConfig = {
    //   ...this.formConfig,
    //   fields
    // }

    // this.formUser.get('roleIds').setValue([...(roleIds ? roleIds : ''), ...roleId]);

  }

  removeRoleId(index: number): void {

    // const roleIds = this.formUser.get('roleIds').value as string[];
    // roleIds.splice(index, 1);

    // this.formUser.get('roleIds').setValue([...roleIds]);

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
