import { Validators } from "@angular/forms";
import { ButtonConfig, ButtonId, FieldConfig, FormConfig, User } from "@cms/core";

const userFields = (user: User | undefined) => {
  return [
    {
      type: 'input',
      label: 'Nome completo',
      inputType: 'text',
      name: 'name',
      value: !!user ? user.name : null,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Nome completo obrigatório"
        },
        {
          name: "required",
          validator: Validators.minLength(3),
          message: "Nome muito curto"
        }
      ]
    },
    {
      type: 'input',
      label: 'E-mail',
      inputType: 'email',
      name: 'email',
      value: !!user ? user.email : null,
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
      type: 'input',
      label: 'Perfis',
      inputType: 'hidden',
      name: 'roleIds',
      value: !!user ? user.roleIds : null,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Pelo menos um perfil tem que ser selecionado"
        }
      ]
    }
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

export const userFormConfig = (user: User) => {
  return {
    fields: userFields(user),
    buttons: userButtons
  } as FormConfig
};
