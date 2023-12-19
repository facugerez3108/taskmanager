import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('postgres://postgres:cardiacos@localhost:5432/taskmanager?=public')