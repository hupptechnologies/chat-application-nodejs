import { FastifyReply } from "fastify";

interface ResponseModel {
	success?: boolean;
	status: number;
	error?: string;
	data?: any;
	message?: string;
	token?: string;
}

export class Response {
	static send (res: FastifyReply, response: ResponseModel) {
		res
			.code(response.status)
			.send(response);
	}
}

export const statusCodes = {
	SUCCESS: 200,
	INTERNAL_SERVER_ERR: 500,
	BAD_REQUEST: 400,
	FORBIDDEN: 403,
	UNAUTHORIZED: 401,
};

export const message = {
	SIGNUP_SUCCESS: 'User created successfully',
	LOGIN_SUCCESS: 'User loggedIn successfully.',
	LOGIN_INVALID: 'Invalid username or password',
	UNAUTHORIZED: 'Unauthorized',
	EMAIL_USED: 'Email already exist',
	SIGNUP_INVALID: 'Invalid email, username or password',
	MISSING_FIELD: 'Missing email or password field',
	ADMIN_LIST_SUCCESS: 'Admin user list fetch successfully',
};