import { sequelize } from '../../util/db-connection.mjs'
import { table } from '../../models/messages.mjs';

export class MessageService {
    constructor() {
        this.Message = sequelize.define(
            "Message", table,
            {
                tableName: "messages",
                timestamps: true,
                createdAt: "created_at",
                updatedAt: "updated_at"
            }
        );
    }

    // get all messages
    async findAll(user_id) {
        return await this.Message.findAll(
            {
                where: {
                    user_id: user_id
                }
            }
        );
    }

    // get specific message using id
    async findByPk(id) {
        return await this.Message.findByPk(id);
    }

    // create new message
    async create(message) {
        return await this.Message.create(message);
    }

    // delete message using id
    async destroy(id) {
        return await this.Message.destroy({
            where: {
                id: id
            }
        });
    }
}