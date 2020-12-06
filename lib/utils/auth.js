"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPassword = exports.hashPassword = exports.parseToken = exports.createToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var bcrypt = _interopRequireWildcard(require("bcryptjs"));

const SALT_ROUNDS = 10;
const ONE_HOUR = Math.floor(Date.now() / 1000) + 60 * 60;

const createToken = user => {
  const token = {
    exp: ONE_HOUR,
    email: user.email,
    admin: user.isAdmin || false,
    userId: user.id
  };

  const tokenStr = _jsonwebtoken.default.sign(token, process.env.SECRET);

  return tokenStr;
};

exports.createToken = createToken;

const parseToken = token => {
  const decoded = _jsonwebtoken.default.verify(token, process.env.SECRET);

  return decoded;
};

exports.parseToken = parseToken;

const hashPassword = async password => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

exports.hashPassword = hashPassword;

const isPassword = async (password, user) => {
  return new Promise((success, error) => {
    if (!user) return error("Missing user");
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) error(err);
      success(isMatch);
    });
  });
};

exports.isPassword = isPassword;
//# sourceMappingURL=auth.js.map