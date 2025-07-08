import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import icoImg from "../assets/img/notes.ico";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="nav-bar">
      <Link className="title" to={isAuthenticated ? "/tasks" : "/"}>
        <h1>
          <img src={icoImg} alt="icon" />
          Tasks Manager
        </h1>

        {isAuthenticated && (
          <h2>
            Welcome User <i>"{user.username}"</i>
          </h2>
        )}
      </Link>

      {isAuthenticated && (
        <Link className="btn-logout" to="/" onClick={() => logout()}>
          Logout
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
