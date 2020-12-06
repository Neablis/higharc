declare namespace Express {
  interface Request {
    context: import("./context").Context
  }
}
