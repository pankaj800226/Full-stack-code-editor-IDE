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
  // _id: string
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
  const [disabled, setDisables] = useState(false)
  // const [remaining, setRemaining] = useState<number>(2);


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

  useEffect(() => {
    const savedRemaining = localStorage.getItem("ai_remaining");
    if (savedRemaining && Number(savedRemaining) <= 0) {
      setDisables(true);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!userQuery.trim()) return toast.error("Please enter a message.");
    if (disabled) return toast.error("Daily limit reached! Try again tomorrow.");

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

      // // ✅ Save remaining queries in localStorage
      // if (res.data?.remaining !== undefined) {
      //   localStorage.setItem("ai_remaining", res.data.remaining);
      // }

      // // ✅ Disable button if limit reached
      // if (res.data.remaining <= 0) {
      //   setDisables(true);
      //   toast("You have reached your 30 query limit for today!");
      // }


    } catch (error) {
      console.error(error);
      toast.error("Error communicating with AI");

      // if (error?.res?.status === 403) {
      //   toast("Daily limit end! Try again tomorrow")
      //   setDisables(true)
      // }

    } finally {
      setUserQuery("");
      setLoading(false);
    }
  };


  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${api}/api/ai/msg/delete${id}`)
      // setAiMessages((prev) => prev.filter((d) => d._id !== id))

    } catch (error) {
      console.log(error);
      toast.error(`error ${error} `, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      })

    }
  }


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
                <button onClick={() => handleDelete(msg._id)}>Delete</button>
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
        <button onClick={handleSendMessage} disabled={loading || disabled}>
          {disabled ? "Limit Reached" : loading ? "..." : "➤"}
        </button>
      </div>

      {/* <div className="remaining-count">
        {disabled
          ? "Daily limit reached! Try again tomorrow."
          : `Remaining queries today: ${remaining}`}
      </div> */}
    </div>
  );
};

export default AiMessage;
