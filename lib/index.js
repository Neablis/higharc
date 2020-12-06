"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("reflect-metadata");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _express = _interopRequireDefault(require("express"));

var _typeorm = require("typeorm");

var _api = _interopRequireDefault(require("./api"));

var _utils = require("./utils");

_dotenv.default.config();

/** Create app */
const app = (0, _express.default)();
const appEnv = process.env.APP_ENV || 'development';
app.use(_bodyParser.default.json());
app.use(_utils.authMiddleware);
app.use(_utils.logging);
(0, _api.default)(app);
app.use(_utils.missingRoute);
app.use(_utils.errorHandler);
/** Run server after connecting to DB */

const port = process.env.PORT || 5000;
(0, _typeorm.createConnection)().then(async () => {
  console.log('DB READY');
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}).catch(error => {
  console.log({
    error
  });
});
//# sourceMappingURL=index.js.map