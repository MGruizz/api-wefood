const {Pool,Client} = require('pg')

// const client = new Client({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "123",
//   database: "Wefood"
// })

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "123",
  database: "Wefood"
})

module.exports = pool