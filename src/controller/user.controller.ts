import { FastifyRequest, FastifyReply } from 'fastify';
import { Op } from 'sequelize';
import { message, statusCodes, Response } from '../utils';
import { models } from '../models';
import { TQuery } from '../interface';

const { Users } = models;

class UsersController {
	async usersList(req: FastifyRequest, res: FastifyReply) {
		const { search } = req.query as TQuery;

		try {
			const where: any = {
				isDeleted: false,
			};

			if (search) {
				where[Op.or] = [
					{
						name: {
							[Op.iLike]: `%${search}%`,
						},
					},
					{
						email: {
							[Op.iLike]: `%${search}%`,
						},
					},
				];
			}

			const { count, rows } = await Users.findAndCountAll({
				where,
				attributes: {
					exclude: ['isDeleted', 'password'],
				},
			});

			return Response.send(res, {
				data: {
					results: rows,
					totalCount: count,
				},
				status: statusCodes.SUCCESS,
				success: true,
				message: message.USER_LIST_SUCCESS,
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

export default new UsersController();
