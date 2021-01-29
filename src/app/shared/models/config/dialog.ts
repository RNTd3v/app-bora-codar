export interface DialogData {
  id?: string;
  title: string;
  text?: string;
  component?: any;
  cancelText?: string;
  confirmText?: string;
  [data: string]: any;
}

