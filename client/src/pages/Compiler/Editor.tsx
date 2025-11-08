import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { api } from "../../Api/api";
import { CopyAllOutlined, DoneAllOutlined } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import toast from "react-hot-toast";

const LANGUAGES = [
  { name: "JavaScript", value: "javascript", icon: "🟨" },
  { name: "Python", value: "python", icon: "🐍" },
  { name: "Java", value: "java", icon: "☕" },
  { name: "C", value: "c", icon: "🔵" },
  { name: "C++", value: "cpp", icon: "💠" },
];

const OnlineCompiler = () => {
  const [language, setLanguage] = useState(() => {
    const storedLang = localStorage.getItem("language");
    return LANGUAGES.find((l) => l.value === storedLang) || LANGUAGES[0];
  });

  const [code, setCode] = useState(() => {
    return localStorage.getItem("code") || "// 👋 Write your code here //";
  });

  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"code" | "output">("code");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const token = localStorage.getItem("TOKEN");



  useEffect(() => {
    localStorage.setItem("language", language.value);
    localStorage.setItem("code", code);
  }, [language, code])



  const runCode = async () => {
    if (!code.trim()) {
      return toast.error("Write some code before running!");
    }

    setLoading(true);
    setError("");
    setOutput("");

    try {
      const { data } = await axios.post(
        `${api}/api/codeEditor/run`,
        {
          language: language.value,
          code,
        },

      );

      setOutput(data.output || data.error || "No output");
      setActiveTab("output");
      toast.success("✅ Code executed successfully!");
    } catch (err) {
      console.error(err);
      setError("⚠️ Error connecting to server");
      toast.error("Server error while running code");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy code");
    }
  };

  const handleUpload = async () => {
    if (code && language) {
      setLoading(true)
      try {
        await axios.post(`${api}/api/snippet/upload/snippet`, { code, language: language.value }, {
          headers: { Authorization: `$Bearer ${token}` }

        })

        localStorage.removeItem('code')
        localStorage.removeItem('language')

        toast.success(`Saved `, {
          position: "bottom-right",
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

      } catch (error) {
        console.log(error);
        toast.error(`error ${error} `, {
          position: "bottom-right",
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

      } finally {
        setLoading(false)
      }
    } else {
      toast.error(`Field are required `, {
        position: "bottom-right",
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
    <div className="compiler-container">
      {/* ---------- Header ---------- */}
      <header className="compiler-header">
        <h1>⚡ Online Compiler</h1>


        <div className="compiler-controls">
          {/* Language Dropdown */}
          <div
            className="language-dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="selected-lang">
              {language.icon} {language.name}
            </span>
            <ul className={`dropdown-list ${dropdownOpen ? "open" : ""}`}>
              {LANGUAGES.map((lang) => (
                <li
                  key={lang.value}
                  onClick={() => {
                    setLanguage(lang);
                    setDropdownOpen(false);
                  }}
                  className={language.value === lang.value ? "active" : ""}
                >
                  <span className="icon">{lang.icon}</span>
                  {lang.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Copy Button */}
          <MenuItem onClick={handleCopy}>
            {copied ? (
              <>
                <DoneAllOutlined style={{ color: "limegreen", marginRight: 6 }} />
                Copied
              </>
            ) : (
              <>
                <CopyAllOutlined style={{ marginRight: 6 }} />
                Copy
              </>
            )}
          </MenuItem>

          {/* Save Button  */}
          <button style={{ background: "#40c463" }} disabled={loading} onClick={handleUpload}>
            {loading ? "⏳ Loading..." : "▶ Save"}
          </button>

          {/* Run Button */}
          <button onClick={runCode} disabled={loading}>
            {loading ? "⏳ Running..." : "▶ Run"}
          </button>
        </div>
      </header>

      {/* ---------- Mobile Toggle ---------- */}
      <div className="mobile-toggle">
        <button
          className={activeTab === "code" ? "active" : ""}
          onClick={() => setActiveTab("code")}
        >
          💻 Code
        </button>
        <button
          className={activeTab === "output" ? "active" : ""}
          onClick={() => setActiveTab("output")}
        >
          🧾 Output
        </button>
      </div>

      {/* ---------- Dry Run ---------- */}




      {/* ---------- Main Area ---------- */}
      <div className="compiler-main">
        <div
          className={`editor-pane ${activeTab === "code" ? "show" : "hide-mobile"
            }`}
        >
          <Editor
            height="75vh"
            language={language.value}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
          />
        </div>

        <div
          className={`output-pane ${activeTab === "output" ? "show" : "hide-mobile"
            }`}
        >
          <h2>Output</h2>
          <pre className={error ? "error" : ""}>
            {error ? error : output || "Run code to see output..."}
          </pre>
        </div>

      </div>
    </div>
  );
};

export default OnlineCompiler;
