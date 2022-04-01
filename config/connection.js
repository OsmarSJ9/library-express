const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "develotecaexpress"
});

connection.connect((err)=>{
    if(!err){
        console.log('Successful connect');
    }else{
        console.log('Failed to connect');
    }
});

module.exports = connection;
