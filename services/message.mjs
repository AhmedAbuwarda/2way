import { DataTypes } from 'sequelize';
import { sequelize } from '../util/db-connection.mjs'

export class MessageService {
    constructor() {
        this.Message = sequelize.define("Message", 
        {
            content: DataTypes.INTEGER
        },
        {
            tableName: "messages",
            timestamps: false
        });
    }

    // get all messages
    async getAll() {
        return await this.Message.findAll();
    }

    // get specific message using id
    async getById(id) {
        return await this.Message.findByPk(id);
    }
}