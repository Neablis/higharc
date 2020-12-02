"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPassword = exports.hashPassword = exports.createToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var bcrypt = _interopRequireWildcard(require("bcryptjs"));

const saltRounds = 10;

const createToken = user => {
  var token = _jsonwebtoken.default.sign({
    email: user.email,
    isAdmin: user.isAdmin
  }, process.env.SECRET);

  return token;
};

exports.createToken = createToken;

const hashPassword = async password => {
  return await bcrypt.hash(password, saltRounds);
};

exports.hashPassword = hashPassword;

const isPassword = async (password, user) => {
  return new Promise((success, error) => {
    if (!user) return error('Missing user');
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) error(err);
      success(isMatch);
    });
  });
};

exports.isPassword = isPassword;
//# sourceMappingURL=auth.js.map