import { useEffect, useState } from "react";
import api from "../../config/axiosConfig";
import useDocumentTitle from "../../utils/documentTitle";
import styles from "../postpage/PostPage.module.css";
import { useAuth } from "../../config/AuthContext";
import PaginationButtons from "../../components/PaginationControls";
import { Link } from "react-router-dom";

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
        const response = await api.get(`/posts/?page=${page}&limit=5`);
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
  }, [page]); // Fetch posts whenever the page changes

  const handleDelete = async (postId) => {
    try {
      const response = await api.delete(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Successfully deleted post ", response);

      // Remove the deleted post from the state
      setPosts((prevPosts) => prevPosts.filter((posts) => posts.id !== postId));

      // Decrement the total number of posts
      setTotalPosts((prevTotal) => prevTotal - 1);

      // Check if the current page now has no posts (after deletion)
      if (posts.length === 1 && page > 1) {
        // If no posts are left on the current page, move back a page
        setPage(page - 1);
      }
    } catch (error) {
      console.error("Error deleting post", error);
      setDeleteError("Failed to delete the post. Please try again.");
    }
  };

  const handleUpdatePublish = async (post) => {
    console.log(post);
    try {
      const response = await api.put(
        `/posts/${post.id}`,
        {
          title: post.title, // Request body
          content: post.content,
          published: post.published === true ? false : true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Successfully updated post ", response);

      // maps through the current posts and updates only the post with
      // the matching id by setting its published field to true
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id
            ? { ...p, published: post.published === true ? false : true }
            : p
        )
      );
    } catch (error) {
      console.error("Error updating post", error);
      setDeleteError("Failed to update the post. Please try again.");
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
              {post.title}- ({post.id}) -
              {post.published === true ? "Published" : "Unpublished "}
              <button
                style={{
                  marginLeft: "10px",
                  backgroundColor: post.published ? "red" : "green",
                }}
                onClick={() => handleUpdatePublish(post)}
              >
                {post.published ? "UNPUBLISH" : "PUBLISH"}
              </button>
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => handleDelete(post.id)}
              >
                DELETE
              </button>
              <Link to={`edit-post/${post.id}`} style={{ marginLeft: "10px" }}>
                Edit
              </Link>
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
