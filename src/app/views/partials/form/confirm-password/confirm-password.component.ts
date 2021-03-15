import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from '@cms/core';

@Component({
  selector: 'cms-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {

  hide = true;

  formPass: FormGroup;

  @Input() classes = '';

  @Output()
  validatedPassword = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createFormPass();
  }

  checkConfirmPass(): void {
    const password = this.formPass.valid ? this.formPass.get('password').value : null;
    this.validatedPassword.emit(password);
  }

  getErrorMessage(inputName: string) {

    if (this.formPass.get(inputName).hasError('required')) {
      return 'Campo obrigatório';
    }

    switch (inputName) {
      case 'password':
        return this.formPass.get(inputName).hasError('minlength') ? 'A senha precisa ter no mínimo 6 caracteres' : '';
      case 'confirm':
        return this.formPass.get(inputName).hasError('confirmedValidator') ? 'As senhas não são iguais' : '';
      default:
        return;
    }
  }

  showMessageError(inputName: string): boolean {
    return this.formPass.get(inputName).invalid;
  }

  private createFormPass(): void {
    this.formPass = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm: ['', [Validators.required]],
      },
      {
        validator: ConfirmedValidator('password', 'confirm'),
      }
    );
  }


}
