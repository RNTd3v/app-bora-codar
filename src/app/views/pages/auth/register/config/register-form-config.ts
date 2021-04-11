import { Validators } from '@angular/forms';
import { ButtonConfig, ButtonId, FieldConfig, FormConfig, CnpjValidators } from '@cms/core';

const registerCompanyFields = [
  {
    type: 'input',
    label: 'Nome da empresa',
    inputType: 'text',
    name: 'name',
    validations: [
      {
        name: "required",
        validator: Validators.required,
        message: "Nome da empresa obrigatório"
      }
    ]
  },
  {
    type: 'input',
    label: 'CNPJ',
    inputType: 'text',
    name: 'document',
    mask: 'cnpj',
    validations: [
      {
        name: "required",
        validator: Validators.required,
        message: "CNPJ da empresa obrigatório"
      },
      // {
      //   name: "pattern",
      //   validator: Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/),
      //   message: "CNPJ inválido"
      // },
      {
        name: "pattern",
        validator: CnpjValidators.validate,
        message: "CNPJ inválido"
      }
    ]
  },
  {
    type: 'input',
    label: 'Site da empresa',
    inputType: 'url',
    name: 'host',
    validations: [
      {
        name: "required",
        validator: Validators.required,
        message: "Site da empresa obrigatório"
      },
      {
        name: "pattern",
        validator: Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
        message: "Url inválida"
      }
    ]
  },
  {
    type: 'input',
    label: 'Nome do admin',
    inputType: 'text',
    name: 'adminName',
    validations: [
      {
        name: "required",
        validator: Validators.required,
        message: "Nome do administrador obrigatório"
      }
    ]
  },
  {
    type: 'input',
    label: 'E-mail do admin',
    inputType: 'email',
    name: 'adminEmail',
    validations: [
      {
        name: "required",
        validator: Validators.required,
        message: "E-mail do administrador obrigatório"
      },
      {
        name: "pattern",
        validator: Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        message: "E-mail inválido"
      }
    ]
  },
] as FieldConfig[];

const registerCompanyButtons: ButtonConfig[] = [
  {
    id: ButtonId.save,
    type: 'submit',
    text: "Cadastrar",
    iconRightName: 'save',
    disabled: true
  },
] as ButtonConfig[];

export const registerCompanyFormConfig = {
  fields: registerCompanyFields,
  buttons: registerCompanyButtons
} as FormConfig;
