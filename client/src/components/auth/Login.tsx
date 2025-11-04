import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../Api/api";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setLoading(true)
      try {
        const res = await axios.post(`${api}/api/user/login`, { email, password })

        if (res.data.code === 404) {
          toast(`User Not Found`, {
            duration: 2000,
            position: "bottom-right",
            icon: "👏",
            iconTheme: {
              primary: '#713200',
              secondary: '#FFFAEE',
            },
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          });
        } else if (res.data.code === 401) {
          toast(`Invalid password`, {
            duration: 2000,
            position: "bottom-right",
            icon: "👏",
            iconTheme: {
              primary: '#713200',
              secondary: '#FFFAEE',
            },
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          });
        } else if (res.data.code === 200) {
          navigate("/");

          toast(`Login successfully`, {
            duration: 2000,
            position: "bottom-right",
            icon: "👏",
            iconTheme: {
              primary: '#713200',
              secondary: '#FFFAEE',
            },
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          });

          window.localStorage.setItem("TOKEN", res.data.token);
          window.localStorage.setItem("USERNAME", res.data.username);
          window.localStorage.setItem("EMAIL", res.data.email);
          window.localStorage.setItem("USER_ID", res.data.userId);
        }
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

      } finally {
        setLoading(false)
      }
    } else {
      toast.error(`All field are required `, {
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
    <>
      <header className="register_header">
        <div className="header_tabs">
          <Link to="/login" className="tab">
            Login
          </Link>
          <Link to="/register" className="tab active">
            Register
          </Link>
        </div>
      </header>

      {/* Register Form */}
      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="register_container">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <p className="subtitle">Enter your details to get started</p>


          <div className="input_group">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email" placeholder="Enter your email" />
          </div>

          <div className="input_group">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" placeholder="Enter your password" />
          </div>

          <button type="submit" className="submit_btn">
            {loading ? "Loading..." : ' Login'}
          </button>


        </form>
      </motion.main>
    </>
  )
}

export default Login