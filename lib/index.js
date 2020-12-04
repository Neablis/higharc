"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("reflect-metadata");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _apolloServerExpress = require("apollo-server-express");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _express = _interopRequireDefault(require("express"));

var _typeGraphql = require("type-graphql");

var _typeorm = require("typeorm");

var _resolvers = require("./resolvers");

var _routes = _interopRequireDefault(require("./routes"));

var _utils = require("./utils");

/** Init env vars MUST BE FIRST */
_dotenv.default.config();

/** Create app */
const app = (0, _express.default)();
/** Init Sentry */

const appEnv = process.env.APP_ENV || 'development';
/** Add middleware */

const graphqlPath = '/'; // TODO make this secure in production

app.use(_bodyParser.default.json());
app.use(graphqlPath, _utils.authMiddleware);
(0, _routes.default)(app);
/** Run server after connecting to DB */

const port = process.env.PORT || 5000;
(0, _typeorm.createConnection)().then(async () => {
  console.log('DB READY');
  const schema = await (0, _typeGraphql.buildSchema)({
    resolvers: [_resolvers.UserResolver, _resolvers.SmoothieResolver, _resolvers.IngredientResolver],
    authChecker: _utils.authChecker,
    globalMiddlewares: [_utils.ErrorInterceptor]
  });
  const server = new _apolloServerExpress.ApolloServer({
    schema,
    playground: true,
    context: ({
      req
    }) => {
      const context = {
        email: req['email'],
        admin: req['admin'],
        userId: req['userId']
      };
      return context;
    }
  });
  server.applyMiddleware({
    app,
    cors: false,
    path: graphqlPath
  });
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}).catch(error => console.log(error));
//# sourceMappingURL=index.js.map