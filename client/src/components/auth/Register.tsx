import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../Api/api";

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    if (username && email && password) {
      setLoading(true);
      try {
        const res = await axios.post(`${api}/api/user/register`, { username, email, password })


        if (res.data.code === 409) {
          toast.error(`User already exist  `, {
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
        } else if (res.data.code === 200) {
          navigate('/login')
          toast.success(`Register Sucessfully `, {
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
        setLoading(false);
      }
    } else {
      toast.error(`All field are required `, {
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

    setUsername('')
    setEmail('')
    setPassword('')
  }

  return (
    <>
      {/* Header Tabs */}
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
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <p className="subtitle">Enter your details to get started</p>

          <div className="input_group">
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text" placeholder="Enter your name" />
          </div>

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
            {loading ? 'Loading...' : 'Register'}
          </button>


        </form>
      </motion.main>
    </>
  );
};

export default Register;
