require('dotenv').config();
const mysql=require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.db_password,
    database: 'employeeDB'
    },
    console.log('connected to the employeeDB datatbase.\n\n')
);

module.exports=db;