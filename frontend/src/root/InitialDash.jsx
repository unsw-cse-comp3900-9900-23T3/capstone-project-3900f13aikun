import React, { useEffect } from "react";
import NavigationBtn from "../components/NavigationBtn";
import { useNavigate, useParams } from "react-router-dom";
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
import { getJobType, getPaymentType, getOpportunityType } from "../components/EnumMap";
import Box from "@mui/material/Box";
import { Dashbackground, Dashtextfield } from "../components/StyledElement";
import Stack from '@mui/material/Stack';

const InitialDash = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [classification, setClassification] = React.useState("");
  const [opportunityType, setOpportunityType] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("");
  const [publishTime, setPublishTime] = React.useState("");
  const [projectList, setProjectList] = React.useState([]);
  const [role, setRole] = React.useState(0);
  const [recProjects, setRecProjects] = React.useState([]);
  const [savedProjects, setSavedProjects] = React.useState([]);

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

  React.useEffect(() => {
    apiCall(`/savedProject`, "GET").then((res) => {
      setSavedProjects(res);
    });
  }, []);

  const getRecProjects = () => {
    apiCall(`/recommend/project`, "GET").then((res) => {
      setRecProjects(res);
    });
  };

  function handleApply() {
    apiCall().then((res) => {
      navigate("/Application");
    });
  }

  const handleSave = (id) => {
    apiCall(`/saved/project/${id}`, "GET").then((res) => {
      handleSearch();
    });
  };

  const handleUnSave = (id) => {
    apiCall(`/unsaved/project/${id}`, "GET").then((res) => {
      handleSearch();
    });
  };

  const handleSearch = () => {
    const data = { keyword, location, job_classification: classification, opportunity_type: opportunityType, publish_date_type: publishTime, payment_type: paymentType };
    let temp = [];
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        temp.push(`${key}=${data[key]}`);
      }
    });
    const qs = temp.join("&");

    apiCall(`/project?${qs}`, "GET").then((res) => {
      setProjectList(res);
    });
  };

  useEffect(() => {
    getRecProjects();
  }, []);

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <NavigationBtn />
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
              <TextField value={keyword} onChange={(e) => setKeyword(e.target.value)} label="Enter keywords" variant="outlined" style={{ zIndex: "3", width: "210px", marginTop: "10px" }} />
              <FormControl sx={{ m: 1, minWidth: 210, marginTop: "18px", left: "40px" }}>
                <InputLabel id="demo-simple-select-helper-label">Any Classification</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Any Classification"
                  value={classification}
                  onChange={(e) => {
                    setClassification(e.target.value);
                  }}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Information Technology</MenuItem>
                  <MenuItem value={2}>Accounting</MenuItem>
                  <MenuItem value={3}>Banking</MenuItem>
                  <MenuItem value={4}>Engineering</MenuItem>
                  <MenuItem value={5}>Sport</MenuItem>
                  <MenuItem value={6}>Business</MenuItem>
                  <MenuItem value={7}>Media</MenuItem>/
                </Select>
              </FormControl>
              <TextField value={location} onChange={(e) => setLocation(e.target.value)} id="outlined-basic" label="Enter suburb,city or region" variant="outlined" style={{ zIndex: "3", width: "210px", marginTop: "10px", left: "80px" }} />
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginTop: "10px", left: "120px" }}
                onClick={() => {
                  handleSearch();
                }}>
                Search
              </Button>
            </Box>
            <Box display="flex" alignItems="center" marginRight="350px">
              <FormControl sx={{ m: 1, minWidth: 170, marginBottom: "26px" }}>
                <InputLabel sx={{ color: "purple" }} id="demo-simple-select-helper-label">
                  Opportunity type
                </InputLabel>
                <Select
                  sx={{ borderRadius: "50px" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Opportunity type"
                  value={opportunityType}
                  onChange={(e) => {
                    setOpportunityType(e.target.value);
                  }}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Internship</MenuItem>
                  <MenuItem value={2}>Individual Project</MenuItem>
                  <MenuItem value={3}>Group Project</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 150, marginBottom: "26px" }}>
                <InputLabel sx={{ color: "purple" }} id="demo-simple-select-helper-label">
                  Publish time
                </InputLabel>
                <Select
                  sx={{ borderRadius: "50px" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Publish time"
                  value={publishTime}
                  onChange={(e) => {
                    setPublishTime(e.target.value);
                  }}>
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
                <InputLabel sx={{ color: "purple" }} id="demo-simple-select-helper-label">
                  Payment type
                </InputLabel>
                <Select
                  sx={{ borderRadius: "50px" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Publish time"
                  value={paymentType}
                  onChange={(e) => {
                    setPaymentType(e.target.value);
                  }}>
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
      </Dashbackground>

      {/* search results */}
      <Box sx={{ pt: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
        <Typography>the total numbers of projects: {projectList.length}</Typography>
        {projectList.map((item) => (
          <Card key={item.id} sx={{ maxWidth: 600, minWidth: 400, border: "2px solid lightgray" }}>
            <CardContent>
              <Typography
                sx={{ textDecorationLine: "underline", cursor: "pointer" }}
                gutterBottom
                variant="h5"
                component="div"
                onClick={() => {
                  navigate(`/project-detail/${item.id}`);
                }}>
                {item.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Location: <span style={{ color: "#555" }}>{item.location}</span>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Project type: <span style={{ color: "#555" }}>{getJobType(item.job_classification)}</span>
              </Typography>
              <Typography variant="body1" gutterBottom>
                {getOpportunityType(item.opportunity_type)} | {getPaymentType(item.payment_type)}
              </Typography>
            </CardContent>
            <CardActions>
              {localStorage.getItem("token") ? (
                <Button variant="outlined" onClick={() => navigate("/Application")}>
                  Apply
                </Button>
              ) : null}
              {localStorage.getItem("token") && !item.is_saved ? (
                <Button variant="outlined" onClick={() => handleSave(item.id)}>
                  Save
                </Button>
              ) : null}
              {localStorage.getItem("token") && item.is_saved ? (
                <Button variant="outlined" onClick={() => handleUnSave(item.id)}>
                  UnSave
                </Button>
              ) : null}
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* recommand system */}
      <Box sx={{ pt: 3, gap: 3, display: "flex", justifyContent: "center" }}>
        <Box sx={{ pt: 3, gap: 3, display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" gutterBottom>
            Recommand Projects
          </Typography>
          {localStorage.getItem("token") ? (recProjects.slice(0, 3).map((item) => (
            <Card key={item.id} sx={{ maxWidth: 400, minWidth: 300, border: "2px solid lightgray", borderRadius: "30px" }}>
              <CardContent sx={{ marginLeft: "10px" }}>
                <Typography
                  sx={{ textDecorationLine: "underline", cursor: "pointer" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                  onClick={() => {
                    navigate(`/project-detail/${item.id}`);
                  }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Location: <span style={{ color: "#555" }}>{item.location}</span>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Project type: <span style={{ color: "#555" }}>{getJobType(item.job_classification)}</span>
                </Typography>
              </CardContent>
            </Card>
          ))) : (
            <span style={{ color: "gray" }}>Not logged in, please log in to view content.</span>
          )}
          {localStorage.getItem("token") ? (
            <Button
              sx={{ width: "180px", height: "50px", border: "1px solid #1E90FF", borderRadius: "90px" }}
              onClick={() => { navigate('/recommend-projects'); }}>
              View All ({recProjects.length})
            </Button>
          ) : null}
        </Box>
        <Box sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 3, marginLeft: "200px" }}>
          <Typography variant="h5" gutterBottom>
            Saved Projects
          </Typography>
          {(localStorage.getItem("token") && savedProjects.length !== 0) ? (savedProjects.slice(0, 3).map((item) => (
            <Card sx={{ maxWidth: 400, minWidth: 300, border: '2px solid lightgray', borderRadius: "30px" }}>
              <CardContent sx={{ marginLeft: "10px" }}>
                <Typography
                  sx={{ textDecorationLine: "underline", cursor: "pointer" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                  onClick={() => {
                    navigate(`/project-detail/${item.id}`);
                  }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Location: <span style={{ color: '#555' }}>{item.location}</span>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Project type: <span style={{ color: '#555' }}>{getJobType(item.job_classification)}</span>
                </Typography>
              </CardContent>
            </Card>
          ))) : (
            <span style={{ color: "gray", width: "400px", fontSize: "20px" }}>
              There is nothing, please logged in or use the save button on each job listing to to save it.
            </span>
          )}
          {(localStorage.getItem("token") && savedProjects.length !== 0) ? (
            <Button
              sx={{ width: "180px", height: "50px", border: "1px solid #1E90FF", borderRadius: "90px" }}
              onClick={() => { navigate('/saved-projects'); }}>
              View All ({savedProjects.length})
            </Button>
          ) : null}
        </Box>
      </Box>
    </div>
  );
};

export default InitialDash;
