import fastify from 'fastify';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = fastify({ logger: true });

app.get('/', async () => {
	return { message: 'Hello from Fastify!' };
});

const io = new Server(app.server, {
	cors: {
		origin: '*', // Adjust based on your frontend URL
	},
});

io.on('connection', (socket) => {
	app.log.info('A user connected:', socket.id);

	// Listen for a "chat-message" event from clients.
	socket.on('chat-message', (msg: string) => {
		app.log.info(`Received message: ${msg} from ${socket.id}`);

		// Broadcast the message to all connected clients.
		io.emit('chat-message', msg);
	});

	// Listen for disconnections.
	socket.on('disconnect', () => {
		app.log.info('User disconnected:', socket.id);
	});
});

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
