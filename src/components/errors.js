export class ApplicationError extends Error {
	constructor(message = 'Internal Service Error'){
		super(message);
		this.name = this.constructor.name;
		this.status = 500;
		Error.captureStackTrace(this, ApplicationError);
	}
}

export class BusinessError extends ApplicationError {
	constructor(message = 'There is business error happened'){
		super(message);
		this.name = this.constructor.name;
		this.status = 400;
	}
}

export class ResourceNotFoundError extends BusinessError {
	constructor(entityType = 'entity'){
		super();
		this.name = this.constructor.name;
		this.status = 404;
		this.message = `Could not find ${entityType}`;
	}
}

export class AuthenticationError extends BusinessError {
	constructor(message = '') {
		super(message);
		this.name = this.constructor.name;
		this.status = 401;
	}
}

export class AuthorizationError extends BusinessError {
	constructor(error) {
		super(error.message);
		this.name = this.constructor.name;
		this.status = 403;
	}
}

export class ValidationError extends BusinessError {
	constructor(error) {
		super(error.message);
		this.name = this.constructor.name;
		this.status = 400;
	}
}

export class RequestValidationError extends BusinessError {
	constructor(error) {
		super(error.message);
		this.name =  this.constructor.name;
		this.status = 400;
	}
}

export class RequestParamValidationError extends RequestValidationError {
	constructor() {
		super();
		this.name = this.constructor.name;
	}
}

export class RequestQueryValidationError extends RequestValidationError {
	constructor() {
		super();
		this.name = this.constructor.name;
	}
}

export class RequestBodyValidationError extends RequestValidationError {
	constructor() {
		super();
		this.name = this.constructor.name;
	}
}

export class APINotFoundError extends BusinessError {
	constructor(message = 'Api not found') {
		super(message);
		this.name = this.constructor.name;
		this.status = 404;
	}

}