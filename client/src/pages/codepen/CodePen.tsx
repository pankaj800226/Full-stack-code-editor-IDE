import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../Api/api";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";

const CodePen = () => {
    const [html, setHtml] = useState(() => {
        return localStorage.getItem("html") || ""
    })
    const [css, setCss] = useState(() => {
        return localStorage.getItem("css") || ""

    });
    const [js, setJs] = useState(() => {
        return localStorage.getItem("js") || ""

    });
    const [srcDoc, setSrcDoc] = useState("");
    const token = localStorage.getItem("TOKEN");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const { id } = useParams()


    useEffect(() => {
        const fetchCode = async () => {
            try {
                const res = await axios.get(`${api}/api/codepen/get/codepen/${id}`, {
                    headers: { Authorization: `$Bearer ${token}` }
                })

                if (res.data) {
                    setHtml(res.data.html || "");
                    setCss(res.data.css || "");
                    setJs(res.data.js || "");
                }

            } catch (error) {
                console.log(error);
                setError("fetching error")
            } finally {
                setLoading(false)
            }
        }

        fetchCode()
    }, [token])


    // Live preview update
    useEffect(() => {
        const timeout = setTimeout(() => {
            const src = `
        <html>
          <style>${css}</style>
          <body>${html}</body>
          <script>${js}</script>
        </html>
      `;
            setSrcDoc(src);
            localStorage.setItem('html', html)
            localStorage.setItem('css', css)
            localStorage.setItem('js', js)
        }, 300);
        return () => clearTimeout(timeout);
    }, [html, css, js]);


    const handleSave = async () => {
        if (html && css && js) {
            setLoading(true)
            try {
                await axios.post(`${api}/api/codepen/uploadCode/${id}`, { html, css, js }, {
                    headers: { Authorization: `$Bearer ${token}` }
                })

                toast.success(`Saved sucessfull `, {
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
            toast.error(`all field are required `, {
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

    if (error) return <p>{error}</p>
    if (loading) return <Loading />

    return (
        <div className="codePen_container">
            <header className="header">⚡
                <p> CodePen Clone </p>
                <button onClick={handleSave}>
                    {loading ? "wait..." : "Saved"}
                </button>
            </header>

            <main className="main">
                <section className="editors">
                    <div className="editor-block">
                        <h2>HTML</h2>
                        <Editor
                            height="100%"
                            defaultLanguage="html"
                            value={html}
                            theme="vs-dark"
                            onChange={(value) => setHtml(value)}
                        />
                    </div>

                    <div className="editor-block">
                        <h2>CSS</h2>
                        <Editor
                            height="100%"
                            defaultLanguage="css"
                            value={css}
                            theme="vs-dark"
                            onChange={(value) => setCss(value)}
                        />
                    </div>

                    <div className="editor-block">
                        <h2>JS</h2>
                        <Editor
                            height="100%"
                            defaultLanguage="javascript"
                            value={js}
                            theme="vs-dark"
                            onChange={(value) => setJs(value)}
                        />
                    </div>
                </section>

                <section className="output">
                    <iframe
                        srcDoc={srcDoc}
                        title="output"
                        sandbox="allow-scripts"
                        frameBorder="0"
                    />
                </section>
            </main>
        </div>
    );
};

export default CodePen;