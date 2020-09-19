exports.dbconnect=function (){
    const { Client } = require('pg')
    const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'kalai',
    database:'flipzon'
    })
    client.connect()
    return client
}