import InitialDash from "./InitialDash";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavigationBtn from "../components/NavigationBtn";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { apiCall } from "../components/HelpFunctions";
import { getJobType, getPaymentType, getOpportunityType } from "../components/EnumMap";

function ProjectDetail() {
  const { id } = useParams();
  const [projectInfo, setProjectInfo] = useState({});
  const navigate = useNavigate();
  const [role, setRole] = React.useState(0);
  
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const res = apiCall(`/profile`, 'GET')
      res.then((data) => {
        if (data.error) {
          alert(data.error)
        } else {
          setRole(data.role)
        }
      })
    }
  });

  const getProjectInfo = () => {
    apiCall(`/project/${id}`, "GET").then((res) => {
      setProjectInfo(res);
    });
  };

  const handleSave = () => {
    apiCall(`/saved/project/${id}`, "GET").then((res) => {
      setProjectInfo(res);
    });
  };

  useEffect(() => {
    getProjectInfo();
  }, []);

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Box sx={{ paddingX: 10, paddingY: 5, marginRight: '200px' }}>
        <Typography variant="h3" gutterBottom>
          {projectInfo.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Location: <span style={{ color: '#555' }}>{projectInfo.location}</span>
        </Typography>
        <Typography variant="body1" gutterBottom>
          Project type: <span style={{ color: '#555' }}>{getJobType(projectInfo.job_classification)}</span>
        </Typography>
        <Typography variant="body1" gutterBottom>
          {getOpportunityType(projectInfo.opportunity_type)} | {getPaymentType(projectInfo.payment_type)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span style={{ color: 'gray' }}>Posted 12h ago</span>
        </Typography>
      
        <Box sx={{ display: "flex", gap: 8, my: 2 }}>
          <Button variant="contained" onClick={() => navigate('/Application')} disabled={role===2}>Apply</Button>
          <Button variant="outlined" onClick={() => handleSave()}>Save</Button>
        </Box>
        
        <br></br>
        <Typography variant="h6" gutterBottom>
          Problem statement
          <br></br>
          <span style={{ color: '#555', fontSize: '16px' }}>{projectInfo.problem_statement}</span>
        </Typography>
        <br></br>
        <Typography variant="h6" gutterBottom>
          Avalability Requirement
          <br></br>
          <span style={{ color: '#555', fontSize: '16px' }}>{projectInfo.requirement}</span>
        </Typography>
        <br></br>
        <Typography variant="h6" gutterBottom>
          Desired outcomes
          <br></br>
          <span style={{ color: '#555', fontSize: '16px' }}>{projectInfo.desired_outcomes}</span>
        </Typography>
        <br></br>
        <Typography variant="h6" gutterBottom>
          Potential deliverable
          <br></br>
          <span style={{ color: '#555', fontSize: '16px' }}>{projectInfo.potential_deliverable}</span>
        </Typography>
        <br></br>
        <Typography variant="h6" gutterBottom>
          Expected delivery cycle
          <br></br>
          <span style={{ color: '#555', fontSize: '16px' }}>{projectInfo.expected_delivery_cycle}</span>
        </Typography>

      </Box>
    </>
  );
}

export default ProjectDetail;
