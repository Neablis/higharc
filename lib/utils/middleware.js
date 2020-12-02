"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authChecker = exports.ErrorInterceptor = exports.authMiddleware = void 0;

var _auth = require("./auth");

const authMiddleware = async (req, res, next) => {
  try {
    var _req$headers;

    const bearerHeader = (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers.authorization;
    if (!bearerHeader) return next();
    const [, token] = (bearerHeader === null || bearerHeader === void 0 ? void 0 : bearerHeader.split(' ')) || [];
    if (!token) next();
    let parsedToken = (0, _auth.parseToken)(token);
    req['email'] = parsedToken === null || parsedToken === void 0 ? void 0 : parsedToken.email;
    req['admin'] = parsedToken === null || parsedToken === void 0 ? void 0 : parsedToken.admin;
  } catch (err) {
    console.error(err);
    err;
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
    email,
    admin
  }
}, roles) => {
  if (roles.length === 0) return email !== undefined; // and if no user, restrict access

  if (!email) return false;

  if (roles.length > 0 && roles.includes('admin')) {
    if (admin) {
      return true;
    } else {
      return false;
    }
  } // no roles matched, restrict access


  return false;
};

exports.authChecker = authChecker;
//# sourceMappingURL=middleware.js.map