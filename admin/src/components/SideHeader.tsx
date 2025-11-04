import { useEffect, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
    { path: "/", label: "Dashboard", icon: '⛑️' },
    { path: "/user", label: "User", icon: '💁' },
];

const SideMenu = () => {
    const [show, setShow] = useState(true);
    const [activeMobile, setActiveMobile] = useState(window.innerWidth < 1100);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => setActiveMobile(window.innerWidth < 1100);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [jsQuizDialogOpen, setJsQuizDialogOpen] = useState(false);
    const toggleJsQuizDialog = () => setJsQuizDialogOpen(!jsQuizDialogOpen);

    return (
        <>
            {activeMobile && !show && (
                <button className="sideMenu__toggle" onClick={() => setShow(true)}>
                    <HiMenuAlt4 size={28} />
                </button>
            )}

            <aside
                className={`sideMenu ${activeMobile ? "sideMenu--mobile" : ""} ${show ? "sideMenu--open" : "sideMenu--closed"}`}
            >
                {activeMobile && (
                    <div className="sideMenu__header">
                        <h2>Menu</h2>
                        <button onClick={() => setShow(false)} className="sideMenu__close">
                            <HiMenuAlt4 size={24} />
                        </button>
                    </div>
                )}

                <nav className="sideMenu__nav">
                    {menuItems.map((item) => (
                        <Link
                            to={item.path}
                            key={item.path}
                            className={`sideMenu__link ${location.pathname === item.path ? "active" : ""}`}
                            onClick={() => activeMobile && setShow(false)}
                        >
                            <span className="sideMenu__icon">{item.icon}</span>
                            <span className="sideMenu__label">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* JS Quiz Button & Dialog */}
                <div className="sideMenu__jsQuiz">
                    <button onClick={toggleJsQuizDialog}>JavaScript Quiz</button>
                    {jsQuizDialogOpen && (
                        <div className="sideMenu__jsQuiz-dialog">
                            <Link to="/jsQuizUpload" onClick={() => activeMobile && setShow(false)}>
                                Quiz Upload
                            </Link>

                            <Link to="/jsManage" onClick={() => activeMobile && setShow(false)}>
                                Quiz Manage
                            </Link>
                        </div>
                    )}
                </div>
            </aside>

            {/* Overlay */}
            {show && activeMobile && <div className="sideMenu__overlay" onClick={() => setShow(false)}></div>}
        </>
    );
};

export default SideMenu;
