import React, { useEffect, useState } from "react";
import SideHeader from "../../../components/SideHeader";
import axios from "axios";
import { api } from "../../../Api/api";
import toast from "react-hot-toast";
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
import Loading from "../../../components/Loading";

interface Quiz {
    _id: string;
    question: string;
    optionOne: string;
    optionTwo: string;
    optionThree: string;
    optionFour: string;
    answer: string;
}

const JsManage: React.FC = () => {
    const [allQuiz, setAllAquiz] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchQuiz = async () => {
        try {
            const response = await axios.get(`${api}/api/javascript/get/quiz`);
            setAllAquiz(response.data || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch quiz");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this quiz item?")) return;
        try {
            await axios.delete(`${api}/api/javascript/delete/${id}`);
            setAllAquiz((preData) => preData.filter((e) => e._id !== id));
            toast.success("Deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Error deleting quiz");
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="dashboard_container">
            <SideHeader />
            <main className="dashboard_main">
                <Box sx={{ minHeight: "100vh", bgcolor: "#151515", color: "#fff", p: 3 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: "#4cafef" }}>
                        JavaScript Quiz Management
                    </Typography>

                    <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e", borderRadius: 2 }}>
                        <Table sx={{ minWidth: 300 }} aria-label="quiz table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: "#bbb" }}>#</TableCell>
                                    <TableCell sx={{ color: "#bbb" }}>Question</TableCell>
                                    <TableCell sx={{ color: "#bbb" }}>Options</TableCell>
                                    <TableCell sx={{ color: "#bbb" }}>Answer</TableCell>
                                    <TableCell sx={{ color: "#bbb" }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allQuiz.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ color: "#999" }}>
                                            No quiz found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    allQuiz.map((q, index) => (
                                        <TableRow key={q._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            <TableCell sx={{ color: "#fff" }}>{index + 1}</TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: 300,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    color: "#fff",
                                                }}
                                            >
                                                {q.question}
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
                                                    <Typography sx={{ fontSize: 13, color: "#ddd" }}>A. {q.optionOne}</Typography>
                                                    <Typography sx={{ fontSize: 13, color: "#ddd" }}>B. {q.optionTwo}</Typography>
                                                    <Typography sx={{ fontSize: 13, color: "#ddd" }}>C. {q.optionThree}</Typography>
                                                    <Typography sx={{ fontSize: 13, color: "#ddd" }}>D. {q.optionFour}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ color: "#90ee90", fontWeight: 500 }}>{q.answer}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: "flex", gap: 1 }}>
                                                    <Link to={`/jsedit/${q._id}`} style={{ textDecoration: "none" }}>
                                                        <IconButton
                                                            aria-label="edit"
                                                            size="small"
                                                            sx={{
                                                                bgcolor: "#2a2a2a",
                                                                color: "#4cafef",
                                                                "&:hover": { bgcolor: "#3a3a3a" },
                                                            }}
                                                        >
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </Link>

                                                    <IconButton
                                                        aria-label="delete"
                                                        size="small"
                                                        onClick={() => handleDelete(q._id)}
                                                        sx={{
                                                            bgcolor: "#2a2a2a",
                                                            color: "#ff4d4f",
                                                            "&:hover": { bgcolor: "#5a0000" },
                                                        }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
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

export default JsManage;
