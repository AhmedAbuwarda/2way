import { DataTypes } from 'sequelize';
import { sequelize } from '../../util/db-connection.mjs'

export class MessageService {
    constructor() {
        this.Message = sequelize.define("Message", 
        {
            content: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    length: {
                        min: 1,
                        max: 255,
                        msg: 'Content must be between 1 and 255 characters',
                    }
                },
                defaultValue: ''
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    length: {
                        min: 1,
                        max: 11,
                    }
                },
                references: {
                    model: 'User',  
                    key: 'id'
                },
                defaultValue: null,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        },
        {
            tableName: "messages",
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        });
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

    // update message using id
    async update(id, message) {
        return await this.Message.update(message, {
            where: {
                id: id
            }
        });
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