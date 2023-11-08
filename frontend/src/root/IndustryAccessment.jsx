import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn"
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from "../components/StyledElement";
import Box from "@mui/material/Box";
import { FormControl, FormLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function IndustryAccessment() {
  const [stuExperience, setStuExperience] = useState(""); // student_experience
  const [supExperience, setSupExperience] = useState(""); // supervisor_experience
  const [role, setRole] = useState("")

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      const res = apiCall(`/profile`, "GET");
      res.then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setRole(data.role);
        }
      });
    }
  }, [role]);

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Pagebackground>Industry Accessment</Pagebackground>
      <Box
        component="form"
        sx={{
          py: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
        }}
        noValidate
        autoComplete="off">
        {role === 1 || role === 2 ? (
          <>
            <Typography variant="h6" gutterBottom color="royalblue" style={{ marginRight: "270px" }}>
              Experience with students:
            </Typography>
            <TextField
              variant="filled"
              multiline
              rows={8}
              value={stuExperience}
              style={{ width: "500px" }}
              disabled={role !== 2}
              onChange={(e) => {
                setStuExperience(e.target.value);
              }}
            />
          </>
        ) : null}
        <br></br>
        <br></br>
        {role === 3 || role === 2 ? (
          <>
            <Typography variant="h6" gutterBottom color="royalblue" style={{ marginRight: "160px" }}>
              Experience with academic supervisor:
            </Typography>
            <TextField
              variant="filled"
              multiline
              rows={8}
              value={supExperience}
              style={{ width: "500px" }}
              disabled={role !== 2}
              onChange={(e) => {
                setSupExperience(e.target.value);
              }}
            />
          </>
        ) : null}
        {role === 2 ? (
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: "30px" }}
            onClick={() => {
              // checkProjects();
            }}>
            Submit
          </Button>
        ) : null}
      </Box>
    </>
  )
}

export default IndustryAccessment;