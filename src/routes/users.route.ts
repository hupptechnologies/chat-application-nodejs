import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import userController from "../controller/user.controller";
import { verifyToken } from "../utils";

const usersRoutes = async (fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>) => {
	fastify.route({
		method: 'GET',
		url: '/list',
		preHandler: verifyToken,
		handler: userController.usersList
	});
};

export default usersRoutes;
