import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormConfig, Role } from '@cms/core';
import { roleFormConfig } from '../config/role-detail-form-config';

@Component({
  selector: 'cms-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

  @Input()
  role: Role | undefined;

  @Output()
  submit = new EventEmitter<Role>();

  formConfig: FormConfig;

  constructor() {}

  ngOnInit(): void {
    console.log(this.role);

    this.formConfig = roleFormConfig(this.role);
  }

  submitRole(role: Role): void {
    this.submit.emit(role);
  }

}
