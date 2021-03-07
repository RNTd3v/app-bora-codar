import { ButtonConfig, ButtonId, TableColumns, TableConfig, TableContentType } from "@cms/core";

export const columnsConfig = [
  { type: TableContentType.TOGGLE, id: 'isActive', name: 'Ativo', width: '8rem', noSort: true },
  { type: TableContentType.IMAGE, id: 'avatar', name: 'Avatar', width: '8rem', noSort: true  },
  { type: TableContentType.TEXT, id: 'name', name: 'Nome' },
  { type: TableContentType.TEXT, id: 'email', name: 'E-mail' },
  { type: TableContentType.LIST, id: 'roles', name: 'Perfis', noSort: true }
] as TableColumns[];

export const buttonsConfig = [
  {
    id: ButtonId.update,
    type: 'button',
    iconLeftName: 'pen',
    classes: '-icon -edit -border',
    matTooltip: 'Editar'
  },
  {
    id: ButtonId.delete,
    type: 'button',
    iconLeftName: 'trash',
    classes: '-icon -delete -border',
    matTooltip: 'Deletar'
  },
  {
    id: ButtonId.changePassword,
    type: 'button',
    iconLeftName: 'lock',
    classes: '-icon -border -dark',
    matTooltip: 'Alterar Senha'
  }
] as ButtonConfig[];

export const tableConfig = {
  buttons: buttonsConfig,
  columns: columnsConfig
} as TableConfig;
