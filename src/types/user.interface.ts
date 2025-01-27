export interface User {
  access_token: string;
}

export interface UserToken {
  mobile?: string;
  picture?: number;
  exp: number;
  accessToken?: string;
}

export interface UserSession extends UserToken {}
