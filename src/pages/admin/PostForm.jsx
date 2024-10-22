import React, { useState } from "react";
import api from "../../config/axiosConfig";
import styles from "../postpage/CommentForm.module.css"; // Optional CSS module for styling
import { validatePost } from "../../utils/postValidation";
import { useAuth } from "../../config/AuthContext";

const PostForm = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState(""); // State for new comment content
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false); // State to manage form loading
  const [error, setError] = useState(null); // State to manage errors
  const [validationError, setValidationError] = useState({}); // State to track validation errors

  const { accessToken } = useAuth();

  // Debounced validation handler (if needed for performance)
  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Use the external validation function
    const errors = validatePost(postContent, postTitle);

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(
        `/posts/`,
        {
          title: postTitle, // Request body
          content: postContent,
          published: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization header
          },
        }
      );

      // Reset the form field after submission
      setPostTitle("");
      setPostContent("");
      setPublished(false);
      setValidationError({}); // Clear any validation errors after success
    } catch (error) {
      setError("Error submitting post.");
      console.error("Error posting post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <input
        type="text"
        name="title"
        id="title"
        value={postTitle}
        onChange={(e) => handleInputChange(e, setPostTitle)}
        placeholder="Post title"
        disabled={loading}
        required
      />

      {/* Validation errors for title */}
      {validationError.title && (
        <p className={styles.error}>{validationError.title}</p>
      )}

      <textarea
        name="content"
        value={postContent}
        onChange={(e) => handleInputChange(e, setPostContent)}
        placeholder="Write your content here..."
        disabled={loading}
        required
      />

      {/* Validation errors for content */}
      {validationError.content && (
        <p className={styles.error}>{validationError.content}</p>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Create post"}
      </button>

      {/* Error message */}
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default PostForm;
