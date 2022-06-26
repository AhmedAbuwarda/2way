import mysql from 'mysql2/promise';

export const dbConnection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: '2way',
    user: 'root',
    password: ''
});