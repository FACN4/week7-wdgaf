const { Pool } = require('pg');
const url = require('url');
require('env2')('./config.env');

let { DB_URL } = process.env;
if (process.env.NODE_ENV === 'test') {
  DB_URL = process.env.TEST_DB_URL;
}

if (!DB_URL) throw new Error('Enviroment variable DB_URL must be set');

const options = {
  connectionString: DB_URL,
};

options.ssl = options.host !== 'localhost';

module.exports = new Pool(options);
