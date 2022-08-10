import fs from 'fs/promises';
import path from 'path';

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
        process.exit(1);
    }
    // read all files from models folder
    const models = await fs.readdir(path.join(__dirname, '../../models'));
    // add .mjs extension to name of table
    name = `${name}.mjs`;
    // table column names and types
    const table = `import { DataTypes } from "sequelize";

export const table = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}`;

    // check if file with name of table already exists
    const fileExists = models.some((model) => model === name);
    // if file with name of table doesn't exist then create file with name of table
    if (!fileExists) {
        await fs.writeFile(path.join(__dirname, `../../models/${name}`), table);
        console.log(`Model: ${name} created successfully`);
    } else {
        console.log('File already exists');
    }
}