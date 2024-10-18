import HomePage from "./pages/HomePage";
import PostPage from "./pages/postpage/PostPage";
import ErrorPage from "./pages/errorPage";
import Layout from "./layout";
import Login from "./pages/loginpage/LoginPage";
import Dashboard from "./pages/Dashboard";

const routes = [
  {
    path: "/",
    element: <Layout />, // Layout wraps all routes
    errorElement: <ErrorPage />, // Renders in case of an error
    children: [
      {
        path: "/",
        element: <HomePage />, // Displays all blog posts
      },
      {
        path: "login",
        element: <Login />, // Displays all blog posts
      },
      {
        path: "dashboard",
        element: <Dashboard />, // Displays all blog posts
      },
      {
        path: "posts/:postId",
        element: <PostPage />, // Displays individual post by postId
      },
    ],
  },
];

export default routes;
