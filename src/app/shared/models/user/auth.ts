export interface Auth {
  email: string;
  password: string;
}

export interface Token {
  userId: string;
  token: string;
}

export interface PasswordForm {
  password?: string;
  confirm?: string;
}

