# TopBlog Frontend

TopBlog is a blogging platform that allows users to read posts and manage content through an admin dashboard. Created for a student project (The odin project). The frontend of this project is built with **React**, **React Router**, and **Vite**, with additional functionality for user authentication, role-based access, and rich-text editing.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [License](#license)

## Tech Stack

### Main Technologies

- **React**: Used as the main UI library to create interactive components.
- **React Router**: Provides routing for the app, allowing users to navigate between pages and different parts of the dashboard.
- **Vite**: A modern build tool that provides fast development and optimized builds for production.

### Additional Libraries

- **axios**: Used to make HTTP requests to the backend API for post data, comments, and authentication.
- **@tinymce/tinymce-react**: A rich text editor used for creating and editing blog posts, allowing for HTML and Markdown content.
- **dompurify**: Sanitizes the content to prevent XSS attacks, ensuring that user-generated content is safe.
- **AuthContext (Custom)**: Manages user authentication state and provides role-based access control for protected routes.

### Linting

- **ESLint**: Enforces code consistency and best practices, configured with the React plugin for React-specific linting.

## Features

- **Home Page**: Lists all published blog posts.
- **Post Details Page**: Displays individual posts with content and comments.
- **Admin Dashboard**:
  - **Manage Posts**: Create, edit, and publish posts.
  - **Manage Comments**: Review and moderate user comments.
  - **Role-Based Access**: Ensures only users with `ADMIN` roles can access certain routes.
- **Authentication**:
  - **Login Page**: Allows users and admins to log in. JWT is managed via a custom AuthProvider and is required for protected routes.
- **Rich Text Editing**: Uses TinyMCE for a WYSIWYG editor in posts.
