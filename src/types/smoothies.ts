
export type Context = Pick<Token, 'email' | 'admin'>

export interface Token {
  exp: string;
  email: string;
  admin: string;
}