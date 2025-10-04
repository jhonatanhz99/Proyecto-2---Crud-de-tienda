/**
 * @file config/db.js
 * @description Crea y exporta un pool de conexiones a MySQL usando `mysql2/promise`. Lee configuración desde variables de entorno: DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT.
 * @exports pool (mysql2 pool)
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

module.exports = pool;