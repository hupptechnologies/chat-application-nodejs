import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { Optional } from 'sequelize';
import { Response, statusCodes, message } from './index';

const secretKey: any = process.env.JWT_SECRET_KEY || 'test';

declare module 'fastify' {
	export interface FastifyRequest {
		user: any;
	}
}
export interface ITokenDetail {
	id: number;
	email: string;
}
export type TTokenDetail = Optional<ITokenDetail, 'id' | 'email'>;

export const generateResponseTokens = (detail: TTokenDetail) =>
	new Promise((resolve, reject) => {
		try {
			const token: string = jwt.sign(detail, secretKey, {
				expiresIn: '1d',
			});
			resolve(token);
		} catch (error: any) {
			reject(error);
		}
	});

export const generateEncryptedPassword = async (password: any) =>
	await bcrypt.hash(password, 10);

export const comparePassWord = async (password: string, encryptPass: string) =>
	bcrypt.compare(password, encryptPass);

export const verifyToken = (
	req: FastifyRequest,
	res: FastifyReply,
	done: HookHandlerDoneFunction,
) => {
	const token: any = req.headers['token'];
	jwt.verify(token, secretKey, (err: any, decoded: any) => {
		if (err) {
			return Response.send(res, {
				status: statusCodes.UNAUTHORIZED,
				message: message.UNAUTHORIZED,
			});
		}
		req.user = decoded;
	});

	done();
};
