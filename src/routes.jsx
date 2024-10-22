import HomePage from "./pages/HomePage";
import PostPage from "./pages/postpage/PostPage";
import ErrorPage from "./pages/errorPage";
import Layout from "./layout";
import Login from "./pages/loginpage/LoginPage";
import Dashboard from "./pages/admin/Dashboard";
import { ManageComments } from "./pages/admin/ManageComments";
import PublishPostPage from "./pages/admin/PublishPost";
import ProtectedRoute from "./components/ProtectedRoute";

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
        element: (
          // Admin dashboard for USER AND ADMIN
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/comments",
        element: (
          <ProtectedRoute requiredRole="ADMIN">
            <ManageComments />
          </ProtectedRoute>
        ), // Sub-route for managing comments
      },

      {
        path: "dashboard/publish",
        element: (
          <ProtectedRoute requiredRole="ADMIN">
            <PublishPostPage />
          </ProtectedRoute>
        ), // Sub-route for publishing a post
      },
      {
        path: "posts/:postId",
        element: <PostPage />, // Displays individual post by postId
      },
    ],
  },
];

export default routes;
