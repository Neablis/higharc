const env = require('dotenv');
const path = require('path');

env.config();

const { NODE_ENV, DATABASE_URL, DATABASE_URL_TEST, VERBOSE } = process.env;

const isProduction = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';
const isVerbose = VERBOSE ? true : false;

const dbUrl = isTest ? DATABASE_URL_TEST : DATABASE_URL;

// Type ORM thing. Looks at entities and creates schema for the database
// Do NOT set this to true in prod
const synchronize = isTest;
const migrationsRun = isTest;
const logging = isVerbose ? ["query", "error"] : [];

module.exports = {
  type: 'postgres',
  url: dbUrl,
  synchronize,
  migrationsRun,
  dropSchema: isTest,
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
};