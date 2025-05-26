const { Pool } = require('pg');
const { DB_CONFIG } = require('../config');

const db = new Pool(DB_CONFIG);
module.exports = db;