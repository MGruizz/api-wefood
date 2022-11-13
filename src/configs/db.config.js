const {Pool} = require('pg')


const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "bastian2205",
  database: "WeFood"
})

module.exports = pool