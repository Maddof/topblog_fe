import { useEffect, useState } from "react";
import api from "../../config/axiosConfig";
import useDocumentTitle from "../../utils/documentTitle";
import styles from "../postpage/PostPage.module.css";
import { useAuth } from "../../config/AuthContext";
import PaginationButtons from "../../components/PaginationControls";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For fetching errors
  const [deleteError, setDeleteError] = useState(null); // For deletion errors
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [totalPosts, setTotalPosts] = useState(null); // Total comments

  useDocumentTitle("Manage comments");
  const { accessToken, role } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(`/posts/public/?page=${page}&limit=2`);
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages); // Set total number of pages
        setTotalPosts(response.data.totalPosts); // Set total number of posts
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        setError("Failed to fetch posts");
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page]); // Fetch comments whenever the page changes

  const handleDelete = async (postId) => {
    try {
      const response = await api.delete(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Successfully deleted post ", response);

      // Remove the deleted comment from the state
      setPosts((prevPosts) => prevPosts.filter((posts) => posts.id !== postId));
    } catch (error) {
      console.error("Error deleting post", error);
      setDeleteError("Failed to delete the post. Please try again.");
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
        <p>Manage posts here</p>
        Number of total posts: {totalPosts && totalPosts}
        {/* Display error if comment deletion fails */}
        {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}
        <ul className={`${styles.commentWrapper}`}>
          {posts.map((post) => (
            <li key={post.id} className={`${styles.commentItem}`}>
              {post.title}
              <button onClick={() => handleDelete(post.id)}>DELETE</button>
            </li>
          ))}
        </ul>
        <hr />
        <PaginationButtons
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export { ManagePosts };
