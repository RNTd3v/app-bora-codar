export interface ButtonConfig {
  id?: ButtonId;
  text?: string;
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
  view = 'VIEW',
  viewMore = 'VIEW_MORE',
  save = 'SAVE',
  update = 'UPDATE',
  delete = 'DELETE',
  forgotPassword = 'FORGOT_PASSWORD',
  changePassword = 'CHANGE_PASSWORD',
}
