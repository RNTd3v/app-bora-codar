export interface ButtonConfig {
  id?: ButtonId;
  text: string;
  iconLeftName?: string;
  iconRightName?: string;
  disabled?: boolean;
  classes?: string;
  matTooltip?: string;
  type?: string;
}

export enum ButtonId {
  login = 'LOGIN',
  logout = 'LOGOUT',
  save = 'SAVE',
  update = 'UPDATE',
  delete = 'DELETE',
  forgotPassword = 'FORGOT_PASSWORD',
  changePassword = 'CHANGE_PASSWORD',
  viewMore = 'VIEW_MORE'
}
