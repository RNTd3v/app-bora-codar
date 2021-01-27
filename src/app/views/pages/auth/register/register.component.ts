import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmedValidator, IAuthService, User } from '@cms/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  hide = true
  formRegister: FormGroup
  isLoading = false

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private service: IAuthService
  ) { }

  ngOnInit(): void {
    this.createFormRegister(new User(null))
  }

  private createFormRegister(user: User): void {
    this.formRegister = this.formBuilder.group({
      name: [user.name, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      passwordForm: this.formBuilder.group(
        {
          password: [
            '',
            [Validators.required, Validators.minLength(6)],
          ],
          confirm: [
            '',
            [Validators.required, Validators.minLength(6)],
          ],
        },
        {
          validator: ConfirmedValidator('password', 'confirm'),
        },
      ),
      roles: [user.roles]
    })
  }

  getErrorMessage(inputName: string) {
    if (this.formRegister.get(inputName).hasError('required')) {
      return 'Campo obrigatório'
    }

    switch (inputName) {
      case 'email':
        return this.formRegister.get(inputName).hasError('email')
          ? 'E-mail invalido'
          : ''
      case 'password':
        return this.formRegister.get(inputName).hasError('minlength')
          ? 'Mínimo de 6 caracteres'
          : ''
    }
  }

  showMessageError(inputName: string): boolean {
    return this.formRegister.get(inputName).invalid
  }

  goBack(): void {
    this.router.navigate(['../'])
  }

  async submitRegister(): Promise<void> {

    if (this.formRegister.valid) {

      this.isLoading = true

      const registerUser = await this.registerUser().toPromise().catch(_ => this.handleError());

      if (!!registerUser) {

        const  { email, passwordForm } = this.formRegister.value;
        const userIsLogged = await this.service.login(email, passwordForm.password);

        if (userIsLogged) {
          this.handleResult();
          this.isLoading = false;
          return
        }

      }

    }

    this.isLoading = false;
    this.handleError();
  }

  private registerUser(): Observable<User> {
    const formValue = this.formRegister.value
    const { password } = formValue.passwordForm

    const payload = {
      ...formValue,
      password,
    }

    delete payload.passwordForm

    return this.service.registerUser(payload);
  }

  private handleResult(): void {
    this.router.navigate(['user-management'])
    this.snackBar.open('Usuário criado com sucesso!', null, {
      duration: 2000,
    });
  }

  private handleError(): void {
    this.snackBar.open('Houve um erro!', null, {
      duration: 2000,
    })
  }

  get formInvalid(): boolean {
    return this.formRegister.invalid
  }

}
