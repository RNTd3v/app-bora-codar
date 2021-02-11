import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthService, Menu } from '@cms/core';

@Component({
  selector: 'cms-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() asideIsClosed = false;

  menuItens = [] as Menu[];

  constructor(
    private authService: IAuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.menuItens = this.authService.getUserMenu();
    this.menuItens[0].path = '/user-management';
  }

  toggleSubMenu(index: number): void {

    const clickedMenu = this.menuItens[index];
    const { closeTab } = clickedMenu;

    clickedMenu.closeTab = !closeTab;

  }

  getIconArrow(closeTab: boolean): string {
    return closeTab ? 'chevron-down' : 'chevron-up';
  }

  onClick(path: string, index?: number): void {
    console.log(!index);

    if (!index && this.menuItens[index].childrens.length > 0) {
      this.toggleSubMenu(index);
      return;
    }
    this.router.navigate([path]);
  }

  get iconSize(): string {
    return this.asideIsClosed ? '2rem' : '1.6rem';
  }

}
