import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/axiosConfig";
import { useAuth } from "../../config/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { setAccessToken } = useAuth();

  const navigate = useNavigate(); // Hook (react) to redirect

  api.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken } = response.data;

      setAccessToken(accessToken); // Store the token in context

      console.log(response.data);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
