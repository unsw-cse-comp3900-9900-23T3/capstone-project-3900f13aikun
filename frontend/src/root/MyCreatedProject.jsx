import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Table, TableCell, TableRow, TableHead, TableBody, TableContainer, Paper } from "@mui/material";

export default function MyCreatedProject() {
    const navigate = useNavigate();

    const [projects, setProjects] = React.useState([]);
    const [joinStatus, setJoinStatus] = React.useState({});

    React.useEffect(() => {
        // 假设apiCall是获取项目列表的函数
        apiCall(`/project/${localStorage.getItem("userId")}`, "GET").then((res) => {
            setProjects(res);
        });
    }, []);

    const handleEdit = () => {

    }

    const myProjects = projects.filter((item) => item.creatorId === item.userId);
    const otherProjects = projects.filter((item) => item.creatorId !== item.userId);


    const handleJoin = (projectId) => {
        // 切换加入/离开状态
        setJoinStatus((prevJoinStatus) => ({
            ...prevJoinStatus,
            [projectId]: !prevJoinStatus[projectId],
        }));

        // 处理加入/离开项目的逻辑
        console.log(joinStatus[projectId] ? `Leave project with ID ${projectId}` : `Join project with ID ${projectId}`);
    };

    const handleLeave = (projectId) => {
        // 处理离开项目的逻辑
        console.log(`Leave project with ID ${projectId}`);
        // 从列表中移除项目
        setProjects((prevProjects) => prevProjects.filter((item) => item.id !== projectId));
    };

    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Typography variant="h6" component="div" style={{marginRight: '900px'}}>
                My Group
            </Typography>
            <br></br>
            <TableContainer component={Paper} style={{ maxWidth: 1000, margin: '0 auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project ID</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Job Classification</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myProjects.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>Project {item.id}</TableCell>
                                <TableCell>{item.location}</TableCell>
                                <TableCell>{item.job_classification}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleLeave(item.id)}>
                                        Leave
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <Typography variant="h6" component="div" style={{ marginTop: '20px' }}>
                Other Groups
            </Typography>
            <TableContainer component={Paper} style={{ maxWidth: 1000, margin: '0 auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project ID</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Job Classification</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {otherProjects.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>Project {item.id}</TableCell>
                                <TableCell>{item.location}</TableCell>
                                <TableCell>{item.job_classification}</TableCell>
                                <TableCell>
                                    {joinStatus[item.id] ? (
                                        <Button onClick={() => handleLeave(item.id)}>
                                            Leave
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handleJoin(item.id)}>
                                            Join
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                color="success"
                onClick={() => {
                    navigate("/create-project");
                }}>
                New Project
            </Button>
        </>
    );
}