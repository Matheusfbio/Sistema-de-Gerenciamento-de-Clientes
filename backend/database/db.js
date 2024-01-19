const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Cliente-test",
  password: "Alegri@18",
  port: 5432,
});

module.exports = pool;
