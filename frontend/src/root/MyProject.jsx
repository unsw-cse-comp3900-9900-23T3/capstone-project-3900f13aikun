import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn"
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from "../components/StyledElement";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { getJobType, getOpportunityType, getPaymentType, getUniType } from "../components/EnumMap";
import { Box } from "@mui/material";


function MyProject() {
  const navigate = useNavigate();
  const [applyInfo, setApplyInfo] = React.useState([]);
  const [personInfo, setPersonInfo] = React.useState({});


  async function renderApply() {
    const res = apiCall(`/profile`, "GET");
    res.then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setPersonInfo(data);
        if (data.role === 1) {
          const res2 = apiCall('/applyStudentProject', 'Get');
          res2.then((data2) => {
            if (data2.error) {
              alert(data2.error);
            } else {
              setApplyInfo(data2);
            }
          })
        } else {
          const res = apiCall('/applyProject', 'Get');
          res.then((data2) => {
            if (data2.error) {
              alert(data2.error);
            } else {
              setApplyInfo(data2);
            }
          })
        }
      }
    });
  }




  useEffect(() => {
    renderApply();



  }, [])
  console.log(applyInfo);







  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Pagebackground>My Project</Pagebackground>


      {applyInfo.map(data => (<Box sx={{ paddingX: 10, paddingY: 5, marginRight: "100px" }}>
        <Card sx={{ maxWidth: 600, minWidth: 400 }}>
          {data.apply_status === 1
            ? <> <CardContent>
              <Typography variant="h5" gutterBottom component="div">
                {data.project.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Location: <span style={{ color: '#555' }}>{data.project.location}</span>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Project type: <span style={{ color: '#555' }}>{getJobType(data.project.job_classification)}</span>
              </Typography>
              <Typography variant="body1" gutterBottom>
                {getOpportunityType(data.project.opportunity_type)} | {getPaymentType(data.project.payment_type)}
              </Typography>
            </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    navigate(`/project-delivery/${data.id}`);
                  }}>
                  Enter
                </Button>
              </CardActions></>
            : null}

        </Card>
      </Box>))}


    </>
  )

}

export default MyProject;