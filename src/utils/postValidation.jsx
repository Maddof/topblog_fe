// utils/postValidation.jsx

export const validatePost = (newPostContent, newPostTitle) => {
  const errors = {};

  // Validate comment content: at least 5 characters long
  if (!newPostContent || newPostContent.trim().length < 5) {
    errors.title = "Content must be at least 5 characters long.";
  }

  // Validate comment content: at least 5 characters long
  if (!newPostTitle || newPostTitle.trim().length < 5) {
    errors.content = "Title must be at least 5 characters long.";
  }

  // Return errors object
  return errors;
};
