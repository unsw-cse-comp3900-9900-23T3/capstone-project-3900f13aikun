import InitialDash from "../InitialDash";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavigationBtn from "../../components/NavigationBtn";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { apiCall } from "../../components/HelpFunctions";
import { getJobType, getPaymentType, getOpportunityType } from "../../components/EnumMap";
import { Pagebackground } from "../../components/StyledElement";

function ProjectDetail() {
  const { id } = useParams();
  const [projectInfo, setProjectInfo] = useState({});
  const navigate = useNavigate();
  const [role, setRole] = React.useState(0);
  const [projectSup, setProjectSup] = useState([]);
  const [isSup, setIsSup] = useState(true);


  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      const res = apiCall(`/profile`, "GET");
      res.then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setRole(data.role);
          if (data.role == 3) {
            const res = apiCall('/applyTeacherProject', 'Get');
            res.then((data) => {
              if (data.error) {
                alert(data.error);
              } else {
                setProjectSup(data)

              }
            })
          }

        }
      });
    }

  }, [role]);

  console.log(projectSup)





  const getProjectInfo = () => {
    apiCall(`/project/${id}`, "GET").then((res) => {
      setProjectInfo(res);
      const res2 = apiCall(`/teacherSup`, "POST", { project_id: id });
      res2.then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          if (data.message == 1) {
            setIsSup(false);
          } else {
            setIsSup(true);
          }

          console.log(data.message)
        }
      })
    });
  };

  const handleSave = () => {
    apiCall(`/saved/project/${id}`, "GET").then((res) => {
      getProjectInfo()
    });
  };
  const handleUnSave = () => {
    apiCall(`/unsaved/project/${id}`, "GET").then((res) => {
      getProjectInfo()
    });
  };

  useEffect(() => {
    getProjectInfo();



  }, []);

  console.log(projectInfo)
  console.log(projectInfo.project_status)

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Pagebackground>Project Details</Pagebackground>
      <Box sx={{ paddingX: 10, paddingY: 5, alignItems: "center", maxWidth: "800px" }}>
        <Typography variant="h4" gutterBottom >
          {projectInfo.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Location: <span style={{ color: "#555" }}>{projectInfo.location}</span>
        </Typography>
        <Typography variant="body1" gutterBottom>
          Project type: <span style={{ color: "#555" }}>{getJobType(projectInfo.job_classification)}</span>
        </Typography>
        <Typography variant="body1" gutterBottom>
          {getOpportunityType(projectInfo.opportunity_type)} | {getPaymentType(projectInfo.payment_type)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span style={{ color: "gray" }}>Posted 1 day ago</span>
        </Typography>

        <Box sx={{ display: "flex", gap: 8, my: 2 }}>
          {role === 1 && (
            <Button
              variant="contained"
              onClick={() => navigate(`/application/${projectInfo.id}`)}
              disabled={localStorage.getItem('applied') || projectInfo.project_status !== 2}
            >
              Apply
            </Button>
          )}
          {role === 3 && (
            <Button
              variant="contained"
              onClick={() => navigate(`/application/${projectInfo.id}`)}
              disabled={!isSup}
            >
              Supervise
            </Button>
          )}


          {localStorage.getItem("token") && !projectInfo.is_saved ? (
            <Button variant="outlined" onClick={() => handleSave()}>
              Save
            </Button>
          ) : null}
          {localStorage.getItem("token") && projectInfo.is_saved ? (
            <Button variant="outlined" onClick={() => handleUnSave()}>
              UnSave
            </Button>
          ) : null}
        </Box>

        <br></br>
        <Typography variant="h6" gutterBottom color="royalblue">
          Problem Statement:
          <br></br>
          <span style={{ color: "#555", fontSize: "16px" }}>{projectInfo.problem_statement}</span>
        </Typography>
        <br></br>
        <Typography variant="h6" gutterBottom color="royalblue">
          Avalability Requirement:
          <br></br>
          <span style={{ color: "#555", fontSize: "16px" }}>{projectInfo.requirement}</span>
        </Typography>
        <br></br>
        <Typography variant="h6" gutterBottom color="royalblue">
          Desired Outcomes:
          <br></br>
          <span style={{ color: "#555", fontSize: "16px" }}>{projectInfo.desired_outcomes}</span>
        </Typography>
        <br></br>
        <Typography variant="h6" gutterBottom color="royalblue">
          Potential Deliverable:
          <br></br>
          <span style={{ color: "#555", fontSize: "16px" }}>{projectInfo.potential_deliverable}</span>
        </Typography>
        <br></br>
        <Typography variant="h6" gutterBottom color="royalblue">
          Expected Delivery Cycle:
          <br></br>
          <span style={{ color: "#555", fontSize: "16px" }}>{projectInfo.expected_delivery_cycle}</span>
        </Typography>
      </Box>
    </>
  );
}

export default ProjectDetail;
