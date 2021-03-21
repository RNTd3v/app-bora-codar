import { Validators } from "@angular/forms";
import { ButtonConfig, ButtonId, FieldConfig, FormConfig } from "@cms/core";

const changePassFields = () => {
  return [
    {
      type: 'input',
      label: 'Senha atual',
      inputType: 'password',
      name: 'password',
      value: '',
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Senha obrigatória"
        }
      ]
    },
    {
      type: 'input',
      label: 'New Password',
      inputType: 'hidden',
      name: 'newPassword',
      value: '',
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Senha obrigatória"
        }
      ]
    },
    {
      type: 'input',
      label: 'Confirm Password',
      inputType: 'hidden',
      name: 'confirmPassword',
      value: '',
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Senha obrigatória"
        }
      ]
    },
  ] as FieldConfig[];
}

const userButtons: ButtonConfig[] = [
  {
    id: ButtonId.save,
    type: 'submit',
    text: "Salvar",
    iconLeftName: 'save',
    disabled: true
  }
] as ButtonConfig[];

export const userChangePassFormConfig = () => {
  return {
    fields: changePassFields(),
    buttons: userButtons
  } as FormConfig
};

