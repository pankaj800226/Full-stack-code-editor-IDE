import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();
    const [jsQuizIsOpen, setJsQuizIsOpen] = useState<boolean>(false);

    const quizDialog = () => setJsQuizIsOpen(!jsQuizIsOpen);

    const menuItems = [
        { id: "general", icons: "💁", label: "General", path: "/profile" },
    ];

    return (
        <div className="sidebar_container">
            <aside className="sidebar">
                <ul>
                    {menuItems.map((item) => (
                        <Link to={item.path} style={{ color: 'white' }}>
                            <li
                                key={item.id}
                                className={location.pathname === item.path ? "active" : ""}
                            >
                                <span>{item.icons}</span>
                                <span title={item.label}>{item.label}</span>
                            </li>
                        </Link>

                    ))}

                </ul>

                {/* javaScript quiz */}
                <div className="quiz-container">
                    <button onClick={quizDialog}>JavaScript Quizzes</button>
                    {jsQuizIsOpen && (
                        <div className="submenu">
                            <Link to="/javaScript">JavaScript</Link>
                            <Link to="/jsStatus">Status</Link>
                        </div>
                    )}
                </div>

            </aside>
        </div>
    )
}

export default Sidebar