"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const mysql2_1 = __importDefault(require("mysql2"));
var con = mysql2_1.default.createConnection({
    host: "mysql-db",
    //host: "localhost",
    user: "root",
    database: "users",
    port: 3306
});
con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, createdAt timestamp, updatedAt timestamp)";
    con.query(sql, function (err, result) {
        if (err)
            throw err;
        console.log("Table created");
    });
});
exports.db = new sequelize_1.Sequelize('users', 'root', '', {
    host: 'mysql-db',
    //host: "localhost",
    dialect: 'mysql',
    logging: true,
    port: 3306
});
//# sourceMappingURL=connection.js.map