import { useEffect, useState } from "react";
import api from "../../config/axiosConfig";
import useDocumentTitle from "../../utils/documentTitle";
import Comment from "../postpage/PostComment";
import styles from "../postpage/PostPage.module.css";
import { useAuth } from "../../config/AuthContext";

const ManageComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For fetching errors
  const [deleteError, setDeleteError] = useState(null); // For deletion errors

  useDocumentTitle("Manage comments");
  const { accessToken, role } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get("/comments");
        setComments(response.data.comments);
        setLoading(false);
        console.log(comments);
      } catch (error) {
        setError("Failed to fetch comments");
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const handleDelete = async (commentId, postId) => {
    try {
      const response = await api.delete(
        `/posts/${postId}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Successfully deleted comment ", response);

      // Remove the deleted comment from the state
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment", error);
      setDeleteError("Failed to delete the comment. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div>
        <p>Manage you comments here</p>
        {/* Display error if comment deletion fails */}
        {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}

        <ul className={`${styles.commentWrapper}`}>
          {comments.map((comment) => (
            <li key={comment.id} className={`${styles.commentItem}`}>
              <Comment comment={comment} />
              <button onClick={() => handleDelete(comment.id, comment.postId)}>
                DELETE
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export { ManageComments };
