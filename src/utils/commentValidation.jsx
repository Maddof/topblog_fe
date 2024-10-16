// utils/commentValidation.js

export const validateComment = (newComment, guestMail) => {
  const errors = {};

  // Validate comment content: at least 5 characters long
  if (!newComment || newComment.trim().length < 5) {
    errors.content = "Comment must be at least 5 characters long.";
  }

  // Validate email: Must be in proper format if provided
  if (guestMail && !/\S+@\S+\.\S+/.test(guestMail)) {
    errors.guestMail = "Please provide a valid email address.";
  }

  // Return errors object
  return errors;
};
