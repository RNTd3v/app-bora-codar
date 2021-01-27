import { Option } from './option';

export interface TableColumns extends Option {}

export interface TableAction {
  data: any;
  type: 'edit' | 'delete'
}
export interface TableStatus<T>{
  data: T,
  checked: boolean;
}

export enum TableContentType {
  LIST = 'LIST',
  TEXT = 'TEXT',
  TOGGLE = 'TOGGLE'
}
