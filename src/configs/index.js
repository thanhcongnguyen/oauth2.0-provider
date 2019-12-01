const logger = {
	fileName: 'logs/error-%DATE%.log',
	datePattern: 'YYYY-MM-DD-HH',
	zippedArchive: true,
	maxSize: '5m',
	maxFiles: '30d'
};

const expire = (params) => {
	return Date.now() + 1000*60*60*24*params;
};

const accessTokenData = {
	iss: 'iambee.vn',
	sub: 'accessToken',
	aud: 'user',
	iat: Date.now(),
	exp: expire(2),
};

const refreshTokenData = {
	iss: 'iambee.vn',
	sub: 'refreshToken',
	aud: 'user',
	iat: Date.now(),
	exp: expire(3),
};

export {
	logger,
	accessTokenData,
	refreshTokenData
};