# 🛠️ Ticket Management System

This is a Ticket Management System built with **React**, **Redux**, and **Node.js**. The system allows users to manage support tickets, view ticket summaries, and search/filter tickets. It also includes basic authentication (login/logout) functionality.

## **Table of Contents**

- [📜 Overview](#overview)
- [⚙️ Features](#features)
- [🛠️ Technologies Used](#technologies-used)
- [⚡ Installation Instructions](#installation-instructions)
- [📁 Folder Structure](#folder-structure)
- [📡 API Endpoints](#api-endpoints)
- [🤝 Contributing](#contributing)
- [📄 License](#license)

## **📜 Overview**

The **Ticket Management System** allows users to:

- View a dashboard with total ticket counts (open and closed).
- Search and filter tickets by title.
- View detailed ticket information (title, description, status).
- Login and logout from the application.

## **⚙️ Features**

- **📊 Dashboard**: Displays a summary of tickets with counts of open and closed tickets.
- **🔍 Search Tickets**: Allows users to search tickets by their titles.
- **📋 Ticket Table**: Displays all tickets in a tabular format, showing their title, description, and status.
- **🔑 Authentication**: Login and logout functionality. Users can authenticate using their credentials.
- **🔄 State Management**: Uses **Redux** for state management of tickets and user authentication.
- **📱 Responsive UI**: The application is designed to be responsive, meaning it works well on both desktop and mobile devices.
- **🔄 Search and Filter**: Users can filter tickets by their title using a search bar.

## **🛠️ Technologies Used**

- **Frontend**:
  - React.js ⚛️
  - Redux Toolkit 📦 (for state management)
  - Axios 🌐 (for API calls)
  - Tailwind CSS 🎨 (for styling)
- **Backend**:
  - Node.js 🟩 (for the backend)
  - Express.js 🌐 (for API routes)
  - MongoDB 🗄️ (for storing tickets and user data)
- **Authentication**:
  - JSON Web Tokens (JWT) 🔒 for secure login and token management
  - Redux for managing authentication state
  - Local Storage for storing JWT tokens

## **⚡ Installation Instructions**

### Prerequisites

Make sure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm** or **yarn**

### Clone the repository

```bash
git clone https://github.com/NaolAdugna/ticket-system.git
cd ticket-system
```

### Install dependencies

For both **frontend** and **backend**, you'll need to install the dependencies:

1. **Frontend**:

   ```bash
   cd frontend
   npm install
   # or
   yarn install
   ```

2. **Backend**:
   ```bash
   cd backend
   npm install
   # or
   yarn install
   ```

### Set up the environment variables

Create a `.env` file in the root directory of the backend and frontend and add the following:

- For the **backend**:

  ```
  PORT=5000
  MONGO_URI=<your-mongodb-uri>
  JWT_SECRET=<your-jwt-secret>
  ```

- For the **frontend**:
  ```
  REACT_APP_API_URL=http://localhost:5000/api  # Your backend API URL
  ```

### Running the Application

1. **Start the backend server**:

   ```bash
   cd backend
   npm start
   # or
   yarn start
   ```

2. **Start the frontend development server**:
   ```bash
   cd frontend
   npm start
   # or
   yarn start
   ```

Now, open your browser and navigate to `http://localhost:3000` to view the Ticket Management System.

## **📁 Folder Structure**

```plaintext
ticket-system/
├── backend/                    # Backend API server
│   ├── controllers/             # API route controllers
│   ├── models/                  # Database models (MongoDB)
│   ├── routes/                  # Express routes
│   ├── server.js                # Main backend entry point
│   ├── .env                     # Environment variables
├── frontend/                    # React frontend
│   ├── components/              # Reusable UI components
│   ├── redux/                   # Redux slices and store
│   ├── pages/                   # Page components (Dashboard, Login)
│   ├── utils/                   # Utility functions and API calls (e.g., Axios config)
│   ├── App.js                   # Main frontend entry point
│   ├── index.js                 # App initialization and routing
└── .gitignore                   # Git ignore file
```

## **📡 API Endpoints**

| Endpoint       | Method | Description                                       |
| -------------- | ------ | ------------------------------------------------- |
| `/auth/login`  | POST   | Authenticate user and return a JWT token          |
| `/auth/logout` | POST   | Log out user (remove JWT token from localStorage) |
| `/tickets`     | GET    | Retrieve all tickets                              |
| `/tickets/:id` | GET    | Retrieve a specific ticket by ID                  |
| `/tickets`     | POST   | Create a new ticket                               |
| `/tickets/:id` | PUT    | Update a ticket by ID                             |
| `/tickets/:id` | DELETE | Delete a ticket by ID                             |

## **🤝 Contributing**

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## **📄 License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### **Project Description**

This **Ticket Management System** is designed to help businesses or organizations manage their support tickets efficiently. It includes a dashboard where administrators can monitor the total number of tickets, the number of open tickets, and the number of closed tickets. The system also allows users to search for tickets by their titles, making it easier to find specific tickets. With authentication integrated, only authorized users can access the system.

The backend is built using **Node.js** and **Express.js**, while the frontend leverages **React.js** with **Redux** for managing state, ensuring a smooth user experience. The UI is designed to be responsive using **Tailwind CSS**, providing a modern and user-friendly interface across various devices.

---

You can use this structure and make further customizations to match the specifics of your ticket system. This version incorporates **icons** to make the README more visually appealing, and it also reflects the updated repo structure with the `frontend` and `backend` folders.
