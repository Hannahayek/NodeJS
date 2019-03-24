const mysql=require('mysql2');
const pool=mysql.createPool({
   host:'localhost',
   user:'root',
   database:'nodejs',
   password:'Hk@password'
});

module.exports=pool.promise();