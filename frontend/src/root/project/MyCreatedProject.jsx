import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBtn from "../../components/NavigationBtn";
import { apiCall } from "../../components/HelpFunctions";
import { Pagebackground } from "../../components/StyledElement";
import { getJobType, getPaymentType, getOpportunityType } from "../../components/EnumMap";

export default function MyCreatedProject() {
  const navigate = useNavigate();
  const [projects, setProjects] = React.useState([]);

  const getProInfo = () => {
    apiCall(`/project-created`, "GET").then((res) => {
      setProjects(res);
    });
  };

  const handleDelete = (id) => {
    apiCall(`/project/${id}`, "DELETE").then((res) => {
      if (res.message === "success") {
        getProInfo();
      }
    });
  }

  React.useEffect(() => {
    getProInfo();
  }, []);

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Pagebackground>My Create Projects</Pagebackground>
      <Box
        sx={{
          py: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Button
          sx={{ marginTop: "20px", left: "500px" }}
          variant="contained"
          color="success"
          onClick={() => {
            navigate("/create-project");
          }}>
          + New Project
        </Button>
        <Box sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 5, alignItems: "center" }}>
          <Typography>The total numbers of projects: {projects.length}</Typography>
          {projects.map((item) => (
            <Card sx={{ maxWidth: 600, minWidth: 400, border: '2px solid lightgray' }}>
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
                <Box sx={{ display: "flex", gap: 5 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      navigate(`/edit-project/${item.id}`);
                    }}>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                      handleDelete(item.id);
                    }}>
                    Delete
                  </Button>
                </Box>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
