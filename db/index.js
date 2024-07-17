const knexjs = require('knex');
const config = require('../config');

const db = knexjs({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    port: config.db.port,
    password: '0204',
    database: config.db.name,
  },
  pool: { min: 0, max: 10 },
});

module.exports = db;
