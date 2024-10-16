import React from "react"; // Import the React library
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering the app to the DOM
import routes from "./routes"; // Import the route definitions from the routes file
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import the functions for creating a router
import "./index.css"; // Import global CSS styles

// Create a browser router using the defined routes
const router = createBrowserRouter(routes);

// Render the application to the root DOM element
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {" "}
    {/* Enables additional checks and warnings for the app */}
    <RouterProvider router={router} /> {/* Provide the router to the app */}
  </React.StrictMode>
);
