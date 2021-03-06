import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthService, Menu } from '@cms/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getOpenMenuState, State } from '../state/app.reducer';

@Component({
  selector: 'cms-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  menuItens = [] as Menu[];
  openMenu$: Observable<boolean>;

  constructor(
    private authService: IAuthService,
    private store: Store<State>,
    private router: Router) {}

  ngOnInit(): void {
    this.menuItens = this.authService.showUserMenu();
    this.openMenu$ = this.store.select(getOpenMenuState);
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

    if (!index && this.menuItens[index].childrens.length > 0) {
      this.toggleSubMenu(index);
      return;
    }
    this.router.navigate([path]);
  }

  getPath(mainPath: string, childrenPath: string = null): string {
    return childrenPath ? mainPath + childrenPath : mainPath;
  }

  iconSize(openMenu: boolean): string {
    return openMenu ? '1.6rem' : '2rem';
  }

  getToolTip(openMenu: boolean, text: string): string | null {
    return openMenu ? null : text;
  }

}
