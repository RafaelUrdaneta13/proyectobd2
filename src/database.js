//importo los parametros de key y conecto
const mysql = require('mysql');
const {promisify} = require('util');

const {database} = require('./keys');

const pool = mysql.createPool(database);

//valido errores de coneccion
pool.getConnection((err, connection)=> {
if(err){
   if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('DATABASE CONNECTION FUE CERRADA'); 
   }

   if(err.code === 'ER_CON_COUNT_ERROR'){
        console.error('DATABASE TIENE MUCHAS CONECCIONES'); 
   }
   
   
   if(err.code === 'ECONNREFUSED'){
    console.error('DATABASE CONNECTION FUE RECHAZADA'); 
    }
}
//Aviso si esta conectado
if(connection) connection.release();
console.log('DB is Connected');
return;
});
//convierto en promesas lo que eran callbacks
pool.query = promisify(pool.query);

module.exports = pool;