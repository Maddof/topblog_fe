import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig"; // Import the axios instance with baseURL
import useDocumentTitle from "../utils/documentTitle";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useDocumentTitle("Home blog");

  useEffect(() => {
    // Fetch the published posts
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts/public");
        setPosts(response.data.posts); // Assuming the API returns posts in a 'posts' field
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
    </div>
  );
};

export default Home;
