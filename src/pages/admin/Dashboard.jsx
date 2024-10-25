import { useAuth } from "../../config/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { role } = useAuth();

  return (
    <div>
      <p>My dashboard</p>
      <p>
        {role === "ADMIN"
          ? "Currently logged in as ADMIN"
          : "Currently Logged in USER"}
      </p>
      {role === "ADMIN" ? (
        <Link to={"comments"}> Manage Comments </Link>
      ) : (
        "Manage something"
      )}
      |
      {role === "ADMIN" ? (
        <Link to={"posts"}> Manage Posts </Link>
      ) : (
        "Manage something"
      )}
      |
      {role === "ADMIN" ? (
        <Link to={"publish"}> Write A Post </Link>
      ) : (
        "Publish something"
      )}
    </div>
  );
};

export default Dashboard;
