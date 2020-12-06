import 'reflect-metadata';
import dotenv from "dotenv";

dotenv.config();

import bodyParser from 'body-parser';
import express from 'express';
import { createConnection } from 'typeorm';

import router from './api';

import { authMiddleware, errorHandler, logging, missingRoute } from './utils';

/** Create app */
const app = express();

const appEnv = process.env.APP_ENV || 'development';

app.use(bodyParser.json());
app.use(authMiddleware);
app.use(logging);

router(app);

app.use(missingRoute);

app.use(errorHandler);

/** Run server after connecting to DB */
const port = process.env.PORT || 5000;

createConnection()
  .then(async () => {
    console.log('DB READY');

    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((error) => {
    console.log({ error })
  });