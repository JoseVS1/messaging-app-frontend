import { useContext } from "react"
import UserContext from "../../context/UserContext"
import { Link } from "react-router";

export const ProfilePage = () => {
    const { user } = useContext(UserContext);

  return (
    <>
        {user ? (
            <>
                <h2>Display name: {user.profile.displayName ? user.profile.displayName : user.username} </h2>
                <h2>Created at: {user.profile.createdAt}</h2>
                <h2>Profile picture:</h2>
                <img className="profile-picture" src={user.profile.avatarUrl ? user.profile.avatarUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="Profile picture" />
                <h2>Bio:</h2>
                <p>{user.profile.bio ? user.profile.bio : "No bio provided."}</p>
                
                <button><Link to="/profile/edit">Edit profile</Link></button>
            </>
        ) : (
            <h1>Loading...</h1>
        )}
    </>
  )
}
