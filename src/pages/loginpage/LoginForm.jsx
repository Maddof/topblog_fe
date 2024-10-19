import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/axiosConfig";
import { useAuth } from "../../config/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useAuth(); // Destructure login function from context

  const navigate = useNavigate(); // Hook (react) to redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken, role } = response.data;

      // Store token and role in context
      login(accessToken, role);

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
