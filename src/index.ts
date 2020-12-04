/** Init env vars MUST BE FIRST */
import 'reflect-metadata';
import dotenv from "dotenv";

dotenv.config();

import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import {
  UserResolver,
  SmoothieResolver,
  IngredientResolver
} from './resolvers';

import router from './routes';

import { authMiddleware, ErrorInterceptor, authChecker } from './utils';

/** Create app */
const app = express();

/** Init Sentry */
const appEnv = process.env.APP_ENV || 'development';

/** Add middleware */
const graphqlPath = '/';

// TODO make this secure in production
app.use(bodyParser.json());
app.use(graphqlPath, authMiddleware);

router(app);

/** Run server after connecting to DB */
const port = process.env.PORT || 5000;

createConnection()
  .then(async () => {
    console.log('DB READY');

    const schema = await buildSchema({
      resolvers: [
        UserResolver,
        SmoothieResolver,
        IngredientResolver
      ],
      authChecker,
      globalMiddlewares: [ErrorInterceptor],
    });

    const server = new ApolloServer({
      schema,
      playground: true,
      context: ({ req }) => {
        const context = {
          email: req['email'],
          admin: req['admin'],
          userId: req['userId']
        };
        return context;
      },
    });
    server.applyMiddleware({ app, cors: false, path: graphqlPath });
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((error) => console.log(error));