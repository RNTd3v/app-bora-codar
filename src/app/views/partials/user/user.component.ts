import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonConfig, IAuthService, User } from '@cms/core';
import { environment } from '@cms/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cms-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  buttonConfigDefault = {
    classes: '-icon -border',
    type: 'button'
  } as ButtonConfig;

  @Input() asideIsClosed = false;
  openMenu: Observable<boolean>;

  constructor(
    private authService: IAuthService,
    private router: Router,
    private store: Store<any>
    ) { }

  ngOnInit(): void {
    this.openMenu = this.store.select('theme')
      .pipe(map(item => item.openMenu));
  }

  goToSettings(): void {
    this.router.navigate(['settings']);
  }

  goToUsers(): void {
    this.router.navigate(['user-management']);
  }

  goToContact(): void {
    this.router.navigate(['contact']);
  }

  logout(): void {
    this.authService.logout();
  }

  get user(): User {
    return this.authService.userData;
  }

  get pathAvatar(): string {
    return !!this.user.avatar ? `${environment.IMAGE_URL}${this.user.avatar}` : '/assets/icons/user.svg';
  }

  get buttonConfig(): ButtonConfig {
    return {
      ...this.buttonConfigDefault,
      iconLeftName: 'cog',
      matTooltip: 'Configurações',
    }
  }

  get buttonContact(): ButtonConfig {
    return {
      ...this.buttonConfigDefault,
      iconLeftName: 'envelope',
      matTooltip: 'Contato',
    }
  }

  get buttonUsers(): ButtonConfig {
    return {
      ...this.buttonConfigDefault,
      iconLeftName: 'users',
      matTooltip: 'Usuários',
    }
  }

  get buttonLogout(): ButtonConfig {
    return {
      ...this.buttonConfigDefault,
      iconLeftName: 'power-off',
      matTooltip: 'Sair',
    }
  }

}
