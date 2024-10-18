import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const navigate = useNavigate(); // Hook (react) to redirect

  api.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken } = response.data;

      setAccessToken(accessToken); // Store the token in local state

      console.log(response.data);

      // Redirect to dashboard and pass the token

      navigate("/dashboard", { state: { accessToken } });
      // Store the token in localStorage
      // localStorage.setItem("token", token);
      // Redirect based on role (optional)
      // if (role === "ADMIN") {
      //   window.location.href = "/";
      // } else {
      //   window.location.href = "/";
      // }
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
