const pool = require('../ConnectionDB/dbCon.js');
const { timeAtTheDesk, measurementDate } = require('../Config.js');
// ======================================================================================
//  The database is a simple table for storing the time and date spent at the desk. 
//  In this case, a non-relational database would be better, 
//  unfortunately MongoDB had some problems with Rasbian, 
//  so I chose MariaDB running on it.
// ======================================================================================
class dbRequeast
{
    // downloading data from the database - prepared to send data via API to the front
    async getData(req,res){
        pool.query("SELECT " + measurementDate + ", SUM(" + timeAtTheDesk + ")" + timeAtTheDesk + " FROM timeData GROUP BY DATE(" + measurementDate + ") ORDER BY " + measurementDate + " DESC", (err, results, metadata) => {
            if (err) {
                //console.log('cos nie tak');
                res.status(400).send(err.message);
            } else {
                //console.log(results);
                res.status(200).send(results);
            }
          });
    }

    // downloading data from the current day
    async getTodayData(req,res){
        pool.query("SELECT " + measurementDate + ", " + timeAtTheDesk + " FROM timeData WHERE DATE(" + measurementDate + ") = CURDATE() ORDER BY " + measurementDate + " DESC", (err, results, metadata) => {
            if (err) {
                //console.log('cos nie tak');
                res.status(400).send(err.message);
            } else {
                //console.log(results);
                res.status(200).send(results);
            }
          });
    }
    
    // saving data to the database - only supported on the server side
    async postData(time){
        pool.query("INSERT INTO timeData (" + measurementDate + ", " + timeAtTheDesk + ") VALUES (NOW(), "+ time +")", (err, results, metadata) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(results);
            }
          });
    }

    // clearing data from table
    async clearTable(req,res){
        pool.query(" DELETE FROM timeData ", (err, results, metadata) => {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.sendStatus(200);
            }
          });
    }

}

module.exports = new dbRequeast();