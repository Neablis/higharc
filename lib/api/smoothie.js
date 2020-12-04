"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

const router = (0, _express.Router)();
const name = `Smoothie`;
const UserRouter = (0, _express.Router)();
UserRouter.route('/').get(async (req, resp) => resp.send(name));
var _default = UserRouter;
exports.default = _default;
//# sourceMappingURL=smoothie.js.map