"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.missingRoute = exports.isLoggedIn = exports.errorHandler = exports.logging = exports.authMiddleware = void 0;

var _auth = require("./auth");

const authMiddleware = async (req, res, next) => {
  try {
    var _req$headers;

    const bearerHeader = (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers.authorization;
    if (!bearerHeader) return next();
    const [, token] = (bearerHeader === null || bearerHeader === void 0 ? void 0 : bearerHeader.split(" ")) || [];
    if (!token) next();
    const parsedToken = (0, _auth.parseToken)(token);
    const context = {
      email: parsedToken.email,
      admin: parsedToken.admin,
      userId: parsedToken.userId
    };
    /* eslint-disable */

    req.context = context;
  } catch (err) {
    console.error(err);
    next(err);
  }

  next();
};

exports.authMiddleware = authMiddleware;

const logging = (req, res, next) => {
  console.info(`${new Date().toTimeString()} ${req.method} ${req.originalUrl}`);
  next();
};

exports.logging = logging;

const errorHandler = (err, res) => {
  console.log({
    err
  });
  res.status(500).send({
    error: err
  });
};

exports.errorHandler = errorHandler;

const isLoggedIn = (req, res, next) => {
  if (!req.context) {
    res.status(401);
    res.send("User not logged in");
  } else {
    next();
  }
};

exports.isLoggedIn = isLoggedIn;

const missingRoute = (req, res) => {
  res.status(404).send({
    error: "Not found"
  });
};

exports.missingRoute = missingRoute;
//# sourceMappingURL=middleware.js.map