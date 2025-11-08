import SideHeader from "../components/SideHeader"
import { motion } from 'framer-motion'



const Dashboard = () => {
  

 

  return (
    <div className="dashboard_container">
      <SideHeader />

      <main className="dashboard_main">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card_container">

          <div>
            <h2>JavaScript Quiz</h2>
            <p>2</p>
          </div>

        </motion.div>
      </main>
    </div>
  )
}

export default Dashboard