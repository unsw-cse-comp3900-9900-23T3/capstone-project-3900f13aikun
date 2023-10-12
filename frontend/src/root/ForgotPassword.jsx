import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";

const steps = ["Send request code", "Verify code", "Reset password"];

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSendClick = () => {
    apiCall("/sendcode", "POST", { email: email }).then((res) => {
      setActiveStep(1);
    });
  };

  const handleVerifyClick = () => {
    console.log(code);
    if (code) {
      setActiveStep(2);
    }
  };

  const handleResetClick = () => {
    navigate("/login");
  };

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Box sx={{ width: "80%", marginTop: "100px", marginRight: "30px" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <>
          {activeStep === 0 ? (
            <>
              <Box
                component="form"
                sx={{
                  paddingTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                noValidate
                autoComplete="off">
                <TextField
                  label="Email"
                  variant="filled"
                  value={email}
                  style={{ width: "400px" }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: "30px" }}
                  onClick={() => {
                    handleSendClick();
                  }}>
                  Send
                </Button>
              </Box>
            </>
          ) : null}
          {activeStep === 1 ? (
            <>
              <Box
                component="form"
                sx={{
                  paddingTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                noValidate
                autoComplete="off">
                <Typography sx={{ marginBottom: 2 }}>We have already sent the code to your email.</Typography>
                <TextField
                  label="Code"
                  variant="filled"
                  value={code}
                  style={{ width: "400px" }}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: "30px" }}
                  onClick={() => {
                    handleVerifyClick();
                  }}>
                  Verify
                </Button>
              </Box>
            </>
          ) : null}
          {activeStep === 2 ? (
            <>
              <Box
                component="form"
                sx={{
                  paddingTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                noValidate
                autoComplete="off">
                <Typography sx={{ marginBottom: 2 }}>Now you can reset your password.</Typography>
                <TextField
                  label="Password"
                  variant="filled"
                  type="password"
                  value={password}
                  style={{ width: "400px" }}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <br></br>
                <TextField
                  label="Confirm Password"
                  variant="filled"
                  type="password"
                  value={confirmPassword}
                  style={{ width: "400px" }}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />

                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: "30px" }}
                  onClick={() => {
                    handleResetClick();
                  }}>
                  Reset
                </Button>
              </Box>
            </>
          ) : null}
        </>
      </Box>
    </>
  );
}