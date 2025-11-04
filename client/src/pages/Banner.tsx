import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
    return (
        <section className="banner-section">
            <div className="overlay"></div>

            <motion.div
                className="banner-content"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    🎓You Learning Journey with {" "}
                    <span className="highlight">codeX IDE Editor</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    Unlock your full potential with an intelligent learning experience.{" "}
                    <span className="highlight">codeX</span> helps you learn smarter,
                    track progress, and achieve your career goals faster. <br />
                    From <span className="highlight">beginner to expert</span> — your
                    personalized roadmap starts here.
                </motion.p>

                <div>
                    <Link to={"/newchat"}>
                        <motion.button
                            className="cta-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            🚀 Chat AI
                        </motion.button>
                    </Link>

                    <Link to={"/codeEditor"}>
                        <motion.button
                            className="cta-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            🚀 IDE
                        </motion.button>
                    </Link>


                </div>
            </motion.div>

            {/* Floating Icons */}
            <div className="icons">
                {["📚", "🤖", "💡", "🎯", "🧠"].map((icon, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: 0 }}
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                    >
                        {icon}
                    </motion.span>
                ))}
            </div>
        </section>
    );
};

export default Banner;
