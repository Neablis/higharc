const env = require('dotenv');
const path = require('path');

env.config();

const { NODE_ENV, DATABASE_URL, DATABASE_URL_TEST, VERBOSE } = process.env;

const isProduction = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';
const isVerbose = VERBOSE ? true : false;

const dbUrl = isTest ? DATABASE_URL_TEST : DATABASE_URL;

const synchronize = false;
const migrationsRun = isTest;
const dropSchema = isTest;

const logging = isVerbose ? true : [];

module.exports = {
  type: 'postgres',
  url: dbUrl,
  synchronize,
  migrationsRun,
  dropSchema,
  logging: logging,
  entities: ['lib/entity/**/*.js'],
  migrations: ['lib/migration/**/*.js'],
  subscribers: ['lib/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'lib/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'lib/subscriber',
  },
  ssl: isProduction ? true : false,
  extra: {
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  },
}