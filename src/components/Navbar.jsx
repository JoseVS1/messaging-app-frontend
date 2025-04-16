import { useContext } from "react";
import { NavLink, useNavigate } from "react-router"
import UserContext from "../context/UserContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  }

  return (
    <nav>
        <ul>
            <div>
              <li>
                <span className="link">
                  <NavLink to="/">Home</NavLink>
                </span>
              </li>
            </div>

            {user ? (
              <div>
                <li>
                  <span className="link">
                    <NavLink to="/profile">Profile</NavLink>
                  </span>
                </li>

                <li>
                  <button onClick={handleLogout}>Log out</button>
                </li>
              </div>
            ) : (
              <div>
                <li>
                  <span className="link">
                    <NavLink to="/signup">Sign up</NavLink>
                  </span>
                </li>
                <li>
                  <span className="link">
                    <NavLink to="/login">Log in</NavLink>
                  </span>
                </li>
              </div>
            )}
        </ul>
    </nav>
  )
}
