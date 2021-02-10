import { Component, OnInit } from '@angular/core';
import { ButtonConfig, IAsideService, IAuthService } from '@cms/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  buttonConfigDefault = {
    classes: '-icon -link',
    type: 'button'
  } as ButtonConfig;

  constructor(
    private authService: IAuthService,
    private asideService: IAsideService) { }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }

  toggleAside(): void {
    this.asideService.toggleAside();
  }

  changeTheme(): void {}
  visitPage(): void {}
  reportBug(): void {}
  showNotifications(): void{}

  get toggleIconName(): string {
    return this.asideService.asideIsClosed ? 'indent' : 'bars'
  }

  get buttonTheme(): ButtonConfig {
    return {
      ...this.buttonConfigDefault,
      iconLeftName: 'fill-drip',
      matTooltip: 'Tema',
    }
  }

  get buttonVisitPage(): ButtonConfig {
    return {
      ...this.buttonConfigDefault,
      iconLeftName: 'external-link-alt',
      matTooltip: 'Visitar o site',
    }
  }

  get buttonReportBug(): ButtonConfig {
    return {
      ...this.buttonConfigDefault,
      iconLeftName: 'bug',
      matTooltip: 'Reportar um bug',
    }
  }

  get buttonShowNotifications(): ButtonConfig {
    return {
      ...this.buttonConfigDefault,
      iconLeftName: 'bell',
      matTooltip: 'Ver notificações',
    }
  }

}
