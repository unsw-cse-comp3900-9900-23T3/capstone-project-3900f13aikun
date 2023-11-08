import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from "../components/StyledElement";
import { getJobType, getPaymentType, getOpportunityType } from "../components/EnumMap";

function RecommendProjects() {

  const navigate = useNavigate();

  const [recProjects, setRecProjects] = React.useState([]);

  const getRecProjects = () => {
    apiCall(`/recommend/project`, "GET").then((res) => {
      setRecProjects(res);
    });
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

  React.useEffect(() => {
    getRecProjects();
  }, []);

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Pagebackground>Recommend Projects</Pagebackground>
      <Box
        sx={{
          py: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Box sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 5 }}>
          <Typography>The total numbers of recommend projects: {recProjects.length}</Typography>
          {recProjects.map((item) => (
            <Card key={item.id} sx={{ maxWidth: 600, minWidth: 400, border: '2px solid lightgray' }}>
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
      </Box>
    </>
  );

}

export default RecommendProjects;