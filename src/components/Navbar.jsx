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
            <li>
                <NavLink to="/">Home</NavLink>
            </li>

            {user ? (
              <>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>

                <li>
                  <button onClick={handleLogout}>Log out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/signup">Sign up</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Log in</NavLink>
                </li>
              </>
            )}
        </ul>
    </nav>
  )
}
