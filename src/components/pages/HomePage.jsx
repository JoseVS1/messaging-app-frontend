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
    <div>
      {errors.length > 0 && <Errors errors={errors} />}
      
      <h1>Chat App</h1>

      {user && <h2>Welcome, { user.profile.displayName ? user.profile.displayName : user.username }</h2>}

      <h2>Users:</h2>

      <ul>
        {users && users.map(user => (
          <Link to={`/chats/${user.id}`} key={user.id}>{user.username}</Link>
        ))}
      </ul>

    </div>
  )
}
