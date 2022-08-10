import mysql from 'mysql2/promise';
import { sequelize } from '../util/db-connection.mjs';
import fs from 'fs/promises';
import path from 'path';

import { config } from '../util/config.mjs';

const __filename = new URL(import.meta.url).pathname;
const __dirname = __filename.substring(1, __filename.lastIndexOf('/'));

//! create db if it doesn't already exist
const connection = await mysql.createConnection({
	host: config.DB_HOST,
	port: config.DB_PORT,
	user: config.DB_USERNAME,
	password: config.DB_PASSWORD
});
await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.DB_NAME}\`;`);
//!

// read all files from 2way/models folder
const models = await fs.readdir(path.join(__dirname, '../models'));

let x = 1;
await models.forEach(async (model) => {
	if (model.endsWith('.mjs')) {
		let { table } = await import(`../models/${model}`);
		// create table if it doesn't already exist
		let queryInterface = sequelize.getQueryInterface();
		await queryInterface.createTable(model.split('.')[0], table);
		x += 1;
	}
	// exit process successfully
	if (x == models.length) {
		process.exit(0);
	}
});