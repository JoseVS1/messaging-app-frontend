import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router";
import { Errors } from "../../components/Errors"

export const LoginPage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
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
    });
  }
  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required />
        
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} required />

        <button type="submit">Log in</button>
      </form>

      {errors.length > 0 && <Errors errors={errors} />}
    </>
  )
}
