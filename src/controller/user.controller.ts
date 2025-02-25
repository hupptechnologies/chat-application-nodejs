import { FastifyRequest, FastifyReply } from 'fastify';
import { message, statusCodes, Response } from '../utils';
import { models } from '../models';

const { Users } = models;

class UsersController {

	async usersList (req: FastifyRequest, res: FastifyReply) {
		try {
			const where: any = {
				isDeleted: false,
			};

			const {
				count,
				rows
			} = await Users.findAndCountAll({
				where,
				attributes: {
					exclude: [
						'isDeleted',
						'password'
					]
				},
			});

			return Response.send(res, {
				data: {
					results: rows,
					totalCount: count
				},
				status: statusCodes.SUCCESS,
				success: true,
				message: message.ADMIN_LIST_SUCCESS
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message
			});
		}
	}
}

export default new UsersController();

