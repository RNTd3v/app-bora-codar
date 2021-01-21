export interface Auth {
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: string;
  companyId: string;
  token: string;
}
export interface AccessToken {
  token: string;
  timestampExp: number;
  userId: string;
}
export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
}

export interface PasswordForm {
  password?: string;
  confirm?: string;
}

