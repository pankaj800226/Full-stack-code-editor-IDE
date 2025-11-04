import { Link } from 'react-router-dom'
import template1 from '../../assets/templet1.jpg'
import template2 from '../../assets/templet2.png'
import { motion } from "framer-motion";

const Resume = () => {

    const resumeTemplete = [
        {
            id: 1,
            templete: template1,
            title: "Classic",
            path: "/templete1"
        },
        {
            id: 2,
            templete: template2,
            title: "Modern",
            path: "/template2"
        },
    ]
    return (
        <>
            {/* <div className="resume_header">
                <button className="back_btn" onClick={() => navigate(-1)}>
                    ⬅ Back
                </button>
                <h3>Choose Your Resume Template</h3>
            </div> */}
            <div className='resume_container'>

                {
                    resumeTemplete.length === 0 ? (
                        <h2>Template Not Found</h2>
                    ) : (
                        resumeTemplete.map((data, index) => (
                            <>
                                <Link to={data.path}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.2, duration: 0.8 }}
                                        viewport={{ once: true }}
                                    >
                                        <img src={data.templete} alt="" />
                                        <h3>{data.title}</h3>
                                    </motion.div>
                                </Link>

                            </>
                        ))
                    )
                }
            </div>
        </>
    )
}

export default Resume