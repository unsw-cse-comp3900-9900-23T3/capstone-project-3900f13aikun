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
import { Dashbackground, Dashtextfield } from "../components/StyledElement";


function SearchResult() {
  const navigate = useNavigate();
  const [classification, setClassification] = React.useState("");
  const [opportunityType, setOpportunityType] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("");
  const [publishTime, setPublishTime] = React.useState("");

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Dashbackground>
        <Dashtextfield>
          <Box display="flex" flexDirection="column" alignItems="center" marginRight="30px">
            <Box display="flex" alignItems="center">
              <Typography variant="h8" style={{ marginTop: "30px", marginRight: "470px" }}>
                <b>What</b>
              </Typography>
              <Typography variant="h8" style={{ marginTop: "30px", marginRight: "140px" }}>
                <b>Where</b>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" marginRight="100px">
              <TextField
                id="outlined-basic"
                label="Enter keywords"
                variant="outlined"
                style={{ zIndex: "3", width: "210px", marginTop: "10px" }}
              />
              <FormControl sx={{ m: 1, minWidth: 210, marginTop: "18px", left: "40px" }}>
                <InputLabel id="demo-simple-select-helper-label">Any Classification</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Any Classification"
                  value={classification}
                  onChange={(e) => { setClassification(e.target.value); }}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>IT</MenuItem>
                  <MenuItem value={20}>ACCOUNTING</MenuItem>
                  <MenuItem value={30}>Banking</MenuItem>/
                  <MenuItem value={30}>Engineering</MenuItem>/
                  <MenuItem value={30}>Sport</MenuItem>/
                  <MenuItem value={30}>Business</MenuItem>/
                  <MenuItem value={30}>Media</MenuItem>/
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                label="Enter suburb,city or region"
                variant="outlined"
                style={{ zIndex: "3", width: "210px", marginTop: "10px", left: "80px" }}
              />
              <Button variant="outlined" color="secondary" sx={{ marginTop: "10px", left: "120px" }}>
                Search
              </Button>
            </Box>

            <Box display="flex" alignItems="center" marginRight="350px">
              <FormControl sx={{ m: 1, minWidth: 170, marginBottom: "26px" }}>
                <InputLabel sx={{ color: 'purple' }} id="demo-simple-select-helper-label">Opportunity type</InputLabel>
                <Select sx={{ borderRadius: "50px" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper" label="Opportunity type"
                  value={opportunityType}
                  onChange={(e) => { setOpportunityType(e.target.value); }}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Internship</MenuItem>
                  <MenuItem value={2}>Individual Project</MenuItem>
                  <MenuItem value={3}>Group Project</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 150, marginBottom: "26px" }}>
                <InputLabel sx={{ color: 'purple' }} id="demo-simple-select-helper-label">Publish time</InputLabel>
                <Select sx={{ borderRadius: "50px" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Publish time" value={publishTime}
                  onChange={(e) => { setPublishTime(e.target.value); }}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Today</MenuItem>
                  <MenuItem value={2}>Last 3 days</MenuItem>
                  <MenuItem value={3}>Last 7 days</MenuItem>
                  <MenuItem value={4}>Last one month</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 150, marginBottom: "26px" }}>
                <InputLabel sx={{ color: 'purple' }} id="demo-simple-select-helper-label">Payment type</InputLabel>
                <Select sx={{ borderRadius: "50px" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Publish time" value={paymentType}
                  onChange={(e) => { setPaymentType(e.target.value); }}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Paid</MenuItem>
                  <MenuItem value={2}>None-paid</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

        </Dashtextfield>
      </Dashbackground >
      
      <Box sx={{ pt: 5, display: "flex", flexDirection: "column", gap: 5 }}>
        <Typography>the total numbers of projects</Typography>
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography
              sx={{ textDecorationLine: "underline", cursor: "pointer" }}
              gutterBottom
              variant="h5"
              component="div"
              onClick={() => {
                navigate("/project-detail");
              }}>
              Anytime Fitness Alphington - Club Manager
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Anytime Fitness Alphington
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              $34 - $37 per hour
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
              $34 - $37 per hour
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
