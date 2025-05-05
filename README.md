# Chat Application Node.js

A real-time chat application built with Node.js using Fastify, Sequelize, PostgreSQL, and TypeScript. This application provides a robust backend for handling real-time messaging with features like user authentication, message persistence, and WebSocket communication.

## Features

- **Fastify**: A fast and low-overhead web framework for Node.js
- **Sequelize**: An ORM for Node.js that supports PostgreSQL
- **TypeScript**: Provides static typing for improved code quality and maintainability
- **PostgreSQL**: A powerful, open source object-relational database system
- **Socket.IO**: Real-time bidirectional event-based communication
- **JWT Authentication**: Secure user authentication and authorization
- **Environment Configuration**: Flexible configuration using dotenv
- **ESLint & Prettier**: Code quality and formatting tools

### Implemented Features

- User Authentication (Login/Signup)
- Real-time Chat Messaging
- Message Status Tracking (Sent/Delivered/Read)
- User Online/Offline Status
- Unread Message Count
- User List Sorting by Last Message
- Message Read/Delivered Status Updates
- Local IP Address Support for Development

## Prerequisites

- **Node.js**: v14 or later
- **npm**: Comes with Node.js
- **PostgreSQL**: Installed and running

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/hupptechnologies/chat-application-nodejs.git
cd chat-application-nodejs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
HOST=localhost

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=chat_app
DB_USER=your_username
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
```

### 4. Database Setup

1. Create a PostgreSQL database named `chat_app`
2. Run the migrations:

```bash
npm run migrate
```

To undo all migrations:
```bash
npm run migrate:undo
```

### 5. Running the Application

Development mode:
```bash
npm run dev
```

### Available Scripts

- `npm run dev`: Start the development server with hot-reload
- `npm run lint`: Run ESLint to check code quality
- `npm run lint:fix`: Fix ESLint issues automatically
- `npm run create:migrate`: Create a new migration file
- `npm run migrate`: Run all pending migrations
- `npm run migrate:undo`: Undo all migrations
- `npm run migrate:undo:one`: Undo the last migration

## Project Structure

```
src/
├── config/         # Configuration files
├── controller/     # Route controllers
├── interface/      # TypeScript interfaces
├── migrations/     # Database migrations
├── models/         # Sequelize models
├── routes/         # API routes
├── utils/          # Utility functions
└── index.ts        # Application entry point
```

## API Documentation

The API documentation will be available at `http://localhost:3000/documentation` when the server is running.

## Changelog

### Latest Updates
- Message read, delivered, and send flow improvements
- Server now runs on local IP address for better development experience
- User list sorting based on last message sent
- User online/offline status implementation
- Unread message count tracking
- Message status tracking (delivered/read)
- Chat message model and Socket.IO integration
- User listing APIs with authentication
- Database connection and migration setup
- Initial project setup with Fastify and TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.