import mysql from 'mysql2';

export const db = mysql.createConnection({
    host           : "localhost", 
    user           : "root",
    password       : "Hansaname21#",
    database       : "blog",
})