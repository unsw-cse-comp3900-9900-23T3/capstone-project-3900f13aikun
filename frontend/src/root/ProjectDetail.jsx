import InitialDash from "./InitialDash";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavigationBtn from "../components/NavigationBtn";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { apiCall } from "../components/HelpFunctions";

function ProjectDetail() {
  const { id } = useParams();
  const [projectInfo, setProjectInfo] = useState({});

  const getProjectInfo = () => {
    apiCall(`/project/${id}`, "GET").then((res) => {
      setProjectInfo(res);
    });
  };

  useEffect(() => {
    getProjectInfo();
  }, []);

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Box sx={{ paddingX: 10, paddingY: 5 }}>
        <Typography variant="h2" gutterBottom>
          {projectInfo.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {projectInfo.problem_statement}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Location: {projectInfo.location}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Opportunit Type: {projectInfo.opportunity_type}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Availability requirement: {projectInfo.requirement}
        </Typography>

        <Box sx={{ display: "flex", gap: 10, my: 5 }}>
          <Button variant="contained">Apply</Button>
          <Button variant="outlined">Save</Button>
        </Box>
      </Box>
    </>
  );
}

export default ProjectDetail;
