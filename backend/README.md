# Backend - Ticket System

This is the backend part of the **Ticket System**, which provides RESTful APIs to manage tickets, users, and related data. The backend is built with **Node.js**, **Express**, and **PostgreSQL**.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side logic.
- **Express.js**: Web framework for Node.js used to build the RESTful APIs.
- **PostgreSQL**: Relational database for storing ticket and user data.
- **Sequelize** (or any ORM you use): For interacting with the PostgreSQL database.
- **dotenv**: For managing environment variables.
- **JWT**: For secure authentication using JSON Web Tokens.
- **Bcrypt**: For password hashing.
- **CORS**: To handle cross-origin resource sharing.

## Setup

Follow these steps to set up and run the backend locally:

### 1. Clone the repository

If you haven't cloned the repository yet, run:

```bash
git clone https://github.com/NaolAdugna/ticket-system.git
cd ticket-system/backend
```

### 2. Install dependencies

Install the necessary dependencies for the backend:

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root of the `backend` folder and define the required environment variables. Example:

```env
DB_HOST=localhost
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=ticket_system
DB_PORT=5432
JWT_SECRET=your-jwt-secret-key
PORT=5000
```

### 4. Run the backend server

To start the backend server, run:

```bash
npm start
```

The backend will be available at `http://localhost:5000` by default.

---

## Folder Structure

The backend follows this folder structure:

```
backend/
  ├── config/                # Database and server configurations
  ├── controllers/           # Controller functions for handling requests
  ├── middlewares/           # Custom middleware functions (e.g., authentication)
  ├── models/                # Sequelize models for database tables
  ├── routes/                # API route definitions
  ├── services/              # Business logic and interaction with models
  ├── utils/                 # Utility functions (e.g., token validation)
  ├── app.js                 # Main app setup (Express server)
  ├── server.js              # Server entry point (starts the Express app)
  ├── .env                   # Environment variables (database credentials, etc.)
```

### 1. `config/`

Contains configuration files, like database connection details.

### 2. `controllers/`

Contains controller functions that handle incoming HTTP requests and responses. Each controller corresponds to an entity in the system (e.g., `TicketController`, `UserController`).

### 3. `middlewares/`

Contains middleware functions, such as those used for authentication (e.g., `verifyToken`).

### 4. `models/`

Contains the Sequelize models that represent tables in the PostgreSQL database. For example, `TicketModel`, `UserModel`, etc.

### 5. `routes/`

Defines the routes for your API, typically for resources like `tickets`, `users`, etc. Routes are mapped to controller functions.

### 6. `services/`

Contains business logic, such as how to create or manage tickets. Services interact with models to query the database.

### 7. `utils/`

Contains utility functions such as JWT token generation, password hashing, and token validation.

### 8. `app.js`

Contains the setup and configuration for the Express server, including middleware, routes, and other server settings.

### 9. `server.js`

The entry point for the application where the Express server is started.

---

## Database Schema

The backend uses a **PostgreSQL** database with the following tables:

- **users**: Stores user data such as name, email, and hashed password.
- **tickets**: Stores information about tickets, including title, description, status, and associated user.
- **ticket_history**: Tracks the status changes and other updates for each ticket.

The **Sequelize ORM** is used to interact with the database.

---

## Running Tests

If tests are set up, you can run them using:

```bash
npm run test
```

This will execute all test files, assuming you have a testing framework like Jest or Mocha configured.

---

## API Endpoints

Here are some example API endpoints for managing tickets:

### Authentication

- **POST** `/api/auth/login`: Login a user and receive a JWT token.

### User Routes

- **GET** `/api/users`: Retrieve all users (admin only).
- **POST** `/api/users`: Create a new user.
- **GET** `/api/users/:id`: Retrieve a single user by ID.
- **PUT** `/api/users/:id`: Update user data.

### Ticket Routes

- **GET** `/api/tickets`: Retrieve all tickets.
- **POST** `/api/tickets`: Create a new ticket.
- **GET** `/api/tickets/:id`: Retrieve a single ticket by ID.
- **PUT** `/api/tickets/:id`: Update a ticket’s information (e.g., status).

---

## Deployment

The backend can be deployed to various platforms such as **Heroku**, **AWS**, or **DigitalOcean**. Here's a quick guide to deploy to **Heroku**:

### **Deploy to Heroku**

1. Install the Heroku CLI and log in.
2. Push the code to Heroku:

   ```bash
   git remote add heroku https://git.heroku.com/your-heroku-app.git
   git push heroku main
   ```

3. Set environment variables on Heroku (using Heroku dashboard or CLI).

---

## Troubleshooting

- **CORS Issues**: If you experience CORS issues, ensure that CORS middleware is configured in `app.js` to allow frontend requests.

- **Database Connection Errors**: Ensure that the database credentials in the `.env` file are correct and the PostgreSQL server is running.

---

## Contributing

To contribute to the backend, follow these steps:

1. Fork the repository and create a new branch from `main`.
2. Implement your changes in the backend (e.g., create new routes, controllers, etc.).
3. Write tests if applicable.
4. Push your changes and create a pull request.

---
