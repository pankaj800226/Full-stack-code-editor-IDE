import { CircleFadingPlus } from "lucide-react"
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
import DisplayFolderChat from "./DisplayFolderChat";
import { useDebounce } from "../../hooks/useDebounceCourse";

interface NewChat {
  _id: string
  folderName: string
}

const NewChat = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [folderName, setFolderName] = useState('')
  const token = localStorage.getItem('TOKEN')
  const [allNewChat, setAllNewChat] = useState<NewChat[]>([])
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, 500)

  const handleCreate = async () => {
    if (folderName) {
      try {
        axios.post(`${api}/api/newChat/create/folder`, { folderName }, {
          headers: { Authorization: `$Bearer ${token}` }
        })

        toast.success(`folder created sucessfully `, {
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
    setFolderName('')
  }




  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await axios.get(`${api}/api/newChat/getNewChat`, {
          headers: { Authorization: `$Bearer ${token}` }

        })
        setAllNewChat(res.data)

      } catch (error) {
        console.log(error);
        setError("Fetching error")
      }
    }
    fetchChat()
  }, [token])


  const filterSearch = allNewChat.filter((f) =>
    f.folderName.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${api}/api/newChat/delete/chat/${id}`)

      setAllNewChat((prev) => prev.filter((d) => d._id !== id))

      toast.success(`Chat Deleted `, {
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

    } catch (error) {
      console.log(error);
      toast.error("error")

    }
  }

  if (error) return <p>{error}</p>

  return (
    <>
      <div className="new_chat_header">
        <input type="text"
          value={search}
          className="input"
          placeholder="Search Folder Name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <CircleFadingPlus onClick={() => setEditDialogOpen(true)} />
      </div>

      {/* all new chat / folder display  */}
      <p style={{ padding: "1rem" }}>Chats</p>

      <DisplayFolderChat
        filterSearch={filterSearch}
        handleDelete={handleDelete}



      />

      <Dialog
        open={editDialogOpen} onClose={() => setEditDialogOpen(false)}
        fullScreen={isMobile}

        fullWidth maxWidth="sm">
        <DialogTitle>New Chat</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Chat Name"
              fullWidth
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
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

export default NewChat