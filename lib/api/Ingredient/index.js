"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _utils = require("../../utils");

const name = `Ingredient`;
const IngredientRouter = (0, _express.Router)();
IngredientRouter.use(_utils.isLoggedIn);
IngredientRouter.route('/').get(async (req, resp) => resp.send(name));
var _default = IngredientRouter;
exports.default = _default;
//# sourceMappingURL=index.js.map