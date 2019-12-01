import joi from 'joi';
import {
	ApplicationError,
	BusinessError,
	APINotFoundError,
	RequestParamValidationError,
	RequestQueryValidationError,
	RequestBodyValidationError
} from './errors';

export function errorMiddleware(err, req, res, next) { // eslint-disable-line
	const { body, headers, url, method } = req;
	const objectData = {
		message: err.message,
		request: {
			url,
			headers,
			method,
			body
		},
		user: res.locals.user,
		stack: err.stack
	};
	let formatedError = null;
	if(err instanceof BusinessError){
		formatedError = err;
		req.app.locals.logger.error({
			...objectData
		});
	}else if(err instanceof Error){
		formatedError = new ApplicationError();
		req.app.locals.logger.error({
			...objectData
		});
	}
	const { message, status, name} = formatedError;
	return res.status(status).json({
		errors: {
			name,
			message,
		},
		data: null,
		status: false
	});
}

export function apiNotFound(req, res) {
	const formatedError = new APINotFoundError();
	const { url , headers, method, body } = req;
	const { user } = res.locals;
	const objectData = {
		message: formatedError.message,
		request: {
			url,
			headers,
			method,
			body
		},
		user
	};
	req.app.locals.logger.error({
		...objectData
	});
	const { status, name, message } = formatedError;
	res.status(status).send({
		name,
		request: {
			url,
			method,
			body
		},
		message
	});
}

export function validateRequest({ paramSchema = {}, querySchema = {}, bodySchema = {} }) {
	const validateOptions = { allowUnknown: true, abortEarly: false };
	return function(req, res, next) {
		return joi.validate(req.params, paramSchema, validateOptions)
			.catch( error => next(new RequestParamValidationError(error)))
			.then( () => joi.validate(req.query, querySchema, validateOptions)
				.catch( error => next(new RequestQueryValidationError(error)))
			).then( () => joi.validate(req.body, bodySchema, validateOptions)
				.catch( error => next(new RequestBodyValidationError(error)))
			).then( () => next());
	};
}

// export function responseMiddleware(req, res){
// 	res.send({
// 		success: true,
// 		data
// 	});
// }