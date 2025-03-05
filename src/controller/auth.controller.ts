import { FastifyRequest, FastifyReply } from 'fastify';
import { models } from '../models';
import {
	generateEncryptedPassword,
	generateResponseTokens,
	comparePassWord,
	message,
	statusCodes,
	Response,
} from '../utils';
import { UserInstance, UserAttributes } from '../interface';

const { Users } = models;

class AuthController {
	async signup(req: FastifyRequest, res: FastifyReply) {
		try {
			const userInfo = req.body as Partial<UserAttributes>;

			if (!userInfo.email || !userInfo.password || !userInfo.userName) {
				return Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.SIGNUP_INVALID,
				});
			}

			const existingUser = await Users.findOne<UserInstance>({
				where: {
					email: userInfo.email,
					isDeleted: false,
				},
			});
			if (existingUser) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.EMAIL_USED,
				});
				return;
			}

			userInfo.password = await generateEncryptedPassword(userInfo.password);
			const createUser = await Users.create(userInfo);
			delete createUser.dataValues.password;

			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.SIGNUP_SUCCESS,
				data: createUser,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}

	async login(req: FastifyRequest, res: FastifyReply) {
		try {
			const body = req.body as UserAttributes;
			if (!body.email || !body.password) {
				return Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.MISSING_FIELD,
				});
			}
			const existingUser = await Users.findOne<UserInstance>({
				where: {
					email: body.email,
					isDeleted: false,
				},
			});
			if (!existingUser) {
				return Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.LOGIN_INVALID,
				});
			}

			const isMatched = await comparePassWord(
				body.password,
				existingUser.dataValues.password || '',
			);

			if (!isMatched) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.LOGIN_INVALID,
				});
				return;
			}

			const token = await generateResponseTokens({
				id: existingUser.dataValues.id,
				email: existingUser.dataValues.email,
			});

			res.header('token', token);

			delete existingUser.dataValues.password;

			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.LOGIN_SUCCESS,
				data: { user: { ...existingUser.dataValues }, token },
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}
	async me(req: FastifyRequest, res: FastifyReply) {
		try {
			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.LOGIN_SUCCESS,
				data: req.user,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}
}

export default new AuthController();
