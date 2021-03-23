import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IStorageService, Menu } from '@cms/core';

@Component({
  selector: 'cms-checkbox-permissions',
  templateUrl: './checkbox-permissions.component.html',
  styleUrls: ['./checkbox-permissions.component.scss']
})
export class CheckboxPermissionsComponent implements OnInit {

  menuList: Menu[] | null;

  @Output()
  changePermissions = new EventEmitter<Menu[]>();

  constructor(private storage: IStorageService) { }

  ngOnInit(): void {
    this.menuList = this.storage.get('userMenu');
  }

  changeMenuValue(menuIndex: number, event: any): void {
    this.menuList[menuIndex].hasPermission = event.target.checked;
    this.changePermissions.emit(this.menuList);
  }

  changeSubmenuValue(menuIndex: number, submenuIndex: number, event: any): void {
    this.menuList[menuIndex].childrens[submenuIndex].hasPermission = event.target.checked;
    this.changePermissions.emit(this.menuList);
  }

  changeActionValue(menuIndex: number, submenuIndex: number, actionIndex: number, event: any): void {
    this.menuList[menuIndex].childrens[submenuIndex].childrens[actionIndex].hasPermission = event.target.checked;
    this.changePermissions.emit(this.menuList);
  }

}
