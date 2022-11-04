const { Client } = require('pg')
const client = new Client()

const client = new Client({
  user: 'me',
  host: 'localhost',
  database: 'mydb',
  password: '123',
  port: 5432,
})
/*ingresar los datos de nuestra data base
**/
await client.connect()
const res = await client.query('SELECT $1::text as message')
console.log(res.rows[0].message) // Hello world!
await client.end()