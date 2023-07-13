

import mysql from "mysql2";

require("dotenv").config();

const sqlPassword = process.env.SQLPASSWORD; 

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "max",
  password: sqlPassword,
  database: "movie-booking",
 multipleStatements: true //-- multiple querys with each connect
});

console.log(connection.authorized)

connection.connect((err) => {
  try {
    if (err) throw err;

    console.info("🔥 MySQL is connected 🛢 ");
  } catch (error) {
    console.error(error);
  }
});

export default connection;
