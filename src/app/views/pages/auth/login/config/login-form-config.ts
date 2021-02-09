import { Validators } from '@angular/forms';
import { ButtonConfig, ButtonId, FieldConfig, FormConfig } from '@cms/core';

const loginFields = [
  {
    type: 'input',
    label: 'E-mail',
    inputType: 'email',
    name: 'email',
    validations: [
      {
        name: "required",
        validator: Validators.required,
        message: "E-mail obrigatório"
      },
      {
        name: "pattern",
        validator: Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        message: "E-mail inválido"
      }
    ]
  },
  {
    type: "input",
    label: "Senha",
    inputType: "password",
    name: "password",
    validations: [
      {
        name: "required",
        validator: Validators.required,
        message: "Senha obrigatória"
      },
      {
        name: "minlength",
        validator: Validators.minLength(6),
        message: "A senha precisa ter no mínimo 6 caracteres"
      }
    ]
  }
] as FieldConfig[];

const loginButtons: ButtonConfig[] = [
  {
    id: ButtonId.login,
    type: 'submit',
    text: "Entrar",
    iconRightName: 'sign-out-alt',
    disabled: true
  },
  {
    id: ButtonId.forgotPassword,
    type: 'button',
    text: "Esqueci a senha",
    classes: '-link -alert',
    disabled: false
  }
] as ButtonConfig[];

export const loginFormConfig = {
  fields: loginFields,
  buttons: loginButtons
} as FormConfig;
