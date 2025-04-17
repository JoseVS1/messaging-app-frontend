import { useContext, useState } from "react"
import UserContext from "../../context/UserContext"
import { useNavigate } from "react-router";
import { Errors } from "../Errors";

export const EditProfilePage = () => {
    const { user, setUser, setErrors, errors } = useContext(UserContext);
    const [formData, setFormData] = useState({
        displayName: (user.profile.displayName ? user.profile.displayName : user.username),
        avatarUrl: (user.profile.avatarUrl ? user.profile.avatarUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"),
        bio: (user.profile.bio ? user.profile.bio : "No bio provided.")
    });
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
            const response = await fetch(`${baseUrl}/api/profiles/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    displayName: formData.displayName,
                    bio: formData.bio,
                    avatarUrl: formData.avatarUrl
                })
            });

            const result = await response.json();

            if (response.ok) {
                setUser(prevUser => (
                    {
                        ...prevUser,
                        profile: result.profile
                    }
                ))
                navigate("/profile");
            } else {
                setErrors(result.message);
            }
        } catch (err) {
            setErrors(err.message);
        }
    }

    const handleInputChange = e => {
        setFormData(prevFormData => (
            {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        ))
    };

  return (
    <div className="edit-profile-page">
        {user ? (
            <div className="edit-profile-card">
                <div className="heading-container">
                    <h1>Edit profile</h1>
                </div>

                <form className="edit-profile-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="displayName">Display name: </label>
                        <input type="text" value={formData.displayName} onChange={handleInputChange} name="displayName" id="displayName"/>
                    </div>
                   
                    <div>
                        <label htmlFor="avatarUrl">Profile picture URL: </label>
                        <input type="text" value={formData.avatarUrl} onChange={handleInputChange} name="avatarUrl" id="avatarUrl" />
                    </div>

                    <div>
                        <label htmlFor="bio">Bio: </label>
                        <textarea name="bio" id="bio" value={formData.bio} onChange={handleInputChange}></textarea>
                    
                        {errors.length > 0 && <Errors errors={errors} />}
                    </div>

                    <button type="submit">Submit</button>
                </form>                
            </div>
        ) : (
            <h1>Loading...</h1>
        )}
    </div>
  )
}
