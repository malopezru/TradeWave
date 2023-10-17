
import { Sequelize } from "sequelize"
import mysql from 'mysql2'

var con = mysql.createConnection({
    host: "mysql-db",
    //host: "localhost",
    user: "root",
    database: "users",
    port: 3306
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, createdAt timestamp, updatedAt timestamp)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });

export const db = new Sequelize('users', 'root', '', {
    host: 'mysql-db',
    //host: "localhost",
    dialect: 'mysql',
    logging: true,
    port: 3306
})