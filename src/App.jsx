import { Routes, Route } from "react-router"
import { HomePage } from "./components/pages/HomePage"
import { NotFoundPage } from "./components/pages/NotFoundPage"
import { ChatPage } from "./components/pages/ChatPage"
import { useEffect, useState } from "react"
import UserContext from "./context/UserContext"
import { LoginPage } from "./components/pages/LoginPage"
import { Navbar } from "./components/Navbar"
import { SignupPage } from "./components/pages/SignupPage"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { ProfilePage } from "./components/pages/ProfilePage"
import { EditProfilePage } from "./components/pages/EditProfilePage"

export const App = () => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const getLoggedUser = async () => {
        try {
          const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
          const response = await fetch(`${baseUrl}/api/auth/me`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });
          const data = await response.json();

          setUser(data.user);
        } catch (err) {
          setErrors(err.message);
        }
      }

      getLoggedUser();
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser, errors, setErrors}}>
        <Navbar />

        <Routes>
          <Route path="/" element={
            <ProtectedRoute user={user}>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="chats/:id" element={
            <ProtectedRoute user={user}>
              <ChatPage />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute user={user}>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="profile/edit" element={
            <ProtectedRoute user={user}>
              <EditProfilePage />
            </ProtectedRoute>
          } />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}
