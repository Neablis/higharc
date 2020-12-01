"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authChecker = exports.ErrorInterceptor = exports.authMiddleware = void 0;

var _User = _interopRequireDefault(require("../entity/User"));

const authMiddleware = async (req, res, next) => {
  try {
    var _req$headers;

    const bearerHeader = (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers.authorization;
    if (!bearerHeader) return next();
    const [, token] = (bearerHeader === null || bearerHeader === void 0 ? void 0 : bearerHeader.split(' ')) || [];
    if (!token) next();
    const user = await _User.default.findOne({
      email: 'mitchell@demarcosoftware.com'
    });
    req['user'] = user;
  } catch (err) {
    console.error(err);
  }

  next();
};

exports.authMiddleware = authMiddleware;

const ErrorInterceptor = async (_, next) => {
  try {
    return await next();
  } catch (err) {
    console.error(err); // rethrow the error

    throw err;
  }
}; // create auth checker function


exports.ErrorInterceptor = ErrorInterceptor;

const authChecker = ({
  root,
  args,
  context: {
    user
  }
}, roles) => {
  // if `@Authorized()`, check only is user exist
  if (roles.length === 0) return user !== undefined; // and if no user, restrict access

  if (!user) return false; // no roles matched, restrict access

  return false;
};

exports.authChecker = authChecker;
//# sourceMappingURL=middleware.js.map