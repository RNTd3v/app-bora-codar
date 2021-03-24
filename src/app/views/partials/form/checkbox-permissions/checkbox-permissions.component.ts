import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from '@cms/core';

@Component({
  selector: 'cms-checkbox-permissions',
  templateUrl: './checkbox-permissions.component.html',
  styleUrls: ['./checkbox-permissions.component.scss']
})
export class CheckboxPermissionsComponent implements OnInit {

  @Input() roleMenus: Menu[] | null;

  @Output()
  changeRoleMenus = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {}

  changeMenuValue(menuIndex: number, event: any): void {
    this.changeRoleMenus.emit({
      menuIndex,
      value: event.target.checked
    });
  }

  changeSubmenuValue(menuIndex: number, submenuIndex: number, event: any): void {
    this.changeRoleMenus.emit({
      menuIndex,
      value: event.target.checked,
      submenuIndex
    });
  }

  changeActionValue(menuIndex: number, submenuIndex: number, actionIndex: number, event: any): void {
    this.changeRoleMenus.emit({
      menuIndex,
      value: event.target.checked,
      submenuIndex,
      actionIndex
    });
  }

}
