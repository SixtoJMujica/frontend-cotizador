export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserTokenPayload {
  sub: number;
  email: string;
  role: 'admin' | 'user';
  iat?: number;
  exp?: number;
}

export interface LoginResponse {
  access_token: string;
}
