import { config } from 'dotenv'; config();
module.exports = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 3000,
	PG_URL: process.env.PG_URL || 'postgres://postgres:postgres@localhost:5432/db-giatdotietkiem',
};