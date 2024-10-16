import HomePage from "./pages/HomePage";
import PostPage from "./pages/postpage/PostPage";
import ErrorPage from "./pages/errorPage";
import Layout from "./layout";

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
        path: "posts/:postId",
        element: <PostPage />, // Displays individual post by postId
      },
    ],
  },
];

export default routes;
