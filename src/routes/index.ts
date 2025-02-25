import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import authRoutes from './auth.route';
import usersRoutes from './users.route';

const routes = async (fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>) => {
	console.log('routes');
	fastify.register(authRoutes, {
		prefix: '/api/auth'
	});
	fastify.register(usersRoutes, {
		prefix: '/api/users'
	})
};

export default routes;
