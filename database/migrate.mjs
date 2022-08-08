import mysql from 'mysql2/promise';
import { config } from '../util/config.mjs';
import { createTable as usersTable } from './migration/users.mjs';
import { createTable as adminsTable } from './migration/admins.mjs';
import { createTable as messagesTable } from './migration/messages.mjs';

//! create db if it doesn't already exist
const connection = await mysql.createConnection({
	host: config.DB_HOST,
	port: config.DB_PORT,
	user: config.DB_USERNAME,
	password: config.DB_PASSWORD
});
await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.DB_NAME}\`;`);
//!

async function createTables() {
	// create user table
	usersTable();
	// create admin table
	adminsTable();
	// create messages table
	messagesTable();
}

//* create SQL all tables
createTables();