import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    "2way", "root", "",
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);