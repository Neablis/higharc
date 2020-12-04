"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

const router = (0, _express.Router)();
const name = `Ingredient`;
const IngredientRouter = (0, _express.Router)();
IngredientRouter.route('/').get(async (req, resp) => resp.send(name));
var _default = IngredientRouter;
exports.default = _default;
//# sourceMappingURL=index.js.map