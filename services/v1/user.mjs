import sequelize from 'sequelize';

export class userService {
    constructor() {
        this.User = sequelize.define(
            'User',
            {
                id: {
                    type: sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                    unique: true
                },
                username: {
                    type: sequelize.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        notEmpty: true,
                        length: {
                            min: 3,
                            max: 255,
                            msg: 'Username must be between 3 and 255 characters',
                        }, // end length
                    },
                    defaultValue: ''
                }, 
                password: {
                    type: sequelize.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: true,
                        length: {
                            min: 8,
                            max: 255,
                            msg: 'Password must be between 8 and 255 characters',
                        },
                    },
                    defaultValue: ''
                }
            },
            {
                tableName: 'users',
                timestamps: true,
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        );
    }
}