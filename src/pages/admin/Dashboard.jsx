import { useState, useEffect } from "react";
import { useAuth } from "../../config/AuthContext";
import api from "../../config/axiosConfig";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { accessToken, role } = useAuth(); // Get accessToken from context

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await api.get("/", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach the token in headers
          },
        });
        setPosts(response.data.stuff);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch");
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchProtectedData();
    } else {
      setError("No access token found. Please login");
      setLoading(false);
    }
  }, [accessToken]);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <p>My dashboard</p>
      <p>
        {role === "ADMIN"
          ? "Currently logged in as ADMIN"
          : "Currently Logged in USER"}
      </p>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
