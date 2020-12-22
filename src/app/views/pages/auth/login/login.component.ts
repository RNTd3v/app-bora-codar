import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IAuthService } from '@cms/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  hide = true;
  formLogin: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private service: IAuthService
    ) { }

  ngOnInit(): void {
    this.createFormLogin();
  }

  getErrorMessage(inputName: string) {
    if (this.formLogin.get(inputName).hasError('required')) {
      return 'Campo obrigatório';
    }

    switch (inputName) {
      case 'email':
        return this.formLogin.get(inputName).hasError('email') ? 'E-mail invalido' : '';
      case 'password':
        return this.formLogin.get(inputName).hasError('minlength') ? 'Mínimo de 6 caracteres' : '';
    }

  }

  showMessageError(inputName: string): boolean {
    return this.formLogin.get(inputName).invalid;
  }

  async login(): Promise<void> {

    if (this.formLogin.valid) {

      const { email, password }  = this.formLogin.value;

      this.isLoading = true;

      const userIsLogged = await this.service.login(email, password);

      if (userIsLogged) {
        this.handleResult();
        this.isLoading = false;
        return
      }

    }

    this.isLoading = false;
    this.handleError();
  }

  private createFormLogin(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  private handleResult(): void {
    this.snackBar.open('Bem-vindo(a)!', null, {
      duration: 2000,
    });
    this.router.navigate(['user-management']);
  }

  private handleError(): void {
    this.snackBar.open('Houve um erro!', null, {
      duration: 2000,
    });
  }

  get formInvalid(): boolean  {
    return this.formLogin.invalid;
  }

}
