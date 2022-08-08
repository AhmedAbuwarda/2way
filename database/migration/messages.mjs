import { DataTypes } from "sequelize";
import { sequelize } from '../../util/db-connection.mjs'

export async function createTable() {
	// define users table
	const queryInterface = sequelize.getQueryInterface();
	await queryInterface.createTable('messages', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true
		},
		user_id: {
            type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
        },
        content: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '',
			validate: {
				len: [1, 255],
				msg: 'Message must be between 1 and 255 characters'
			}
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