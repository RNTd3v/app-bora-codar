import { Option } from './option';

export interface TableColumns extends Option {
  uuid?: string;
}
export interface TableAction {
  data: any;
  type: 'edit' | 'delete' | 'more';
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
  TOGGLE = 'TOGGLE'
}

