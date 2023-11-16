// get the client
const mysql = require("mysql2");
require("dotenv/config");

// create the connection to database
const db = process.env.SQL_DATABASE;
const password = process.env.SQL_PASSWORD;
const connection = mysql.createConnection({
  host: "gg",
  user: "root",
  database: "hackathon_basic",
  password: password,
});
module.exports = { connection };

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
  app.use(bodyParser.json());
});