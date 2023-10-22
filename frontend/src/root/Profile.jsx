import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NavigationBtn from "../components/NavigationBtn";
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Table, TableCell, TableRow, TableContainer, Paper } from "@mui/material";
import { apiCall, checkEmail, checkName, checkSkills, checkWorkRight, fileToDataUrl } from "../components/HelpFunctions";
import { Pagebackground } from "../components/StyledElement";

function Profile() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [workRight, setWorkRight] = React.useState([]);
  const [skill, setSkill] = React.useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [avatarUrl, setAvatarUrl] = React.useState("https://d2w9rnfcy7mm78.cloudfront.net/8040974/original_ff4f1f43d7b72cc31d2eb5b0827ff1ac.png?1595022778?bc=0");

  useEffect(() => {
    apiCall(`/profile`, "GET").then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setEmail(data.email);
        setName(data.name);
        setWorkRight(data.work_rights)
        setSkill(data.skill)
      }
    });
  }, []);

  async function updateProfile() {
    const res = apiCall(`/profile`, "PUT", { name: name, work_rights: workRight, skill: skill, avatarUrl: avatarUrl });
    res.then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        console.log(data);
      }
    });
  }

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (workRight.includes(value)) {
      setWorkRight(workRight.filter((item) => item !== value));
    } else {
      setWorkRight([...workRight, value]);
    }
  };

  function checkProfile() {
    if (isEditing) {
      if (checkEmail(email) && checkWorkRight(workRight) && checkSkills(skill)) {
        updateProfile();
      }
    }
    setIsEditing(!isEditing);
  }

  const handleReplaceAvatar = () => {
    setAvatarUrl(null);
  };

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Pagebackground>My Profile</Pagebackground>
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
        {isEditing && (
          <>
            <FormControl style={{ textAlign: "center", position: "relative" }}>
              <div style={{ width: "130px", height: "130px", border: "2px solid #3489db", borderRadius: "50%", overflow: "hidden" }}>
                <img src={avatarUrl} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} />
              </div>
              {!avatarUrl && (
                <div>
                  <label htmlFor="upload" style={{ backgroundColor: "#3498db", padding: "5px 10px", borderRadius: "5px", marginBottom: "10px" }}>
                    Upload
                  </label>
                  <input
                    type="file"
                    id="upload"
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={async (e) => {
                      setAvatarUrl(await fileToDataUrl(e.target.files[0]));
                    }}
                    style={{ display: "none" }}
                  />
                </div>
              )}
              {avatarUrl && (
                <Button htmlFor="upload" onClick={handleReplaceAvatar} style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "transparent", color: "#3489db" }}>
                  Replace
                </Button>
              )}
            </FormControl>
            <br></br>
            <FormControl style={{ width: "400px", backgroundColor: "#F5F5F5", borderRadius: "10px", padding: "100px" }}>
              <FormLabel style={{ fontWeight: "bold", color: "black" }}>Email:</FormLabel>
              <TextField
                id="filled-basic"
                label="email"
                variant="filled"
                value={email}
                style={{ width: "400px" }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled
              />
              <br></br>
              <FormLabel style={{ fontWeight: "bold", color: "black" }}>Name:</FormLabel>
              <TextField
                id="filled-basic"
                label="name"
                variant="filled"
                value={name}
                style={{ width: "400px" }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <br></br>
              <FormLabel style={{ fontWeight: "bold", color: "black" }}>WorkRights</FormLabel>
              <FormGroup value={workRight}>
                <FormControlLabel control={<Checkbox />} label="Monday" value="Monday" checked={workRight.includes("Monday")} onChange={handleCheckboxChange} />
                <FormControlLabel control={<Checkbox />} label="Tuesday" value="Tuesday" checked={workRight.includes("Tuesday")} onChange={handleCheckboxChange} />
                <FormControlLabel control={<Checkbox />} label="Wenesday" value="Wenesday" checked={workRight.includes("Wenesday")} onChange={handleCheckboxChange} />
                <FormControlLabel control={<Checkbox />} label="Thursday" value="Thursday" checked={workRight.includes("Thursday")} onChange={handleCheckboxChange} />
                <FormControlLabel control={<Checkbox />} label="Friday" value="Friday" checked={workRight.includes("Friday")} onChange={handleCheckboxChange} />
                <FormControlLabel control={<Checkbox />} label="Saturday" value="Saturday" checked={workRight.includes("Saturday")} onChange={handleCheckboxChange} />
                <FormControlLabel control={<Checkbox />} label="Sunday" value="Sunday" checked={workRight.includes("Sunday")} onChange={handleCheckboxChange} />
              </FormGroup>
              <br></br>
              <FormLabel style={{ fontWeight: "bold", color: "black" }}>Skills:</FormLabel>
              <TextField
                id="filled-basic"
                style={{ width: "400px", borderWidth: "1px", borderStyle: "solid" }}
                value={skill}
                multiline
                rows={4}
                onChange={(e) => {
                  setSkill(e.target.value);
                }}
              />
            </FormControl>
          </>
        )}
        {!isEditing && (
          <TableContainer component={Paper} style={{ border: "2px solid #c0c0c0" }}>
            <Table>
              <TableRow>
                <TableCell>Email:</TableCell>
                <TableCell>{email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name:</TableCell>
                <TableCell>{name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Workright:</TableCell>
                <TableCell>{workRight.join(',')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Skills</TableCell>
                <TableCell>{skill}</TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        )}
        <Button id="registerbutton" role="profile" variant="contained" color="success" onClick={checkProfile} sx={{ marginTop: "30px" }}>
          {isEditing ? "Save" : "Edit"}
        </Button>
      </Box>
    </>
  );
}

export default Profile;
