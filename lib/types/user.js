"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignupInput = exports.LoginInput = void 0;

class LoginInput {
  constructor() {
    this.email = void 0;
    this.password = void 0;
  }

}

exports.LoginInput = LoginInput;

class SignupInput extends LoginInput {
  constructor(...args) {
    super(...args);
    this.firstName = void 0;
    this.lastName = void 0;
    this.isAdmin = void 0;
  }

}

exports.SignupInput = SignupInput;
//# sourceMappingURL=user.js.map