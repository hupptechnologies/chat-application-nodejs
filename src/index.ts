import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import { Server } from "socket.io";
import Routes from "./routes";
import ChatMessageController from "./controller/chatMessage.controller";

dotenv.config();

// Initialize Fastify
const app = Fastify();

// Register CORS with Fastify
app.register(cors, {
  origin: "*",
  exposedHeaders: "token",
});

// Register Fastify routes
app.register(Routes);

// Initialize Socket.IO with Fastify's built-in HTTP server
const io = new Server(app.server, {
  cors: {
    origin: "*", // Adjust based on your frontend URL
  },
});

// Socket.IO logic
new ChatMessageController(io);

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
