export type Context = Pick<Token, "email" | "admin" | "userId">

export interface Token {
  exp: string | number;
  email: string;
  admin: boolean;
  userId: string;
}
