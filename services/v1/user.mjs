import { sequelize } from '../../util/db-connection.mjs'
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

    // get user by username
    async findByUsername(username) {
        return await this.User.findOne({
            where: {
                username: username
            }
        });
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
}