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
import { Pagebackground } from "../components/StyledElement";

export default function MyCreatedProject() {
  const navigate = useNavigate();

  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    apiCall(`/project`, "GET").then((res) => {
      setProjects(res);
    });
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
          variant="contained"
          color="success"
          onClick={() => {
            navigate("/create-project");
          }}>
          New Project
        </Button>
        <Box sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 5 }}>
          <Typography>the total numbers of projects: {projects.length}</Typography>
          {projects.map((item) => (
            <Card sx={{ maxWidth: 600, minWidth: 400 }}>
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
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {item.problem_statement}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    navigate(`/edit-project/${item.id}`);
                  }}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
