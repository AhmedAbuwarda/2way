import { DataTypes } from "sequelize";
import { sequelize } from '../../util/db-connection.mjs'

export async function createTable() {
	// define users table
	const queryInterface = sequelize.getQueryInterface();
	await queryInterface.createTable('Users', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true
		},
		username: {
			type: DataTypes.STRING,
			defaultValue: '',
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: true,
				length: {
					min: 1,
					max: 25,
					msg: 'Username must be between 1 and 25 characters',
				}
			}
		},
		email: {
			type: DataTypes.STRING,
			defaultValue: '',
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
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
	});
}