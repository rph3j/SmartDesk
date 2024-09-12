const mariadb = require('mariadb/callback');
const { dbHost, dbUser, dbPass, dbName } = require('../Config.js');

// =================================================================
// connection to the database using the mariadb library with callback.
// =================================================================

// code from mariadb x nodejs manual
const pool = mariadb.createPool({
    host: dbHost,
    user: dbUser,
    password: dbPass,
    database: dbName,
    connectionLimit: 5
});

pool.getConnection((err, conn) => {
    if (err) {
      console.log("not connected due to error: " + err);
    } else {
      console.log("connected ! connection id is " + conn.threadId);
      conn.end();
    }
  });

module.exports = pool;