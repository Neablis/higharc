"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

const router = (0, _express.Router)();
const name = `Auth`;
const AuthRouter = (0, _express.Router)();
AuthRouter.route('/').get(async (req, resp) => resp.send(name));
var _default = AuthRouter;
exports.default = _default;
//# sourceMappingURL=index.js.map