import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../config/axiosConfig"; // Import the axios instance with baseURL
import useDocumentTitle from "../utils/documentTitle";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [totalPosts, setTotalPosts] = useState(null); // Total comments

  useDocumentTitle("Home blog");

  useEffect(() => {
    // Fetch the published posts
    const fetchPosts = async () => {
      try {
        const response = await api.get(`/posts/public/?page=${page}&limit=4`);
        setPosts(response.data.posts); // Assuming the API returns posts in a 'posts' field
        setTotalPages(response.data.totalPages); // Set total number of pages
        setTotalPosts(response.data.totalPosts); // Set total number of comments
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, [posts]);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Published Posts</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content.substring(0, 100)}...</p>{" "}
              {/* Showing a snippet */}
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
      {totalPages > 1 ? (
        <div>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span style={{ marginInline: "10px" }}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
