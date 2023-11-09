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

function RecommendLists() {

  const navigate = useNavigate();
  const [role, setRole] = React.useState(0);
  const [recProjects, setRecProjects] = React.useState([]);
  const [recSupervisor, setRecSupervsior] = React.useState([]);
  const [RecPage, setRecPage] = React.useState("/recommend-projects");
  const path = useLocation();
  const handleRecPage = (page) => { setRecPage(page); };

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

  // Recmended Projects Function
  const getRecProjects = () => {
    apiCall(`/recommend/project`, "GET").then((res) => {
      setRecProjects(res);
    });
    if (path.pathname === "/recommend-projects") {
      setRecPage("/recommend-projects")
    }
  }

  const handleSave = (id) => {
    apiCall(`/saved/project/${id}`, "GET").then((res) => {
      getRecProjects();
    });
  };

  const handleUnSave = (id) => {
    apiCall(`/unsaved/project/${id}`, "GET").then((res) => {
      getRecProjects();
    });
  };

  // Recmended Supervisors Function
  const getRecSupervisors = () => {
    apiCall(`/recommend/teacher`, "GET").then((res) => {
      setRecSupervsior(res);
      if (path.pathname === "/recommend-academic-supervisors") {
        setRecPage("/recommend-academic-supervisors")
      }
    });
  }

  const handleRecSave = (id) => {
    // apiCall(`/saved/project/${id}`, "GET").then((res) => {
    //   getRecProjects();
    // });
  };

  const handleRecUnSave = (id) => {
    // apiCall(`/unsaved/project/${id}`, "GET").then((res) => {
    //   getRecProjects();
    // });
  };

  React.useEffect(() => {
    getRecProjects();
    getRecSupervisors();
  }, []);

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Pagebackground>Recommend Lists</Pagebackground>
      <Box sx={{ position: 'relative', top: '20px' }}>
        <Tabs value={RecPage} aria-label="wrapped label tabs example">
          <Tab sx={{ fontSize: "15px" }} value={"/recommend-projects"} label="Recommended Projects" onClick={() => handleRecPage('/recommend-projects')} />
          {role !== 3 && <Tab value={"/recommend-academic-supervisors"} sx={{ fontSize: "15px" }} label="Recommended Academic Supervisors" onClick={() => handleRecPage('/recommend-academic-supervisors')} />}
        </Tabs>
      </Box>

      {/* Recommended Projects */}
      {RecPage === '/recommend-projects' && (recProjects.length !== 0 ? (
        <Box sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 5, alignItems: "center" }}>
          <Typography marginTop="50px">The total numbers of recommend projects: {recProjects.length}</Typography>
          {recProjects.map((item) => (
            <Card key={item.id} sx={{ width: 400, border: '2px solid lightgray' }}>
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
                {!item.is_saved && (
                  <Button variant="outlined" onClick={() => handleSave(item.id)}>
                    Save
                  </Button>
                )}
                {item.is_saved && (
                  <Button variant="outlined" onClick={() => handleUnSave(item.id)}>
                    UnSave
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
      ) : <span style={{ marginTop: "100px", color: "gray", fontSize: "20px" }}>
        No recommended projects yet.
      </span>
      )}

      {/* Recommended Academic Supervisors */}
      {RecPage === '/recommend-academic-supervisors' && (recSupervisor.length !== 0 ? (
      <Box sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 5, alignItems: "center" }}>
        <Typography marginTop="50px">The total numbers of recommend academic supervisors: {recSupervisor.length}</Typography>
        {recSupervisor.map((item) => (
          <Card key={item.user_id} sx={{ width: 400, border: '2px solid lightgray' }}>
            <CardContent>
              <Typography
                sx={{ textDecorationLine: "underline", cursor: "pointer" }}
                gutterBottom
                variant="h5"
                component="div"
                onClick={() => {
                  navigate(`/profile-detail/${item.user_id}`);
                }}>
                {item.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Email: <span style={{ color: '#555' }}>{item.email}</span>
              </Typography>
              <Typography variant="body1" gutterBottom>
                WorkRight: <span style={{ color: '#555' }}>
                  {Array.isArray(item.work_rights) ? item.work_rights.map(getWorkRights).join(', ') : ''}
                </span>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Project Intention: <span style={{ color: '#555' }}>
                  {Array.isArray(item.project_intention) ? item.project_intention.map(getIntention).join(', ') : ''}
                </span>
              </Typography>
            </CardContent>
            <CardActions>
              {!item.is_saved && (
                <Button variant="outlined" onClick={() => handleRecSave(item.id)}>
                  Save
                </Button>
              )}
              {item.is_saved && (
                <Button variant="outlined" onClick={() => handleRecUnSave(item.id)}>
                  UnSave
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      </Box>
      ) : <span style={{ marginTop: "100px", color: "gray", fontSize: "20px" }}>
      No recommended academic supervisors yet.
    </span>
    )}
    </>
  );

}

export default RecommendLists;