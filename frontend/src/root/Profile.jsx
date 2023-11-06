import React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NavigationBtn from "../components/NavigationBtn";
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Table, TableCell, TableRow, TableContainer, Paper } from "@mui/material";
import { apiCall, checkEmail, checkSkills, checkWorkRight, fileToDataUrl } from "../components/HelpFunctions";
import { Pagebackground } from "../components/StyledElement";

function Profile() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [workRight, setWorkRight] = React.useState([]);
  const [intention, setIntention] = React.useState([]);
  const [skill, setSkill] = React.useState("");

  const [avatarUrl, setAvatarUrl] = React.useState("");

  React.useEffect(() => {
    apiCall(`/profile`, "GET").then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setEmail(data.email);
        setName(data.name);
        setWorkRight(data.work_rights || []);
        setSkill(data.skill);
        setAvatarUrl(data.avatarUrl);
        setIntention(data.project_intention || []);
      }
    });
  }, []);

  async function updateProfile() {
    const res = apiCall(`/profile`, "PUT", {
      name: name,
      work_rights: workRight,
      skill: skill,
      avatarUrl: avatarUrl,
      project_intention: intention,
    });
    res.then((data) => {
      navigate("/profile-detail");
    });
    return;
  }

  const handleCheckbox1 = (event) => {
    const value = parseInt(event.target.value);
    if (!workRight) {
      setWorkRight([value]);
    } else if (workRight.includes(value)) {
      setWorkRight(workRight.filter((item) => item !== value));
    } else {
      setWorkRight([...workRight, value]);
    }
  };

  const handleCheckbox2 = (event) => {
    const value = parseInt(event.target.value); 
    if (!intention) {
      setIntention([value]);
    } else if (intention.includes(value)) {
      setIntention(intention.filter((item) => item !== value));
    } else {
      setIntention([...intention, value]);
    }
  };

  function checkProfile() {
    if (checkEmail(email) && checkWorkRight(workRight) && checkSkills(skill)) {
      updateProfile();
    }
  }

  const handleReplace = () => {
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
            <Button htmlFor="upload" onClick={handleReplace} style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "transparent", color: "#3489db" }}>
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
            <FormControlLabel control={<Checkbox />} label="Monday" value={1} checked={workRight !== null && workRight.includes(1)} onChange={handleCheckbox1} />
            <FormControlLabel control={<Checkbox />} label="Tuesday" value={2} checked={workRight !== null  && workRight.includes(2)} onChange={handleCheckbox1} />
            <FormControlLabel control={<Checkbox />} label="Wednesday" value={3} checked={workRight !== null  && workRight.includes(3)} onChange={handleCheckbox1} />
            <FormControlLabel control={<Checkbox />} label="Thursday" value={4} checked={workRight !== null  && workRight.includes(4)} onChange={handleCheckbox1} />
            <FormControlLabel control={<Checkbox />} label="Friday" value={5} checked={workRight !== null  && workRight.includes(5)} onChange={handleCheckbox1} />
            <FormControlLabel control={<Checkbox />} label="Saturday" value={6} checked={workRight !== null  && workRight.includes(6)} onChange={handleCheckbox1} />
            <FormControlLabel control={<Checkbox />} label="Sunday" value={7} checked={workRight !== null  && workRight.includes(7)} onChange={handleCheckbox1} />
          </FormGroup>
          <br></br>
          <FormLabel style={{ fontWeight: "bold", color: "black" }}>Project Intention</FormLabel>
          <FormGroup value={intention}>
            <FormControlLabel control={<Checkbox />} label="Information Technology" value={1} checked={intention !== null  && intention.includes(1)} onChange={handleCheckbox2} />
            <FormControlLabel control={<Checkbox />} label="Accounting" value={2} checked={intention !== null  && intention.includes(2)} onChange={handleCheckbox2} />
            <FormControlLabel control={<Checkbox />} label="Banking" value={3} checked={intention !== null  && intention.includes(3)} onChange={handleCheckbox2} />
            <FormControlLabel control={<Checkbox />} label="Engineering" value={4} checked={intention !== null  && intention.includes(4)} onChange={handleCheckbox2} />
            <FormControlLabel control={<Checkbox />} label="Sport" value={5} checked={intention !== null  && intention.includes(5)} onChange={handleCheckbox2} />
            <FormControlLabel control={<Checkbox />} label="Business" value={6} checked={intention !== null  && intention.includes(6)} onChange={handleCheckbox2} />
            <FormControlLabel control={<Checkbox />} label="Media" value={7} checked={intention !== null && intention.includes(7)} onChange={handleCheckbox2} />
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

        <Button id="registerbutton" role="profile" variant="contained" color="success" onClick={checkProfile} sx={{ marginTop: "30px" }}>
          Save
        </Button>
      </Box>
    </>
  );
}

export default Profile;
