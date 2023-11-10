import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from "../components/StyledElement";
import { getJobType, getPaymentType, getOpportunityType } from "../components/EnumMap";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getIntention, getWorkRights } from "../components/EnumMap";

function SavedLists() {

    const navigate = useNavigate();
    const [role, setRole] = React.useState(0);
    const [savedProjects, setSavedProjects] = React.useState([]);
    const path = useLocation();
    const [savedPage, setSavedPage] = React.useState("");
    const [savedSupervisors, setSavedSupervisors] = React.useState("");

    const handlePage = (page) => {
        setSavedPage(page);
    };

    React.useEffect(() => {
        if (localStorage.getItem("token")) {
            const res = apiCall(`/profile`, "GET");
            res.then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setRole(data.role);
                }
            });
        }
    }, [role]);

    React.useEffect(() => {
        apiCall(`/savedProject`, "GET").then((res) => {
            setSavedProjects(res);
        });
        if (path.pathname === '/saved-projects') {
            setSavedPage('/saved-projects')
        }
    }, []);

    React.useEffect(() => {
        apiCall(`/savedUser`, "GET").then((res) => {
            setSavedSupervisors(res);
        });
        if (path.pathname === '/saved-academic-supervisors') {
            setSavedSupervisors('/saved-academic-supervisors')
        }
    }, []);



    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>Saved Lists</Pagebackground>
            <Box sx={{ position: 'relative', top: '20px' }}>
                <Tabs value={savedPage} aria-label="wrapped label tabs example">
                    <Tab sx={{ fontSize: "15px" }} value={"/saved-projects"} label="Saved Projects" onClick={() => handlePage('/saved-projects')} />
                    {role !== 3 && <Tab value={"/saved-academic-supervisors"} sx={{ fontSize: "15px" }} label="Saved Academic Supervisors" onClick={() => handlePage('/saved-academic-supervisors')} />}
                </Tabs>
            </Box>

            {/* Saved Projects */}
            {savedPage === '/saved-projects' && (savedProjects.length !== 0 ? (
                <Box sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 5, alignItems: "center" }}>
                    <Typography marginTop="50px">The total numbers of projects: {savedProjects.length}</Typography>
                    {savedProjects.map((item) => (
                        <Card sx={{ width: 400, border: '2px solid lightgray' }}>
                            <CardContent>
                                <Typography
                                    sx={{ textDecorationLine: "underline", cursor: "pointer" }}
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    onClick={() => {
                                        navigate(`/project-detail/${item.id}`);
                                    }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Location: <span style={{ color: '#555' }}>{item.location}</span>
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Project type: <span style={{ color: '#555' }}>{getJobType(item.job_classification)}</span>
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {getOpportunityType(item.opportunity_type)} | {getPaymentType(item.payment_type)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            ) : <span style={{ marginTop: "100px", color: "gray", fontSize: "20px" }}>
                No saved projects yet.
            </span>
            )}

            {/* Saved Academic Supervisors*/}
            {savedPage === '/saved-academic-supervisors' && (savedSupervisors.length !== 0 ? (
                <Box sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 5, alignItems: "center" }}>
                    <Typography marginTop="50px">The total numbers of academic supervisors: {savedSupervisors.length}</Typography>
                    {savedSupervisors.map((item) => (
                        <Card key={item.id} sx={{ width: 400, border: '2px solid lightgray' }}>
                            <CardContent>
                                <Typography
                                    sx={{ textDecorationLine: "underline", cursor: "pointer" }}
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    onClick={() => {
                                        navigate(`/profile-detail/${item.saved_user.user_id}`);
                                    }}>
                                    {item.saved_user.name}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Email: <span style={{ color: '#555' }}>{item.saved_user.email}</span>
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    WorkRight: <span style={{ color: '#555' }}>
                                        {Array.isArray(item.saved_user.work_rights) ? item.saved_user.work_rights.map(getWorkRights).join(', ') : ''}
                                    </span>
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Project Intention: <span style={{ color: '#555' }}>
                                        {Array.isArray(item.saved_user.project_intention) ? item.saved_user.project_intention.map(getIntention).join(', ') : ''}
                                    </span>
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ) :
                <span style={{ marginTop: "100px", fontSize: "20px", color: "gray" }}>
                    No saved academic supervisors yet.
                </span>
            )}
        </>
    );

}

export default SavedLists;