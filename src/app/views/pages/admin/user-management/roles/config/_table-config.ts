import { ButtonConfig, ButtonId, TableColumns, TableConfig, TableContentType } from "@cms/core";

export const columnsConfig = [
  { type: TableContentType.TOGGLE, id: 'admin', name: 'Admin', width: '8rem', noSort: true },
  { type: TableContentType.TEXT, id: 'name', name: 'Nome' }
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
  }
] as ButtonConfig[];

export const tableConfig = {
  buttons: buttonsConfig,
  columns: columnsConfig
} as TableConfig;
