import { useEffect, useState } from "react"
import SideHeader from "../components/SideHeader"
import { motion } from 'framer-motion'
import axios from "axios"
import { api } from "../Api/api"
import Loading from "../components/Loading"


const Dashboard = () => {
  const [allCouese, setAllCourse] = useState([])
  const [allJavascript, setJavaScript] = useState([])
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${api}/api/course/getCourse`)
        const jsResponse = await axios.get(`${api}/api/javascript/get/quiz`)

        setAllCourse(response.data)
        setJavaScript(jsResponse.data)
      } catch (error) {
        console.log(error);
        setError("Fetching Error")
      } finally {
        setLoader(false)
      }
    }

    fetchCourse()
  }, [])
  if (loader) return <Loading />
  if (error) return <p>{error}</p>

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
            <h2>Total Course</h2>
            <p>{allCouese.length}</p>
          </div>
          <div>
            <h2>JavaScript Quiz</h2>
            <p>{allJavascript.length}</p>
          </div>

        </motion.div>
      </main>
    </div>
  )
}

export default Dashboard