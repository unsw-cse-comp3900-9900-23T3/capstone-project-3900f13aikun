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
import Button from "@mui/material/Button";

function MyProject() {
  const navigate = useNavigate();
  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Pagebackground>My Project</Pagebackground>
      <Box sx={{ paddingX: 10, paddingY: 5, marginRight: "100px" }}>
        <Card sx={{ maxWidth: 600, minWidth: 400, border: '2px solid lightgray' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom component="div">
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
          <CardActions>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                navigate('/project-delivery/:id');
              }}>
              Enter
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  )
}

export default MyProject;