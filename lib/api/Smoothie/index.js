"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Ingredient = _interopRequireDefault(require("../Ingredient"));

const router = (0, _express.Router)();
const name = `Smoothie`;
const SmoothieRouter = (0, _express.Router)();
SmoothieRouter.use('/:smoothieId/ingredients', _Ingredient.default);
SmoothieRouter.route('/').get(async (req, resp) => {
  console.log({
    params: req.params
  });
  return resp.send(name);
});
var _default = SmoothieRouter;
exports.default = _default;
//# sourceMappingURL=index.js.map