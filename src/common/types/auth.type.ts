export interface IAuthResponse {
  accessToken: string
  refreshToken: string
}

export type AuthLoginForm = {
  email: string
  password: string
}

export interface IAuthRequestTokenResponse extends IAuthResponse {}
