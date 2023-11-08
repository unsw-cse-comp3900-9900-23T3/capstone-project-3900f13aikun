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

function SupervisorAccessment() {
  const [evaluation, setEvaluation] = useState(""); // evaluating_deliverables 
  const [problems, setProblrms] = useState("");     // problems
  const [contributions, setContributions] = useState(""); // contributions
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
      <Pagebackground>Supervisor Accessment</Pagebackground>
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
        <Typography variant="h6" gutterBottom color="royalblue" style={{ marginRight: "285px" }}>
          Evaluating deliverables:
        </Typography>
        <TextField
          variant="filled"
          multiline
          rows={6}
          value={evaluation}
          style={{ width: "500px" }}
          disabled={role !== 3}
          onChange={(e) => {
            setEvaluation(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <Typography variant="h6" gutterBottom color="royalblue" style={{ marginRight: "300px" }}>
          Problem-solving skills:
        </Typography>
        <TextField
          variant="filled"
          multiline
          rows={6}
          value={problems}
          style={{ width: "500px" }}
          disabled={role !== 3}
          onChange={(e) => {
            setProblrms(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <Typography variant="h6" gutterBottom color="royalblue" style={{ marginRight: "310px" }}>
          Overall contributions:
        </Typography>
        <TextField
          variant="filled"
          multiline
          rows={6}
          value={contributions}
          style={{ width: "500px" }}
          disabled={role !== 3}
          onChange={(e) => {
            setContributions(e.target.value);
          }}
        />
        {role === 3 ? (
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

export default SupervisorAccessment;