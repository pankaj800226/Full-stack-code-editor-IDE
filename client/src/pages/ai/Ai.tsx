import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { api } from "../../Api/api";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useParams } from "react-router-dom";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const AiMessage = () => {
  const [userQuery, setUserQuery] = useState("");
  const [aiMessages, setAiMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("TOKEN");
  const { id } = useParams()

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`${api}/api/ai/chatMessage/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) setAiMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, [token, id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages, loading]);

  const handleSendMessage = async () => {
    if (!userQuery.trim()) return toast.error("Please enter a message.");
    setAiMessages((prev) => [...prev, { sender: "user", text: userQuery }]);
    setLoading(true);

    try {
      const res = await axios.post(
        `${api}/api/ai/ai/response/${id}`,
        { userQuery },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.aiMessage) {
        setAiMessages((prev) => [
          ...prev,
          { sender: "ai", text: res.data.aiMessage },
        ]);
      } else {
        toast.error("No response from AI");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error communicating with AI");
    } finally {
      setUserQuery("");
      setLoading(false);
    }
  };

  return (
    <div className="chatgpt-page">
      
      <div className="chatgpt-messages">
        {aiMessages.length === 0 ? (
          <div className="no_data">
            <h2>Ask any question 👋😃</h2>
          </div>
        ) : (
          aiMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`chatgpt-message ${msg.sender === "user" ? "user" : "ai"
                }`}
            >
              <div className="chatgpt-bubble">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {msg.text}
                </ReactMarkdown>

              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="chatgpt-message ai">
            <div className="chatgpt-bubble typing">Typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatgpt-input-area">
        <textarea
          placeholder="Ask anything..."
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button onClick={handleSendMessage} disabled={loading}>
          {loading ? "..." : "➤"}
        </button>
      </div>
    </div>
  );
};

export default AiMessage;
