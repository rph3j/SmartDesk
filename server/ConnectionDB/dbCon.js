const mariadb = require('mariadb/callback');
const { dbHost, dbUser, dbPass, dbName } = require('../Config.js');

// =================================================================
// połaczenie z baza danych za pomocą biblioteki mariadb z collback.
// =================================================================

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
      conn.end(); //release to pool
    }
  });

// exportuje połacznie
module.exports = pool;