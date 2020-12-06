declare namespace Express {
  interface Request {
    // Fixes bug in VScode that keeps code from being autocompleted
    context: import("./context").Context,
    smoothieId?: string
  }
}
