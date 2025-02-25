import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import AuthController  from "../controller/auth.controller";
import { verifyToken } from "../utils";

const authRoutes = async (fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>) => {


	fastify.route({
		method: 'POST',
		url: '/signup',
		handler: AuthController.signup
	});

	fastify.route({
		method: 'POST',
		url: '/login',
		handler: AuthController.login
	});
	fastify.route({
		method: 'GET',
		url: '/me',
		preHandler: verifyToken,
		handler: AuthController.me
	})
};


export default authRoutes;
