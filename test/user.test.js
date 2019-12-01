import { describe } from 'ava-spec';
import request from 'supertest';
import { isEmpty } from '../src/utils';
const app = require('../src/app');
const URI = '/users';
describe.serial('User API:', it => {
	it('user login successfull', async t => {
		const user = {
			'phone': '0334963339',
			'password': '123456789'
		};
		const response = await request(app)
			.post(`${URI}/login`)
			.send(user)
			.expect(200)
			.then(res => res.body);
		t.is(response.status, true);
		t.is(response.data.phone, user.phone);
		t.is(isEmpty(response.data.accessToken), false);
		t.is(isEmpty(response.data.refreshToken), false);
	});

	it('user login faild because wrong phone number', async t => {
		const user = {
			'phone': '033496333943',
			'password': '123456789'
		};
		const response = await request(app)
			.post(`${URI}/login`)
			.send(user)
			.expect(401)
			.then(res => res.body);
		t.is(response.status, false);
		t.is(response.errors.name, 'AuthenticationError');
		t.is(response.errors.message, 'Oops! Wrong phone number');
		t.is(response.data, null);
	});

	it('user login faild because wrong password', async t => {
		const user = {
			'phone': '0334963339',
			'password': '1234567890'
		};
		const response = await request(app)
			.post(`${URI}/login`)
			.send(user)
			.expect(401)
			.then(res => res.body);
		t.is(response.status, false);
		t.is(response.errors.name, 'AuthenticationError');
		t.is(response.errors.message, 'Oops! Wrong password');
		t.is(response.data, null);
	});

});
