import cls from 'continuation-local-storage';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import env from '../../enviroments';

const namespace = cls.createNamespace('auth-service-iambee');
const logging = env.nodeEnv === 'development' ? console.log : false; // eslint-disable-line
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

Sequelize.Validator.extend('isPositive', (val) => val >= 0);

// create sequelize instance with continuation local storage
Sequelize.useCLS(namespace);
const sequelize = new Sequelize(env.PG_URL, {
	logging,
	define: {
		hooks: {
			beforeCreate: () => {

			}
		}
	}
});


const db = fs
	.readdirSync(__dirname)
	.filter(filename => /model.js$/.test(filename))
	.reduce((total, filename) => {
		const model = sequelize.import(path.resolve(__dirname, filename));
		total[capitalize(model.name)] = model;
		return total;
	}, {});

/**
 * Sets up the associations for each model.
 * @param  {string} modelName
 */
Object.keys(db).forEach(modelName => {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

const total = {
	namespace,
	sequelize,
	Sequelize,
	...db
};

export default total;
