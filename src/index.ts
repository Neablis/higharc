/** Init env vars MUST BE FIRST */
import 'reflect-metadata';
import dotenv from "dotenv";

dotenv.config();

import bodyParser from 'body-parser';
import express from 'express';
import { createConnection } from 'typeorm';

import router from './api';

import { authMiddleware, ErrorInterceptor, authChecker, logging } from './utils';

/** Create app */
const app = express();

/** Init Sentry */
const appEnv = process.env.APP_ENV || 'development';

/** Add middleware */
const root = '/';

// TODO make this secure in production
app.use(bodyParser.json());
app.use(root, authMiddleware);
app.use(root, logging);

router(app);

/** Run server after connecting to DB */
const port = process.env.PORT || 5000;

createConnection()
    .then(async () => {
        console.log('DB READY');

        app.listen(port, () => console.log(`Server listening on port ${port}`));
    })
    .catch((error) => console.log(error));