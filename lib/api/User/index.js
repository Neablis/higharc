"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../../entity/User"));

var _express = require("express");

var _utils = require("../../utils");

var _typeorm = require("typeorm");

var _classTransformer = require("class-transformer");

const UserRouter = (0, _express.Router)();
UserRouter.use(_utils.isLoggedIn);
UserRouter.route("/").get(async (req, resp) => {
  const {
    email
  } = req.context;
  const user = await _User.default.findOne({
    email
  }, {
    relations: ["smoothies", "smoothies.ingredients"]
  });

  if (!user) {
    resp.status(404).send("Could not find user");
  } else {
    const results = (0, _classTransformer.classToPlain)(user);
    resp.send(results);
  }
}).delete(async (req, resp) => {
  const {
    email
  } = req.context;
  await (0, _typeorm.getConnection)().createQueryBuilder().delete().from(_User.default).where("email = :email", {
    email
  }).execute();
  resp.send(true);
});
var _default = UserRouter;
exports.default = _default;
//# sourceMappingURL=index.js.map