// import mysql from 'mysql2/promise';

// //! create db if it doesn't already exist
// const connection = await mysql.createConnection({
//     host: 'localhost',
//     port: process.env.DB_PORT,
//     user: 'root',
//     password: 'root'
// });
// await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
// //!

// import { sequelize } from '../util/db-connection.mjs';
import {Sequelize, DataTypes} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.DB_NAME + "56********************");
//* create SQL user table
const sequelize = new Sequelize(
    process.env.DB_NAME, 'root', '',
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);
const queryInterface = sequelize.getQueryInterface();
queryInterface.createTable('Person', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: DataTypes.STRING,
    isBetaMember: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

//* create SQL message table
// CREATE TABLE `message` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `user_id` int(11) NOT NULL,
//     `content` varchar(255) NOT NULL,
//     `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
