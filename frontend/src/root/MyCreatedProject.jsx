import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from '../components/StyledElement';

export default function MyCreatedProject() {
    const navigate = useNavigate();

    const [projects, setProjects] = React.useState([]);

    React.useEffect(() => {
        apiCall(`/project/${localStorage.getItem("userId")}`, "GET").then((res) => {
            setProjects(res);
        });
    }, []);

    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>My Create Projects</Pagebackground>
            <Box sx={{
                py: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                        navigate("/create-project");
                    }}>
                    New Project
                </Button>
                <Box sx={{ mt: 3, width: '450px',}}>
                    {projects.map((item) => (
                        <Card key={item.id} sx={{ border: '2px solid', marginBottom: '16px' }}>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>
                                    Project {item.id}
                                </Typography>
                                <Typography color="text.secondary">location: {item.location}</Typography>
                                <Typography color="text.secondary">Job Classification: {item.job_classification}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Edit</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Box>
        </>
    );
}
