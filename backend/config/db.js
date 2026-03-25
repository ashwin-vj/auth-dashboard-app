// const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',           // change if needed
//   password: '',           // your phpMyAdmin password
//   database: 'user_db'     // create this database in phpMyAdmin
// });

// db.connect(err => {
//   if (err) throw err;
//   console.log('MySQL Connected...');
// });

// module.exports = db;

// const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: 'localhost',        // or '127.0.0.1'
//   port: 3306,             // default MySQL port
//   user: 'root',             // your phpMyAdmin username
//   password: '',             // ←←← Put your MySQL password here (often empty in XAMPP)
//   database: 'user_db',
// });

// // Test connection immediately
// db.connect((err) => {
//   if (err) {
//     console.error('❌ Database Connection Failed:', err.message);
//     console.log('\nCommon fixes:');
//     console.log('1. Make sure XAMPP MySQL is running');
//     console.log('2. Check username/password in db.js');
//     console.log('3. Check if database "user_db" exists in phpMyAdmin');
//     process.exit(1);   // stop server if DB fails
//   } else {
//     console.log('✅ MySQL Database Connected Successfully!');
//   }
// });

// module.exports = db;

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

module.exports = db;