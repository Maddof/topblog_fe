import React from "react"; // Import the React library
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering the app to the DOM
import routes from "./routes"; // Import the route definitions from the routes file
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import the functions for creating a router
import { AuthProvider } from "./config/AuthContext";
import "./index.css"; // Import global CSS styles
import { useAxiosInterceptor } from "./config/axiosConfig";

// Create a browser router using the defined routes
// const router = createBrowserRouter(routes);

// Create a higher-order component to wrap your application
const AppWrapper = () => {
  useAxiosInterceptor(); // Set up the interceptor

  return <RouterProvider router={createBrowserRouter(routes)} />;
};

// Render the application to the root DOM element
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  </React.StrictMode>
);
