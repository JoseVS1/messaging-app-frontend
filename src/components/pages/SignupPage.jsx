import { useContext, useState, useEffect } from "react"
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router";
import { Errors } from "../../components/Errors";

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors([result.message]);
      } else {
        localStorage.setItem("token", result.token);
        setErrors([]);
        setUser(result.user);
      }
    } catch (err) {
      setErrors(err.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value
      }
    })};

  return (
    <>
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" value={formData.username} onChange={handleInputChange} required />

        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required />
      
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} required />

        <label htmlFor="confirmPassword">Confirm password: </label>
        <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />

        <button type="submit">Sign up</button>
    </form>

    {errors.length > 0 && <Errors errors={errors} />}
  </>
  )
}