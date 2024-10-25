import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../config/axiosConfig";
import styles from "../postpage/CommentForm.module.css"; // Optional CSS module for styling
import { validatePost } from "../../utils/postValidation";
import { useAuth } from "../../config/AuthContext";
import { Editor } from "@tinymce/tinymce-react";

const PostForm = () => {
  const { id } = useParams(); // Get post ID from URL
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState(""); // State for new comment content
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false); // State to manage form loading
  const [error, setError] = useState(null); // State to manage errors
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const [validationError, setValidationError] = useState({}); // State to track validation errors

  const btnSubmitText = id ? "Edit post" : "Create post";
  const tinyapiKey = import.meta.env.VITE_TINY_MCE_API_KEY;
  const { accessToken } = useAuth();

  useEffect(() => {
    if (id) {
      // Fetch post details to populate the form for editing
      // (Only if id is present in params)
      const fetchPost = async () => {
        try {
          const response = await api.get(`/posts/${id}`);
          setPostTitle(response.data.post.title);
          setPostContent(response.data.post.content);
          setPublished(response.data.post.published);
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      };
      fetchPost();
    }
  }, [id]);

  // Debounced validation handler (if needed for performance)
  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const handleEditorChange = (content) => {
    setPostContent(content);
  };

  const handlePublishedChange = (e) => {
    setPublished(e.target.checked);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null); // Clear any previous success message

    // Use the external validation function
    const errors = validatePost(postContent, postTitle);

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      setLoading(false);
      return;
    }

    try {
      // IF we have ID in params, we hit put api endpoint.
      // Otherwise we post as usual.
      if (id) {
        await api.put(
          `/posts/${id}`,
          { title: postTitle, content: postContent, published },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setSuccessMessage("Post updated successfully!"); // Success message for edit
      } else {
        await api.post(
          `/posts/`,
          { title: postTitle, content: postContent, published },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        // Reset the form field after submission
        setPostTitle("");
        setPostContent("");
        setSuccessMessage("Post created successfully!"); // Success message for new post
      }

      // Reset the form field after submission
      // setPublished(false);
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
        apiKey={tinyapiKey}
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

      <label>
        <input
          type="checkbox"
          checked={published}
          onChange={handlePublishedChange}
          disabled={loading}
        />
        Published
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : btnSubmitText}
      </button>

      {/* Success message */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default PostForm;
