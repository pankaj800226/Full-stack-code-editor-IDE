import { CircleFadingPlus } from "lucide-react"
import AllProject from "./AllProject"
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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../Api/api";
import Loading from "../../components/Loading";
const NewProject = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [projectFolder, setProjectName] = useState('')
  const token = localStorage.getItem('TOKEN')

  const [allProject, setAllProject] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)


  const handleCreate = async () => {
    if (projectFolder) {
      try {

        const res = await axios.post(`${api}/api/codepenproject/create/project`, { projectFolder }, {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (res.data) {
          toast.error(`sucessfull`, {
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

          setEditDialogOpen(false)
          setProjectName('')

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
      }
    } else {
      toast.error(`ADD project name `, {
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
  }


  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${api}/api/codepenproject/find/project`, {
          headers: { Authorization: `Bearer ${token}` }

        })
        setAllProject(res.data)
      } catch (error) {
        console.log(error);
        setError("fetching error")

      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [token])

  if (error) return <p>{error}</p>
  if (loading) return <Loading />
  return (
    <>
      <div className="new_chat_header">
        <input type="text"
          className="input"
          placeholder="Search Folder Name"
        />
        <CircleFadingPlus onClick={() => setEditDialogOpen(true)} />
      </div>
      <AllProject
        allProject={allProject}

      />

      <Dialog
        open={editDialogOpen} onClose={() => setEditDialogOpen(false)}
        fullScreen={isMobile}

        fullWidth maxWidth="sm">
        <DialogTitle>New Project</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Project Name"
              fullWidth
              value={projectFolder}
              onChange={(e) => setProjectName(e.target.value)}
            />


          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewProject