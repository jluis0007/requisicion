const mysql = require('mysql');
const { promisify }= require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);// hilos que se ejecutan a la vez

pool.getConnection((err, connection) => {// este código no soporta el async await por eso promisify que esta antes
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }

  if (connection) connection.release();
  console.log('DB is Connected');

  return;
});

// Promisify Pool Querys CONVERTIENDO PROMESAS LO QUE ANTES ERAN CALL BACKS
pool.query = promisify(pool.query);

module.exports = pool;