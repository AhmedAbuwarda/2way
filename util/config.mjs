export const config = {
    DB_HOST: 'localhost',
    DB_PORT: 3306,
    DB_NAME: '2way',
    DB_USERNAME: 'root',
    DB_PASSWORD: '',

    NODE_ENV: 'development',
    NODE_PORT: 3000,
    NODE_PAGE_SIZE: 15,

    NODE_JWT_KEY: 'topsecret',
    NODE_HASH_KEY: 'thisistopsecret',
    NODE_HASH_KEY_LENGTH: 16,

    NODE_TABLE: `import { DataTypes } from "sequelize";

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
    }`,
    NODE_RESOURCE: `import { sequelize } from '../../util/db-connection.mjs'
    import { table } from '../../models/users.mjs';
    
    export class userService {
        constructor() {
            this.User = sequelize.define(
                'User', table,
                {
                    tableName: 'users',
                    timestamps: true,
                    createdAt: 'created_at',
                    updatedAt: 'updated_at'
                }
            );
        }
    
        // get all users
        async findAll() {
            return await this.User.findAll();
        }
    
        // get user by id
        async findByPk(id) {
            return await this.User.findByPk(id);
        }
    
        // create user
        async create(user) {
            return await this.User.create(user);
        }
    
        // update user
        async update(user) {
            return await this.User.update(user, { where: { id: user.id } });
        }
    
        // destroy user
        async destroy(id) {
            return await this.User.destroy({ where: { id: id } });
        }
    }`
}