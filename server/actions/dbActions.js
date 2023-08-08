const pool = require('../ConnectionDB/dbCon.js');
const { timeAtTheDesk, measurementDate } = require('../Config.js');

// =================================================================
// Akcje które zostją wykonane na bazie danych
// =================================================================
class dbRequeast
{
    // pobieranie danych z bazy - przygotowane aby wyslać dane przez api na front
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
    
    // zapisywanie danych do bazy - działa tylko po stronie servera
    async postData(time){
        pool.query("INSERT INTO timeData (" + measurementDate + ", " + timeAtTheDesk + ") VALUES (NOW(), "+ time +")", (err, results, metadata) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(results);
            }
          });
    }

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