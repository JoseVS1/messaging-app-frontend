import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router"
import UserContext from "../../context/UserContext";
import { Errors } from "../Errors";

export const ChatPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const {errors, setErrors} = useContext(UserContext);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/users/${id}`);
        const data = await response.json();

        setUser(data.user);
      } catch (err) {
        setErrors(err.message);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/messages?senderId=${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await response.json();

        setMessages(data.messages);
      } catch (err) {
        setErrors(err.message);
      }
    }

    fetchMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          receiverId: id,
          content: messageContent
        })
      });
      const data = await response.json();

      if (response.ok) {
        setMessageContent("");
        setMessages(prevMessages => [...prevMessages, data.message]);
      }
    } catch (err) {
      setErrors(err.message);
    }
  }

  return (
    <>
      <div className="user-header">
          <img className="profile-picture" src={user.profile && user.profile.avatarUrl ? user.profile.avatarUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="Profile picture" />
          <h1>{user.profile ? user.profile.displayName : user.username}</h1>
        </div>

      <div className="chat-page">
        {errors.length > 0 && <Errors errors={errors} />}
        
        <ul className="message-list">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.sender.username !== user.username ? "own-message" : ""}`}>
              {message.sender.username === user.username && <img className="profile-picture" src={user.profile && user.profile.avatarUrl ? user.profile.avatarUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="Profile picture" />}
              <p>{message.content}</p>
            </div>
          ))}
          <div ref={bottomRef} />
        </ul>
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
          <textarea onChange={(e) => setMessageContent(e.target.value)} value={messageContent} name="content" id="content" required></textarea>
          <button type="submit">Send</button>
      </form>
    </>
  )
}
