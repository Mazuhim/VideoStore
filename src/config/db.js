/* .env lib */
require('dotenv').config();

/* DB Config */
const connection = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    supportBigNumbers: true,
    bigNumberStrings: true,
    multipleStatements: true,
    timezone: 'UTC',
    // dateStrings: true,
  },
  pool: { min: parseInt(process.env.DB_POOL_MIN), max: parseInt(process.env.DB_POOL_MAX) },
  debug: true,
});

module.exports = connection;
