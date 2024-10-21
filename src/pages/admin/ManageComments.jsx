import { useEffect, useState } from "react";
import api from "../../config/axiosConfig";
import useDocumentTitle from "../../utils/documentTitle";
import Comment from "../postpage/PostComment";
import styles from "../postpage/PostPage.module.css";
import { useAuth } from "../../config/AuthContext";

const ManageComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    console.log("DELETED COMMENT: " + commentId + " " + postId);

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
    } catch (error) {
      console.error("Error deleting comment", error);
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
