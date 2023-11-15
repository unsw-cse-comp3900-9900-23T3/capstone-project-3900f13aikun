import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn"
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from "../components/StyledElement";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { getJobType, getOpportunityType, getPaymentType, getUniType} from "../components/EnumMap";

function ProjectDelivery() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [proInfo, setProInfo] = React.useState({});
  const [indInfo, setIndInfo] = React.useState('');
  const [supInfo,setSupInfo] = React.useState('');

  
  useEffect(() => {
    const res = apiCall(`/applyProject/${id}`,'Get');
    res.then(data => {
      if(data.error) {
        alert(data.error);
      } else {
        console.log(data);
        setProInfo(data);
        apiCall(`/user/${data.teacher.user_id}`,'Get').then(res => {
          if(res.error) {
            alert(res.error);
          } else {
            setSupInfo(res)
          }
        })

        apiCall(`/user/${data.project.user_id}`,'Get').then(res => {
          if(res.error) {
            alert(res.error);
          } else {
            setIndInfo(res)
            console.log(res)
          }
        })
      }
    })

 

  },[])
  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Pagebackground>My Project</Pagebackground>
      <Box sx={{ paddingX: 10, paddingY: 5, marginRight: "100px" }}>
        <Typography variant="h6" gutterBottom color="royalblue">
          Project Information:
        </Typography>
        <Card sx={{ maxWidth: 600, minWidth: 400, border: '2px solid lightgray' }}>
          <CardContent>
            <Typography
              sx={{ textDecorationLine: "underline", cursor: "pointer" }}
              gutterBottom
              variant="h5"
              component="div"
              >
                {proInfo.project && proInfo.project.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Location: <span style={{ color: '#555' }}>{proInfo.project && proInfo.project.location}</span>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Project type: <span style={{ color: '#555' }}>{proInfo.project && getJobType( proInfo.project.job_classification)}</span>
            </Typography>
            <Typography variant="body1" gutterBottom>
            {proInfo.project && getOpportunityType(proInfo.project.opportunity_type)} | {proInfo.project && getPaymentType(proInfo.project.payment_type)}
            </Typography>
          </CardContent>
        </Card>
        <br></br>
        <Typography variant="h6" gutterBottom color="royalblue">
          Project Members Information:
        </Typography>
        <Typography
          sx={{ cursor: "pointer" }}
          gutterBottom
          variant="body1"
          component="div"
        >
          <span style={{ marginRight: '20px' }}>&#8226;</span>
          Student Group Name: {proInfo.Group ? <span style={{ textDecoration: "underline" }}>{proInfo.Group.name}</span> : <span>None</span>}
        </Typography>
        <Typography
          sx={{ cursor: "pointer" }}
          gutterBottom
          variant="body1"
          component="div"
          onClick={() => {
            navigate();
          }}>
          <span style={{ marginRight: '20px' }}>&#8226;</span>
          Student Leader: {proInfo.Group ? <span style={{ textDecoration: "underline" }}>{proInfo.Group.name}</span> : <span>None</span>}
        </Typography>
        <Typography
          sx={{ cursor: "pointer" }}
          gutterBottom
          variant="body1"
          component="div"
          onClick={() => {
            navigate();
          }}>
          <span style={{ marginRight: '20px' }}>&#8226;</span>
          Industry Partner: <span style={{ textDecoration: "underline" }}>{indInfo.name}</span>({indInfo.email})
        </Typography>
        <Typography
          sx={{ cursor: "pointer" }}
          gutterBottom
          variant="body1"
          component="div"
          onClick={() => {
            navigate();
          }}>
          <span style={{ marginRight: '20px' }}>&#8226;</span>
          Academic Supervisor: <span style={{ textDecoration: "underline" }}>{supInfo.name}</span>({supInfo.email})
        </Typography>
        <br></br>
        <Typography variant="h6" gutterBottom color="royalblue">
          Project Delivery:
        </Typography>
        <Typography variant="body1" component="div">
          <span style={{ marginRight: '20px' }}>&#8226;</span>
          The industry partner will send the initial project documents to the student's (or group leader) email address.
        </Typography>
        <Typography variant="body1" component="div">
          <span style={{ marginRight: '20px' }}>&#8226;</span>
          Students can send a demo of the project to the email address of their academic supervisor and industry partners.
        </Typography>
        <Typography variant="body1" component="div">
          <span style={{ marginRight: '20px' }}>&#8226;</span>
          Students can send the final project results to the email address of their academic supervisor and industry partners.
        </Typography>
        <Typography variant="body1" component="div">
          <span style={{ marginRight: '20px' }}>&#8226;</span>
          If there is an unequal contribution between students please email the academic supervisor of the project.
        </Typography>
        <br></br>
        <Typography variant="h6" gutterBottom color="royalblue">
          Project Feedback:
        </Typography>
        <Typography
          sx={{ cursor: "pointer" }}
          gutterBottom
          variant="body1"
          component="div"
          onClick={() => {
            navigate("/supervisor-feedback");
          }}>
          <span style={{ marginRight: '20px' }}>&#8226;</span>
          <span style={{ textDecoration: "underline", color: "#8000FF" }}>Academic Supervisor Feedback</span>
        </Typography>
        <Typography
          sx={{ cursor: "pointer" }}
          gutterBottom
          variant="body1"
          component="div"
          onClick={() => {
            navigate("/supervisor-accessment");
          }}>
          <span style={{ marginRight: '20px' }}>&#8226;</span>
          <span style={{ textDecoration: "underline", color: "#8000FF" }}>Academic Supervisor Accessment</span>
        </Typography>
        <Typography
          sx={{ cursor: "pointer" }}
          gutterBottom
          variant="body1"
          component="div"
          onClick={() => {
            navigate("/industry-accessment");
          }}>
          <span style={{ marginRight: '20px' }}>&#8226;</span>
          <span style={{ textDecoration: "underline", color: "#8000FF" }}>Industry Partner Accessment</span>
        </Typography>
      </Box>
    </>
  )
}

export default ProjectDelivery;