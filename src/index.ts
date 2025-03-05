import fastify from 'fastify';
import cors from '@fastify/cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import routes from './routes';
import ChatMessageController from './controller/chatMessage.controller';

dotenv.config();

const app = fastify({ logger: true });

app.register(cors, {
	origin: '*',
	exposedHeaders: 'token',
});

app.get('/', async () => {
	return { message: 'Hello from Fastify!' };
});

const io = new Server(app.server, {
	cors: {
		origin: '*', // Adjust based on your frontend URL
	},
});
new ChatMessageController(io);

app.register(routes);

// Define the port
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Start the server using Fastify's listen method
const start = async () => {
	try {
		app.listen({ port }, (err) => {
			if (err) {
				process.exit(1);
			}
		});
	} catch (err) {
		err;
		process.exit(1);
	}
};

start();
