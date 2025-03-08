import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import UserContext from "../../context/UserContext";
import { Errors } from "../Errors";

export const ChatPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const {errors, setErrors} = useContext(UserContext);

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
  }, [])

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
      }
    } catch (err) {
      setErrors(err.message);
    }
  }

  return (
    <div>
      {errors.length > 0 && <Errors errors={errors} />}

      <h1>{user.profile ? user.profile.displayName : user.username}</h1>

      <form onSubmit={handleSubmit}>
        <textarea onChange={(e) => setMessageContent(e.target.value)} value={messageContent} name="content" id="content" required></textarea>
        <button type="submit">Send</button>
      </form>
      
      <ul>
        {messages.map(message => (
          <div key={message.id} className="message">
            <h2>{message.sender.profile.displayName ? message.sender.profile.displayName : message.sender.username}</h2>
            <p>{message.content}</p>
          </div>
        ))}
      </ul>
    </div>
  )
}
