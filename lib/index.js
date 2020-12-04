"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("reflect-metadata");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _express = _interopRequireDefault(require("express"));

var _typeorm = require("typeorm");

var _api = _interopRequireDefault(require("./api"));

var _utils = require("./utils");

/** Init env vars MUST BE FIRST */
_dotenv.default.config();

/** Create app */
const app = (0, _express.default)();
/** Init Sentry */

const appEnv = process.env.APP_ENV || 'development';
/** Add middleware */

const root = '/'; // TODO make this secure in production

app.use(_bodyParser.default.json());
app.use(root, _utils.authMiddleware);
app.use(root, _utils.logging);
(0, _api.default)(app);
/** Run server after connecting to DB */

const port = process.env.PORT || 5000;
(0, _typeorm.createConnection)().then(async () => {
  console.log('DB READY');
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}).catch(error => console.log(error));
//# sourceMappingURL=index.js.map