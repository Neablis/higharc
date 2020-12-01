"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = app => {
  app.get('/', async (req, resp) => resp.send('Nothing to see. Move along.')); // Error handler route
  // (need the next param for this to work)

  app.use( // eslint-disable-next-line
  async (err, req, res, next) => {
    console.error(err); // eslint-disable-line

    return res.status(500).json({
      message: err.message
    });
  });
};

exports.default = _default;
//# sourceMappingURL=routes.js.map