import React, { useState } from "react";
import api from "../../config/axiosConfig";
import styles from "./CommentForm.module.css"; // Optional CSS module for styling
import { validateComment } from "../../utils/commentValidation";

const CommentForm = ({ postId, onCommentAdded }) => {
  const [newComment, setNewComment] = useState(""); // State for new comment content
  const [guestName, setGuestName] = useState("");
  const [guestMail, setGuestMail] = useState("");
  const [loading, setLoading] = useState(false); // State to manage form loading
  const [error, setError] = useState(null); // State to manage errors
  const [validationError, setValidationError] = useState({}); // State to track validation errors

  // Debounced validation handler (if needed for performance)
  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    setState(value);

    // Optionally debounce validation to avoid running it every keystroke
    // debounceValidation(newComment, guestMail);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Use the external validation function
    const errors = validateComment(newComment, guestMail);

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(`/posts/${postId}/newComment`, {
        content: newComment, // Send the comment content to the backend
        gName: guestName,
        gMail: guestMail,
      });
      // Notify parent component (PostPage) that a comment was added
      onCommentAdded(response.data.comment);

      // Reset the form field after submission
      setNewComment("");
      setGuestMail("");
      setGuestName("");
      setValidationError({}); // Clear any validation errors after success
    } catch (error) {
      setError("Error submitting comment.");
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <input
        type="text"
        name="gName"
        id="gname"
        value={guestName}
        onChange={(e) => handleInputChange(e, setGuestName)}
        placeholder="Guest name"
        disabled={loading}
      />
      <input
        type="email"
        name="gEmail"
        id="gEmail"
        value={guestMail}
        onChange={(e) => handleInputChange(e, setGuestMail)}
        placeholder="Guest mail"
        disabled={loading}
      />

      {/* Validation errors for guest mail */}
      {validationError.guestMail && (
        <p className={styles.error}>{validationError.guestMail}</p>
      )}

      <textarea
        name="content"
        value={newComment}
        onChange={(e) => handleInputChange(e, setNewComment)}
        placeholder="Write your comment here..."
        disabled={loading}
        required
      />

      {/* Validation errors for comment content */}
      {validationError.content && (
        <p className={styles.error}>{validationError.content}</p>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Post Comment"}
      </button>

      {/* Error message */}
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default CommentForm;
