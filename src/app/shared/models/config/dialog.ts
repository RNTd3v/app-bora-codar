export class DialogData<T> {
  id?: string;
  title: string;
  text?: string;
  width?: string;
  cancelText?: string;
  confirmText?: string;
  component?: any;
  componentData?: T;

  constructor({ ...dialog }) {
    this.id = dialog.id,
    this.title = dialog.title,
    this.text = dialog.text,
    this.width = dialog.width || '300px';
    this.cancelText = dialog.cancelText || 'Cancelar',
    this.confirmText = dialog.confirmText || 'Confirmar';
    this.component = dialog.component;
    this.componentData = dialog.componentData;
  }
}

export interface DialogTarget<D, T> {
  data: D;
  target: T;
}

