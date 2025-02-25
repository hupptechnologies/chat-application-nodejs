import fastify from 'fastify';
import dotenv from "dotenv";

dotenv.config();

const app = fastify({ logger: true });

app.get('/', async (request, reply) => {
  return { message: 'Hello from Fastify!' };
});

// Define the port
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Start the server using Fastify's listen method
const start = async () => {
  try {
    console.log("Database connected!");

    app.listen({ port }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server running on ${address}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
