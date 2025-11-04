import { motion } from 'framer-motion'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from 'react';
import Sidebar from '../components/SideBar';
import axios from 'axios';
import { api } from '../Api/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PracticeGraph from './Compiler/PracticeGraph';

interface ProfileType {
  _id: string
  username: string
  email: string
}

const Profile = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  })
  const token = localStorage.getItem('TOKEN')

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        return navigate('/login')
      }

      try {
        const response = await axios.get(`${api}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        setProfile(response.data)
        setFormData({
          username: response.data.username,
          email: response.data.email
        })
      } catch (error) {
        console.log(error);

      }
    }

    fetchProfile()
  }, [token, navigate])

  const handleEditProfile = async () => {
    const token = localStorage.getItem('TOKEN')

    try {
      const res = await axios.put(`${api}/api/user/updateProfile`, formData, {
        headers: { Authorization: `$Bearer ${token}` }

      })

      setProfile(res.data)
      setEditDialogOpen(false)
      toast.success("Your Profile is updated")
    } catch (error) {
      console.log(error);
      toast.error('error')

    }
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="sidebar_container"
    >
      <Sidebar />
      {/* Content */}
      <main className="main_content">
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="profile_container"
          >
            <div className="profile-content">
              {/* Profile Header */}
              <div className="profile-header">
                <div className="profile-header-inner">
                  <div className="avatar">
                    <p>{profile?.email.charAt(0).toUpperCase()}</p>
                  </div>
                  <div className="user-info">
                    <h1>{profile?.username}</h1>
                    <p className="email">{profile?.email}</p>
                    {/* <p className="email">{profile?.adminFeedbackInput}</p> */}


                    <button onClick={() => setEditDialogOpen(true)}>
                      <Edit />

                    </button>
                  </div>
                </div>
              </div>
            </div>

            <PracticeGraph />


          </motion.div>

          <Dialog
            open={editDialogOpen} onClose={() => setEditDialogOpen(false)}
            fullScreen={isMobile}

            fullWidth maxWidth="sm">
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
              <Stack spacing={2} mt={1}>
                <TextField
                  label="Username"
                  name="username"
                  fullWidth
                  value={formData.username}
                  onChange={handleChange}
                />
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                />

              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleEditProfile}>Update</Button>
            </DialogActions>
          </Dialog>
        </>

      </main>
    </motion.div>
  )
}

export default Profile