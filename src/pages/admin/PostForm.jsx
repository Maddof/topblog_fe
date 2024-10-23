import React, { useState } from "react";
import api from "../../config/axiosConfig";
import styles from "../postpage/CommentForm.module.css"; // Optional CSS module for styling
import { validatePost } from "../../utils/postValidation";
import { useAuth } from "../../config/AuthContext";
import { Editor } from "@tinymce/tinymce-react";

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

  const handleEditorChange = (content) => {
    setPostContent(content);
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

      <Editor
        apiKey="9pvomcydeaj6q20gddsz4f2k6283orsehxx8fcvr228pth6t"
        name="content"
        disabled={loading}
        value={postContent}
        init={{
          height: 400,
          menubar: false,
          skin: "oxide-dark",
          content_css: "tinymce-5-dark",
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={handleEditorChange}
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
