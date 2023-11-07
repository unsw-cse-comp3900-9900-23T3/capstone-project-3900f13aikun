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

function ProjectDelivery() {
  const navigate = useNavigate();
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
              onClick={() => {
                navigate();
              }}>
              Software Enginnering
            </Typography>
            <Typography variant="body1" gutterBottom>
              Location: <span style={{ color: '#555' }}>Sydney</span>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Project type: <span style={{ color: '#555' }}>Engineering</span>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Group Project | Paid
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
          onClick={() => {
            navigate();
          }}
        >
          <span style={{ marginRight: '20px' }}>&#8226;</span>
          Student Group Name: <span style={{ textDecoration: "underline" }}>Ikun</span>
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
          Student Leader: <span style={{ textDecoration: "underline" }}>Jackson</span>(2780327997@qq.com)
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
          Industry Partner: <span style={{ textDecoration: "underline" }}>Jason</span>(2780327997@qq.com)
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
          Academic Supervisor: <span style={{ textDecoration: "underline" }}>Mike</span>(2780327997@qq.com)
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