import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormConfig, Menu, Role, RoleMenusPermissions } from '@cms/core';
import { roleFormConfig } from '../config/role-detail-form-config';

@Component({
  selector: 'cms-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit, OnChanges {

  @Input()
  role: Role | undefined;

  @Input()
  roleMenus: Menu[] | null;

  @Output()
  submit = new EventEmitter<{ role: Role, roleMenus: Menu[] | null }>();

  @Output()
  changeRoles = new EventEmitter<RoleMenusPermissions>();

  formConfig: FormConfig;

  constructor() {}

  ngOnInit(): void {
    this.formConfig = roleFormConfig(this.role);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(!!changes && changes.hasOwnProperty('role')) {
      this.formConfig = roleFormConfig(this.role);
    }

  }

  submitRole(role: Role): void {
    this.submit.emit({ role, roleMenus: this.roleMenus });
  }

  changeRoleMenus(roleMenusPermissions: RoleMenusPermissions): void {
    this.changeRoles.emit(roleMenusPermissions);
  }

}
