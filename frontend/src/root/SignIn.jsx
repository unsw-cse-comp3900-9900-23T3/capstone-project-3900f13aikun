import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { apiCall } from "../components/HelpFunctions";
import { useNavigate, Link } from "react-router-dom";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import NavigationBtn from "../components/NavigationBtn";

// signin page
function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  // login function
  async function login() {
    const data = await apiCall("/login", "POST", { email: email, password: password });
    if (data.error) {
      alert(data.error);
    } else {
      localStorage.setItem("token", data.token);
      let user = await apiCall("/profile", "GET");
      localStorage.setItem("user_id", user.user_id);
      if (user.role === 2) {
        navigate("/dashboard/industryp");
      } else if (user.role === 1) {
        navigate("/dashboard/student");
      } else if (user.role === 3) {
        navigate("/dashboard/academics");
      }
    }
  }

  return (
    <>
      <NavigationBtn></NavigationBtn>

      <div style={{ background: "#E2E6E6", width: "1540px", height: "100%" }}>
        <div style={{ width: "550px", height: "370px", background: "white", margin: "auto", marginTop: "50px" }}>
          <div style={{ position: "relative", top: "10px", left: "220px", marginBottom: "30px", fontSize: "30px" }}>login</div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off">
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              style={{ width: "400px", marginLeft: "60px" }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br></br>
            <TextField
              id="filled-basic"
              type="password"
              label="password"
              variant="filled"
              style={{ width: "400px", marginLeft: "60px" }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br></br>
            <Typography>
              <Link to="/forgot" style={{ marginLeft: "60px" }}>
                Forgot password?
              </Link>
            </Typography>
          </Box>
          <Button id="loginbutton" role="login" variant="contained" color="success" onClick={login} sx={{ marginTop: "30px", marginLeft: "210px" }}>
            login
          </Button>
        </div>
      </div>
    </>
  );
}

export default SignIn;
