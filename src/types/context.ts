export type Context = Pick<Token, 'email' | 'admin' | 'userId'>

export interface Token {
  exp: string;
  email: string;
  admin: string;
  userId: string;
}