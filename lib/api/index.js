"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _User = _interopRequireDefault(require("./User"));

var _Smoothie = _interopRequireDefault(require("./Smoothie"));

var _Auth = _interopRequireDefault(require("./Auth"));

var _default = app => {
  const mainRouter = (0, _express.Router)();
  mainRouter.use("/user", _User.default);
  mainRouter.use("/auth", _Auth.default);
  mainRouter.use("/smoothie", _Smoothie.default);
  mainRouter.get("/", async (req, resp) => resp.send("Nothing to see. Move along."));
  app.use(mainRouter);
};

exports.default = _default;
//# sourceMappingURL=index.js.map