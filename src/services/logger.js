import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import * as configs from '../configs';

const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.splat(),
		format.timestamp(),
		format.json(),
	),
	transports: [
		new (transports.DailyRotateFile)({
			filename: configs.logger.fileName,
			datePattern: configs.logger.datePattern,
			zippedArchive: configs.logger.zippedArchive,
			maxSize: configs.logger.maxSize,
			maxFiles: configs.logger.maxFiles,
		}),
	],
});

if (configs.nodeEnv === 'development') {
	logger.add(new transports.Console({ format: format.simple() }));
}


export default logger;
