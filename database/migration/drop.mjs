import fs from 'fs/promises';
import path from 'path';

const { sequelize } = await import('../../util/db-connection.mjs');

const __filename = new URL(import.meta.url).pathname;
const __dirname = __filename.substring(1, __filename.lastIndexOf('/'));

for (let i = 2; i < process.argv.length; i++) {

	// take name of table as argument from command line then delete file with name of table
	let name = process.argv[i].toLocaleLowerCase() || undefined;
	// check if name is undefined
	if (!name) {
		console.log('<table-name> of the table is missing');
		process.exit(1);
	}
	// check if name is string and not contain any special character
	if (typeof name !== 'string' || name.match(/[^a-z0-9_]/)) {
		console.log('Invalid table name');
		process.exit(1);
	}
	// read all files from models folder
	const models = await fs.readdir(path.join(__dirname, '../../models'));
	// add .mjs extension to name of table
	name = `${name}.mjs`;
	// check if file with name of table already exists
	const fileExists = models.some((model) => model === name);
	// if file with name of table exists then delete file with name of table
	if (fileExists) {
		// delete model file
		await fs.unlink(path.join(__dirname, `../../models/${name}`));
		console.log(`Model: ${name} deleted successfully`);
		// delete service file
		await fs.unlink(path.join(__dirname, `../../services/v1/${name}`));
		console.log(`Service: ${name} deleted successfully`);
		// delete file with name of table from my sql database
		name = name.substring(0, name.lastIndexOf('.'));
		await sequelize.query(`DROP TABLE IF EXISTS ${name}`);
		console.log(`Table: ${name} deleted successfully`);
	} else {
		console.log('File doesn\'t exists');
	}
}