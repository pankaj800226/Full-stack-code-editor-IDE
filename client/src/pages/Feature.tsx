import { motion } from "framer-motion";
import { Brain, Target, ChartBar } from "lucide-react";

const features = [
    {
        icon: "🤖",
        title: "AI Guide",
        desc: "Get instant AI-powered assistance for coding queries and learning paths.",
    },

    {
        icon: <Brain size={36} />,
        title: "Code IDE ",
        desc: "Get personalized IDE Envoirement .",
    },
    {
        icon: <Target size={36} />,
        title: "Step-by-Step Roadmaps",
        desc: "Follow structured roadmaps from beginner to expert",
    },
    {
        icon: <ChartBar size={36} />,
        title: "Track Your Progress",
        desc: "Visualize your journey with progress analytics, quizzes, and smart recommendations.",
    },

    // {
    //     icon: <Award size={36} />,
    //     title: "Earn Certificates",
    //     desc: "Complete courses and earn shareable certificates to boost your resume and LinkedIn profile.",
    // },




];

const Feature = () => {
    return (
        <section className="feature-section">
            <motion.h2
                className="feature-title"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                💡 Why Choose <span className="highlight">codeX?</span>
            </motion.h2>

            <div className="feature-grid">
                {features.map((item, i) => (
                    <motion.div
                        key={i}
                        className="feature-card"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2, duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="feature-icon">{item.icon}</div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Feature;
