

import mysql from "mysql";
import database from "../config/database.config.json";

var pool = mysql.createPool(database);

const query = function (option) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) return reject(err)
            conn.query(option, (err, rows) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
                conn.release();
            })
        })
    })
}

pool.on('error', function(err) {
    console.log(err.code); 
});
  


module.exports = query;






















