import { Option } from './option';

export interface TableColumns extends Option {}

export interface TableAction {
  data: any;
  type: 'edit' | 'delete'
}
