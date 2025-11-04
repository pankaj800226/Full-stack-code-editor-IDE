import SideHeader from "../components/SideHeader";
import { Link } from "react-router-dom";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Eye } from "lucide-react";

const User: React.FC = () => {
    const allQuiz = [
        {
            _id: "wefwfwf",
            username: "coder hii",

        },
    ];

    return (
        <div className="dashboard_container">
            <SideHeader />
            <main className="dashboard_main">
                <Box sx={{ minHeight: '100vh', bgcolor: '#151515', color: '#fff', p: 3 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#4cafef' }}>
                        User Management
                    </Typography>

                    <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e', borderRadius: 2 }}>
                        <Table sx={{ minWidth: 300 }} aria-label="AI quiz table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: '#bbb' }}>#</TableCell>
                                    <TableCell sx={{ color: '#bbb' }}>Courses</TableCell>
                                    <TableCell sx={{ color: '#bbb' }}>Courses</TableCell>
                                    <TableCell sx={{ color: '#bbb' }}>Actions</TableCell>
                                    <TableCell sx={{ color: '#bbb' }}>See</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allQuiz.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ color: '#999' }}>
                                            No quiz found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    allQuiz.map((q, index) => (
                                        <TableRow key={q._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            <TableCell sx={{ color: '#fff' }}>{index + 1}</TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: 300,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    color: '#fff'
                                                }}
                                            >
                                                {q.username}
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                                                    <Typography sx={{ fontSize: 13, color: '#ddd' }}>wefw</Typography>

                                                </Box>
                                            </TableCell>



                                            <TableCell>
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Link to={'/edit'} style={{ textDecoration: 'none' }}>
                                                        <IconButton aria-label="edit" size="small" sx={{ bgcolor: '#2a2a2a', color: '#4cafef', "&:hover": { bgcolor: '#3a3a3a' } }}>
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </Link>



                                                    <IconButton aria-label="delete" size="small" sx={{ bgcolor: '#2a2a2a', color: '#ff4d4f', "&:hover": { bgcolor: '#5a0000' } }}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>

                                            <TableCell>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3, cursor: "pointer" }}>
                                                    <Link to={'/coursesDetails'}>
                                                        <Typography sx={{ fontSize: 13, color: '#ddd' }}>
                                                            <Eye />
                                                        </Typography>

                                                    </Link>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </main>
        </div>
    );
};

export default User;
