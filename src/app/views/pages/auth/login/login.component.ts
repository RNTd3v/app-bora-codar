import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, ButtonConfig, ButtonId, FormConfig, IAuthService } from '@cms/core';
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
    private service: IAuthService
    ) { }

  ngOnInit(): void {}

  async login(auth: Auth): Promise<void> {

    const { email, password }  = auth;

    this.isLoading = true;

    const userIsLogged = await this.service.login(email, password);

    if (userIsLogged) {
      this.handleResult();
      this.isLoading = false;
      return;
    }

    this.isLoading = false;

  }

  onClick(button: ButtonConfig): void {
    if (button.id === ButtonId.forgotPassword) {
      this.router.navigate(['auth/forgot-password']);
    }
  }

  private handleResult(): void {
    this.router.navigate(['user-management']);
  }


}
