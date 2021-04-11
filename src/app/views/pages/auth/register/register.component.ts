import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmedValidator, FormConfig, IAuthService, User } from '@cms/core';
import { Observable } from 'rxjs';
import { registerCompanyFormConfig } from './config/register-form-config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  isLoading = false;

  formConfig = registerCompanyFormConfig as FormConfig;
  cnpj = '';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private service: IAuthService
  ) { }

  ngOnInit(): void {}

  goBack(): void {
    this.router.navigate(['../']);
  }

  async onRegisterClick(register: any): Promise<void> {

    console.log(register);

    this.cnpj = register.document;


    // const { email, password }  = auth;

    // const userIsLogged = await this.service.login(email, password);

    // if (userIsLogged) {
    //   this.handleResult();
    //   this.uiStateService.setUIState(UIState.loaded);
    //   return;
    // }

    // this.uiStateService.setUIState(UIState.error);

  }

  private handleResult(): void {
    this.router.navigate(['user-management']);
    this.snackBar.open('Usuário criado com sucesso!', null, {
      duration: 2000,
    });
  }



}
