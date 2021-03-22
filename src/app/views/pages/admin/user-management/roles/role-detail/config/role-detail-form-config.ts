import { Validators } from "@angular/forms";
import { ButtonConfig, ButtonId, FieldConfig, FormConfig, Role } from "@cms/core";

const roleFields = (role: Role | undefined) => {
  return [
    {
      type: 'input',
      label: 'Nome',
      inputType: 'text',
      name: 'name',
      value: !!role ? role.name : null,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Nome obrigatório"
        },
        {
          name: "required",
          validator: Validators.minLength(3),
          message: "Nome muito curto"
        }
      ]
    },
    {
      type: 'checkbox',
      label: 'Admin',
      inputType: 'checkbox',
      name: 'isActive',
      value: !!role ? role.admin : null,
      validations: []
    }
  ] as FieldConfig[];
}

const roleButtons: ButtonConfig[] = [
  {
    id: ButtonId.save,
    type: 'submit',
    text: "Salvar",
    iconLeftName: 'save',
    disabled: true
  }
] as ButtonConfig[];

export const roleFormConfig = (role: Role) => {
  return {
    fields: roleFields(role),
    buttons: roleButtons
  } as FormConfig
};

