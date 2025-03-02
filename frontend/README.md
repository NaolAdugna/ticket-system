# Frontend - Ticket System

This is the frontend part of the **Ticket System**, built with **React** and other modern front-end technologies. The frontend allows users to interact with the backend API to create, manage, and track tickets.

## Technologies Used

- **React.js**: JavaScript library for building the user interface.
- **React Router**: For client-side routing between pages.
- **Axios**: For making HTTP requests to the backend API.
- **TailwindCSS**: For styling the components with a utility-first approach.
- **Redux** (if applicable): For state management (if you are using Redux).
- **React Hook Form**: For easy and controlled form handling.
- **Shadcn UI** (if applicable): For advanced UI components like skeleton loaders and dynamic elements.

## Setup

Follow these steps to set up and run the frontend locally:

### 1. Clone the repository

If you haven't cloned the repository yet, run:

```bash
git clone https://github.com/NaolAdugna/ticket-system.git
cd ticket-system/frontend
```

### 2. Install dependencies

Install the necessary dependencies for the frontend:

```bash
npm install
```

### 3. Start the development server

Run the following command to start the frontend application:

```bash
npm start
```

The app will be available at `http://localhost:3000` by default.

## Folder Structure

The frontend follows this folder structure:

```
frontend/
  ├── public/               # Static files such as images and icons
  ├── src/                  # Source code for React app
      ├── components/       # Reusable UI components (Buttons, Forms, etc.)
      ├── pages/            # React pages corresponding to different routes
      ├── services/         # API services for making HTTP requests
      ├── store/            # Redux store (if using Redux for state management)
      ├── utils/            # Utility functions and helpers
      ├── App.js            # Main app component
      ├── index.js          # Entry point of the React app
  ├── tailwind.config.js    # TailwindCSS configuration
  ├── postcss.config.js     # PostCSS configuration
```

### 1. `public/`

Contains static assets like images, icons, and fonts.

### 2. `src/`

The source code folder for all React components.

- **`components/`**: Contains reusable UI components like buttons, input fields, modals, etc.
- **`pages/`**: Contains the React pages that map to different routes in your app.
- **`services/`**: Contains functions for making API calls (using `axios` or any other method).
- **`store/`**: Contains Redux store configuration (if Redux is used for state management).
- **`utils/`**: Contains utility functions, helper files, or custom hooks.

### 3. `App.js`

The main React component that includes routing and global layout structure.

### 4. `index.js`

The entry point of the React app where the ReactDOM renders the app into the `#root` element in the `index.html`.

---

## Running Tests

If you have tests set up, you can run them using the following command:

```bash
npm run test
```

This will run all the tests and output the results to the terminal.

## Deployment

The frontend can be deployed to various platforms such as **Vercel**, **Netlify**, or **GitHub Pages**.

Here are some quick deployment guides:

### **Deploy to Vercel**

1. Push your code to GitHub.
2. Sign in to Vercel and click "New Project".
3. Select your GitHub repository and follow the deployment steps.

---

## Environment Variables

If your app requires environment variables (like API base URLs), create a `.env` file in the root of the `frontend` directory:

Example:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Be sure to replace the URL with the actual backend API URL once you deploy the app.

---

## Troubleshooting

- **Port Conflicts**: If port `3000` is already in use, you can change the port by running:

  ```bash
  PORT=3001 npm start
  ```

- **API Requests**: Ensure that the backend server is running before making API requests from the frontend.

---

## Contributing

If you'd like to contribute to the development of the frontend, follow these steps:

1. Fork this repository and create your branch from `main`.
2. Implement your changes.
3. Run tests to ensure everything works.
4. Create a pull request with a detailed description of your changes.

---

This README provides a comprehensive overview of the **frontend** folder in your **Ticket System** project. Let me know if you need more details or adjustments!
