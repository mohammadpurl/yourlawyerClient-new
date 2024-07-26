export interface User {
  message: string;
  data: VerifyUser;
}

export interface VerifyUser {
  accessToken: string;
}

export interface UserToken {
  mobile?: string;
  picture?: number;
  exp: number;
  accessToken: string;
}

export interface UserSession extends UserToken {}
