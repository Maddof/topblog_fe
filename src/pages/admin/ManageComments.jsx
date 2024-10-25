import { useEffect, useState } from "react";
import { api } from "../../config/axiosConfig";
import useDocumentTitle from "../../utils/documentTitle";
import Comment from "../postpage/PostComment";
import styles from "../postpage/PostPage.module.css";
import { useAuth } from "../../config/AuthContext";
import PaginationButtons from "../../components/PaginationControls";

const ManageComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For fetching errors
  const [deleteError, setDeleteError] = useState(null); // For deletion errors
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [totalComments, setTotalComments] = useState(null); // Total comments

  useDocumentTitle("Manage comments");
  const { accessToken, role } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(
          `/comments/paginated/?page=${page}&limit=5`
        );
        setComments(response.data.comments);
        setTotalPages(response.data.totalPages); // Set total number of pages
        setTotalComments(response.data.totalComments); // Set total number of comments
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch comments");
        setLoading(false);
      }
    };
    fetchComments();
  }, [page]); // Fetch comments whenever the page changes

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

  // Passed as prop to pagination controls
  const handlePageChange = (buttonPage) => {
    setPage(buttonPage);
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
        Number of total comments: {totalComments && totalComments}
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
        {/* Pagination controls */}
        <PaginationButtons
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export { ManageComments };
