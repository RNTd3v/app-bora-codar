import { Option } from './option';

export interface TableColumns extends Option {}

export interface TableAction {
  data: any;
  type: 'edit' | 'delete'
}

export enum TableContentType {
  LIST = 'LIST',
  TEXT = 'TEXT',
  TOGGLE = 'TOGGLE'
}
