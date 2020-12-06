"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../../entity/User"));

var _express = require("express");

var _utils = require("../../utils");

var _classValidator = require("class-validator");

var _typeorm = require("typeorm");

const router = (0, _express.Router)();
const name = `Auth`;
const AuthRouter = (0, _express.Router)();
AuthRouter.route('/').get(async (req, resp) => resp.send(name));
AuthRouter.route('/login').post(async (req, resp, next) => {
  const body = req.body;
  let loginParams;

  try {
    loginParams = (0, _utils.validateLoginInput)(req.body);
  } catch (err) {
    return next(err);
  }

  const {
    email,
    password
  } = body;
  const connection = (0, _typeorm.getConnection)();
  const existingUser = await connection.getRepository(_User.default).createQueryBuilder('user').addSelect('user.password').where('user.email=:email', {
    email
  }).getOne();
  if (!existingUser) next('User doesnt exist');
  let loggedIn = false;

  try {
    loggedIn = await (0, _utils.isPassword)(password, existingUser);
  } catch (e) {}

  if (loggedIn && existingUser) {
    resp.send({
      token: (0, _utils.createToken)(existingUser)
    });
  } else {
    next('Incorrect Login');
  }
});
AuthRouter.route('/signup').post(async (req, resp, next) => {
  let signupParams;

  try {
    signupParams = (0, _utils.validateSignupInput)(req.body);
  } catch (err) {
    return next(err);
  }

  const {
    email,
    firstName,
    lastName,
    password,
    isAdmin
  } = signupParams;
  const existingUser = await _User.default.findOne({
    where: {
      email
    }
  });
  const user = new _User.default();
  user.email = email;
  user.password = password;
  user.firstName = firstName;
  user.lastName = lastName;
  user.isAdmin = isAdmin || false;
  const errors = await (0, _classValidator.validate)(user);

  if (errors.length > 0) {
    next('Error creating new user');
  } else {
    await user.save();
    resp.send({
      token: (0, _utils.createToken)(user)
    });
  }
});
var _default = AuthRouter;
exports.default = _default;
//# sourceMappingURL=index.js.map