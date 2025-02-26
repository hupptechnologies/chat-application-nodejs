import fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const app = fastify({ logger: true });

app.get('/', async () => {
	return { message: 'Hello from Fastify!' };
});

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
