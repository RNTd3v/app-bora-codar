import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IUserService } from '../../services';

@Component({
  selector: 'app-update-user-password',
  templateUrl: './update-user-password.component.html',
  styleUrls: ['./update-user-password.component.scss']
})
export class UpdateUserPasswordComponent implements OnInit {

  formChangePass: FormGroup;
  isLoadingAction = false;

  @Input('componentData') componentData;
  @Output() closeModal = new EventEmitter<any>();

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private service: IUserService,
  ) { }

  ngOnInit(): void {
    this.createFormChangePass();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getErrorMessage(inputName: string) {

    if (this.formChangePass.get(inputName).hasError('required')) {
      return 'Campo obrigatório';
    }

    switch (inputName) {
      case 'password':
        return this.formChangePass.get(inputName).hasError('minlength') ? 'A senha precisa ter no mínimo 6 caracteres' : '';
      default:
        return;
    }

  }

  showMessageError(inputName: string): boolean {
    return this.formChangePass.get(inputName).invalid;
  }

  submitPass(): void {

    if (this.formChangePass.valid) {

      this.isLoadingAction = true;

      this.subscription.add(
        this.service.updateUserPassword(this.formChangePass.value, this.componentData.id)
          .pipe(finalize(() => (this.isLoadingAction = false)))
          .subscribe((_) => this.handleResult())
      );

    }

  }

  cancel(): void {
    this.closeModal.emit(false);
  }

  getPassword(password: string): void {
    this.formChangePass.get('newPassword').setValue(password);
    this.formChangePass.get('confirmPassword').setValue(password);
  }

  private handleResult(): void {
    this.closeModal.emit(true);
    this.snackBar.open('Senha alterada com sucesso!', null, { duration: 1000 });
  }

  private createFormChangePass(): void {
    this.formChangePass = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get formInvalid(): boolean {
    return this.formChangePass.invalid;
  }

}
