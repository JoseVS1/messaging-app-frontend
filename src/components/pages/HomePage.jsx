import { useContext, useEffect, useState } from "react"
import { Link } from "react-router";
import UserContext from "../../context/UserContext";
import { Errors } from "../Errors";

export const HomePage = () => {
  const [users, setUsers] = useState(null);
  const { user, errors, setErrors } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/users`);
        const data = await response.json();

        if (user) {
          const filteredUsers = data.users.filter(u => u.id !== user.id);
          setUsers(filteredUsers);
        }
      } catch (err) {
        setErrors(err.message);
      }
    };

    fetchUsers();
  }, [user])

  return (
    <div className="home-page">
      {errors.length > 0 && <Errors errors={errors} />}
      
      <div className="heading-container">
        <h1>Wisp</h1>
      </div>

      <h2>Users</h2>
      
      <div className="users-container">
        <div className="users-card">
          {users && users.length > 0 ? (
            <ul>
              {users.map(user => (
                <Link className="user-card" key={user.id} to={`/chats/${user.id}`}>
                  <img className="profile-picture" src={user.profile && user.profile.avatarUrl ? user.profile.avatarUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="Profile picture" />
                  <h3>{user.username}</h3>
                </Link>
              ))}
            </ul>
          ) : (
            <div className="empty-users-container">
              <h2>There are no users...</h2>
            </div>
          )}
        </div>
      </div>
      
    </div>
  )
}
