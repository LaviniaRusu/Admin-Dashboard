import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // dacă ai parolă, pune aici
  database: "bd_admin", // numele DB-ului tău local
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
