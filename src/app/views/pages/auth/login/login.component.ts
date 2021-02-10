import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, ButtonConfig, ButtonId, FormConfig, IAuthService, IUIStateService, UIState } from '@cms/core';
import { loginFormConfig } from './config/login-form-config';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  isLoading = false;
  formConfig = loginFormConfig as FormConfig;

  constructor(
    private router: Router,
    private uiStateService: IUIStateService,
    private service: IAuthService
    ) { }

  ngOnInit(): void {}

  async login(auth: Auth): Promise<void> {

    const { email, password }  = auth;

    const userIsLogged = await this.service.login(email, password);

    if (userIsLogged) {
      this.handleResult();
      this.uiStateService.setUIState(UIState.loaded);
      return;
    }

    this.uiStateService.setUIState(UIState.error);

  }

  onClick(button: ButtonConfig): void {
    if (button.id === ButtonId.forgotPassword) {
      this.router.navigate(['auth/forgot-password']);
    }
  }

  private handleResult(): void {
    this.router.navigate(['dashboard']);
  }


}
