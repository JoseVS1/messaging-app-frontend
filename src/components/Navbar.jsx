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
                  <div className="dropdown">
                    <span className="dropbtn profile-link">{ user.profile && user.profile.displayName ? user.profile.displayName : user.username }</span>
                    <div className="dropdown-content">
                      <span className="link">
                        <NavLink to="/profile">Profile</NavLink>
                      </span>
                    </div>
                  </div>

                  
                </li>

                <li>
                  <span className="link" onClick={handleLogout}>
                    <a href="">Log out</a>
                  </span>
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
