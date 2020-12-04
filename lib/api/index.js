"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _User = _interopRequireDefault(require("./User"));

var _Smoothie = _interopRequireDefault(require("./Smoothie"));

var _default = app => {
  const mainRouter = (0, _express.Router)();
  mainRouter.use('/user', _User.default);
  mainRouter.use('/smoothie', _Smoothie.default);
  mainRouter.get('/', async (req, resp) => resp.send('Nothing to see. Move along.')); // Error handler route

  mainRouter.use( // eslint-disable-next-line
  async (err, req, res, next) => {
    console.error(err); // eslint-disable-line

    return res.status(500).json({
      message: err.message
    });
  });
  app.use(mainRouter);
};

exports.default = _default;
//# sourceMappingURL=index.js.map