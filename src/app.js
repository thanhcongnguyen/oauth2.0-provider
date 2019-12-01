import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import Sequelize from 'sequelize';
import errorhandler from 'errorhandler';
import routes from './routes';
import logger from './services/logger';
import { syncDB, migrateDB } from './db-helpers';
import env from '../enviroments';

const app = express();

if (env.NODE_ENV === 'development'){
	syncDB({ force: true });
}else if(env.NODE_ENV === 'production'){
	migrateDB()
		.catch(Sequelize.DatabaseError, () => syncDB());
}

app.locals.logger = logger;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/', routes);
app.use(errorhandler());



module.exports = app;
