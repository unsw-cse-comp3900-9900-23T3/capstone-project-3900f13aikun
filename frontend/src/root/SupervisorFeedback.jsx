import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn"
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from "../components/StyledElement";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function SupervisorFeedback() {
  const [demoFeedback, setDemoFeedback] = useState(""); // demo_feedback
  const [finalFeedback, setFinalFeedback] = useState(""); // final_feedback
  const [role, setRole] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleSubmit = () => {
    apiCall(`/feedback`, "POST", {
      project_id: id,
      demo_feedback: demoFeedback,
      final_feedback: finalFeedback,
    }).then((res) => {
      navigate(`/project-delivery/${id}`)
    });
  }

  const getFeedbackInfo = () => {
    apiCall(`/feedback/${id}`, "GET").then((res) => {
      setDemoFeedback(res.demo_feedback);
      setFinalFeedback(res.final_feedback);
    });
  }

  useEffect(() => {
    if (id) {
      getFeedbackInfo();
    }
  }, []);

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Pagebackground>Supervisor Feedback</Pagebackground>
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
        <Typography variant="h6" gutterBottom color="royalblue" style={{marginRight: "350px"}}>
          Demo Feedback:
        </Typography>
        <TextField
          // label="Demo feedback"
          variant="filled"
          multiline
          rows={8}
          value={demoFeedback}
          style={{ width: "500px", color: role !== 3 ? "black" : "inherit" }}
          disabled={role !== 3}
          onChange={(e) => {
            setDemoFeedback(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <Typography variant="h6" gutterBottom color="royalblue" style={{marginRight: "350px"}}>
          Final Feedback:
        </Typography>
        <TextField
          // label="Demo feedback"
          variant="filled"
          multiline
          rows={8}
          value={finalFeedback}
          style={{ width: "500px"}}
          disabled={role !== 3}
          onChange={(e) => {
            setFinalFeedback(e.target.value);
          }}
        />
        {role === 3 ? (
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: "30px" }}
            onClick={() => {
              handleSubmit();
            }}>
            Submit
          </Button>
        ) : null}
      </Box>
    </>
  )
}

export default SupervisorFeedback;