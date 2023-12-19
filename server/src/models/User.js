import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js'
import { Task } from './Task.js';

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

User.hasMany(Task,{
    foreignKey: 'userId',
    sourceKey: 'id'
})

Task.belongsTo(User,{
    foreignKey: 'userId',
    targetKey: 'id'
})