import React, { useEffect } from "react";
import NavigationBtn from "../components/NavigationBtn";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { apiCall } from "../components/HelpFunctions";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const Dashbackground = styled("div")({
  backgroundImage: `url('/background.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  width: "1470px",
  height: "300px",
  marginTop: "20px",
  zIndex: "1",
});

const Dashtextfield = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
  background: "white",
  width: "1000px",
  position: "relative",
  top: "40px",
  left: "250px",
  
});

function SearchResult() {
  const navigate = useNavigate();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Dashbackground>
        <Dashtextfield>
          <div style={{ marginRight: "40px" }}>
            <span style={{ position: "relative", top: "45px", left: "130px" }}>
              <b>keywords</b>
            </span>
            <TextField id="outlined-basic" label="Enter key words" variant="outlined" style={{ zIndex: "3", marginTop: "100px", width: "220px" }} />
          </div>
          <div>
            <FormControl sx={{ m: 1, minWidth: 210, marginTop: "109px" }}>
              <InputLabel id="demo-simple-select-helper-label">Any Classification</InputLabel>
              <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={age} label="Classificatgion" onChange={handleChange}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>IT</MenuItem>
                <MenuItem value={20}>ACCOUNTING</MenuItem>
                <MenuItem value={30}>Banking</MenuItem>/
              </Select>
            </FormControl>
          </div>
          <div style={{ marginRight: "30px" }}>
            <span style={{ position: "relative", top: "45px", left: "130px" }}>
              <b>Where</b>
            </span>
            <TextField id="outlined-basic" label="Enter suburb,city or region" variant="outlined" style={{ zIndex: "3", marginTop: "100px", width: "220px" }} />
          </div>

          <Button variant="outlined" color="secondary" sx={{ marginTop: "100px" }}>
            Search
          </Button>
        </Dashtextfield>
      </Dashbackground>
      <Box sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 5 }}>
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography sx={{ textDecorationLine: "underline",cursor:'pointer' }} gutterBottom variant="h5" component="div" onClick={()=>{navigate('/project-detail')}}>
              Anytime Fitness Alphington - Club Manager
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Anytime Fitness Alphington
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              $34 – $37 per hour
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small">
              Save
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography sx={{ textDecorationLine: "underline" }} gutterBottom variant="h5" component="div">
              Anytime Fitness Alphington - Club Manager
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Anytime Fitness Alphington
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              $34 – $37 per hour
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small">
              Save
            </Button>
          </CardActions>
        </Card>


      </Box>
    </>
  );
}

export default SearchResult;
