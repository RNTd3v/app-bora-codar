import { ButtonConfig, ButtonId } from '../form/button';
import { Option } from './option';

export interface TableConfig {
  columns: Option[];
  buttons: ButtonConfig[]
}

export interface TableColumns extends Option {
  type: TableContentType;
  noSort?: boolean | undefined;
  width?: string | undefined;
  class?: string[] | undefined;
}
export interface TableAction {
  data: any;
  buttonId: ButtonId;
}
export interface TableStatus<T> {
  data: T;
  checked: boolean;
}
export interface TableMoreAction {
  icon: string;
  text: string;
}

export enum TableContentType {
  LIST = 'LIST',
  TEXT = 'TEXT',
  TOGGLE = 'TOGGLE',
  IMAGE = 'IMAGE'
}

