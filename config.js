const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    database: "dbmovies",
    port: 5432
});

module.exports = pool;