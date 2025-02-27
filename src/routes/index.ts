import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import authRoutes from './auth.route';

const routes = async (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => {
	fastify.register(authRoutes, {
		prefix: '/api/auth',
	});
};

export default routes;
