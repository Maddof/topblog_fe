import LoginForm from "./LoginForm";
import { useAuth } from "../../config/AuthContext";

const Login = () => {
  const { accessToken } = useAuth(); // Access the accessToken from the AuthContext

  return (
    <>
      <p>This is the login page</p>
      {accessToken ? <p>You are already logged in</p> : <LoginForm />}
    </>
  );
};

export default Login;
