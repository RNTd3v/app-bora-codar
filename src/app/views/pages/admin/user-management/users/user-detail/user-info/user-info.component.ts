import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonConfig, Role, User } from '@cms/core';

@Component({
  selector: 'cms-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  changePass = new EventEmitter();

  @Output()
  changeStatus = new EventEmitter();

  photoIsEditable = true;

  buttonConfigDefault = {
    classes: '-icon -border',
    type: 'button'
  } as ButtonConfig;

  constructor() { }

  ngOnInit(): void {
    console.log(this.user);

  }

  changeUserStatus(checked: boolean): void {
    this.changeStatus.emit(checked);
  }

  changeUserPass(): void {
    this.changePass.emit();
  }

  getRolesName(roles: Role[]): string[] {
    return roles.map(role => role.name);
  }

  get buttonMail(): ButtonConfig {
    return {
      ...this.buttonConfigDefault,
      iconLeftName: 'envelope',
      matTooltip: 'E-mail',
    }
  }

  get buttonPhone(): ButtonConfig {
    return {
      ...this.buttonConfigDefault,
      iconLeftName: 'phone',
      matTooltip: 'Telefone',
    }
  }

}
