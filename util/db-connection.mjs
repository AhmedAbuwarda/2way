import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

// const config = require('config.json');
// const mysql = require('mysql2/promise');
// import { Sequelize } from 'sequelize';

// module.exports = db = {};

// initialize();

// async function initialize() {
//     // create db if it doesn't already exist
//     const connection = await mysql.createConnection({ 
//         host: proccess.env.DB_HOST,
//         port: proccess.env.DB_PORT,
//         user: proccess.env.DB_USERNAME,
//         password: proccess.env.DB_PASSWORD 
//     });
//     await connection.query(`CREATE DATABASE IF NOT EXISTS \`${proccess.env.DB_NAME}\`;`);

//     // connect to db
//     const sequelize = new Sequelize(proccess.env.DB_NAME, proccess.env.DB_USERNAME, proccess.env.DB_PASSWORD , { dialect: 'mysql' });

//     // init models and add them to the exported db object
//     db.User = require('../services/v1/user.mjs')(sequelize);

//     // sync all models with database
//     await sequelize.sync();
// }