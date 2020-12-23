import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router, ActivatedRoute } from '@angular/router'
import { User, IUserService, ConfirmedValidator } from '@cms/core'
import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  hide = true
  formUser: FormGroup
  userId: string = null
  userData: User
  isLoading = false

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private service: IUserService,
  ) {
    this.userId = this.activatedRoute.snapshot.params.id
  }

  ngOnInit(): void {
    if (!!this.userId) {
      this.userData = JSON.parse(this.activatedRoute.snapshot.queryParams.user)
    }

    this.createFormUser(new User(this.userData))
  }

  private createFormUser(user: User): void {
    this.formUser = this.formBuilder.group({
      name: [user.name, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      passwordForm: this.formBuilder.group(
        {
          password: [
            user.passwordForm.password,
            [Validators.required, Validators.minLength(6)],
          ],
          confirm: [
            user.passwordForm.confirm,
            [Validators.required, Validators.minLength(6)],
          ],
        },
        {
          validator: ConfirmedValidator('password', 'confirm'),
        },
      ),
      roleId: [user.roleId],
    })
  }

  getErrorMessage(inputName: string) {
    if (this.formUser.get(inputName).hasError('required')) {
      return 'Campo obrigatório'
    }

    switch (inputName) {
      case 'email':
        return this.formUser.get(inputName).hasError('email')
          ? 'E-mail invalido'
          : ''
      case 'password':
        console.log(this.formUser.get(inputName))
        return this.formUser.get(inputName).hasError('minlength')
          ? 'Mínimo de 6 caracteres'
          : ''
    }
  }

  showMessageError(inputName: string): boolean {
    return this.formUser.get(inputName).invalid
  }

  goBack(): void {
    this.router.navigate(['../'])
  }

  submitUserData(): void {
    if (this.formUser.valid) {
      this.isLoading = true
      this.createOrUpdateUserData()
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(
          (user: User) => this.handleResult(user),
          (err) => this.handleError(err),
        )
    }
  }

  private createOrUpdateUserData(): Observable<User> {
    if (!!this.userData) {
      return this.updateUserData()
    }

    return this.createUser()
  }

  private createUser(): Observable<User> {
    const formValue = this.formUser.value
    const { password } = formValue.passwordForm

    const payload = {
      ...formValue,
      password,
    }

    delete payload.passwordForm

    return this.service.createUser(payload)
  }

  private updateUserData(): Observable<User> {
    const payload = this.formUser.value
    return this.service.updateUser(payload, this.userId)
  }

  private handleResult(user: User): void {
    this.snackBar.open('Usuário salvo com sucesso!', null, {
      duration: 2000,
    })
  }

  private handleError(err): void {
    this.snackBar.open('Houve um erro!', null, {
      duration: 2000,
    })
  }

  get formInvalid(): boolean {
    return this.formUser.invalid
  }

  get title(): string {
    return !!this.userData ? this.userData.name : 'Usuários'
  }
}

