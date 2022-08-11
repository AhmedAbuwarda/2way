import fs from 'fs/promises';
import path from 'path';
import { config } from '../../util/config.mjs';

const __filename = new URL(import.meta.url).pathname;
const __dirname = __filename.substring(1, __filename.lastIndexOf('/'));

for (let i = 2; i < process.argv.length; i++) {

    // take name of table as argument from command line then create file with name of table
    let name = process.argv[i].toLocaleLowerCase() || undefined;
    // check if name is undefined
    if (!name) {
        console.log('<table-name> of the table is missing');
        process.exit(1);
    }
    // check if name is string and not contain any special character
    if (typeof name !== 'string' || name.match(/[^a-z0-9_]/)) {
        console.log('Invalid table name');
        // process.exit(1);
        continue;
    }
    // read all files from models folder
    const models = await fs.readdir(path.join(__dirname, '../../models'));
    // table column names and types
    const table = config.NODE_TABLE;
    // service name
    let resource = config.NODE_RESOURCE;
    // replace table name in resource
    resource = resource.replace(/User/g, name.charAt(0).toUpperCase() + name.slice(1)).replace(/user/g, name);
    // add .mjs extension to name of table
    name = `${name}.mjs`;
    // check if file with name of table already exists
    const fileExists = models.some((model) => model === name);
    // if file with name of table doesn't exist then create file with name of table
    if (!fileExists) {
        // write model file
        await fs.writeFile(path.join(__dirname, `../../models/${name}`), table);
        console.log(`Model: ${name} created successfully`);
        // write service file
        await fs.writeFile(path.join(__dirname, `../../services/v1/${name}`), resource);
        console.log(`Service: ${name} created successfully`);
    } else {
        console.log('File already exists');
    }
}