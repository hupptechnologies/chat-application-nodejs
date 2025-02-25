require('dotenv')
	.config({
		path: '.env'
	});

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
	host: config.host,
	database: config.database,
	dialect: config.dialect,
	username: config.username,
	password: config.password,
	port: config.port,
	repositoryMode: true,
	models: [__dirname + '/*.model.*'],
	dialectOptions: config.dialectOptions
});

export const models = sequelize.models;

export default sequelize;

