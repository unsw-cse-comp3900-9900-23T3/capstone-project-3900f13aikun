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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function SearchResult() {
  const navigate = useNavigate();
  const [classification, setClassification] = React.useState("");
  const [opportunityType, setOpportunityType] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("");

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Box sx={{ my: 3, display: "flex", gap: 3 }}>
        <TextField fullWidth label="Enter key words" variant="outlined" />
        <TextField fullWidth label="Enter suburb,city or region" variant="outlined" />
        <Button fullWidth variant="contained"  color="primary">
          Search
        </Button>
      </Box>
      <Box sx={{ my: 2, display: "flex", gap: 3 }}>
        <FormControl sx={{ width: 300 }}>
          <InputLabel>Any Classification</InputLabel>
          <Select
            value={classification}
            onChange={(e) => {
              setClassification(e.target.value);
            }}>
            <MenuItem value={1}>IT</MenuItem>
            <MenuItem value={2}>ACCOUNTING</MenuItem>
            <MenuItem value={3}>Banking</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: 300 }}>
          <InputLabel>Opportunity type</InputLabel>
          <Select
            value={opportunityType}
            onChange={(e) => {
              setOpportunityType(e.target.value);
            }}>
            <MenuItem value={1}>Internship</MenuItem>
            <MenuItem value={2}>Individual Project</MenuItem>
            <MenuItem value={2}>Group Project</MenuItem>
          </Select>
        </FormControl>
        <DatePicker label="Publish Date"  />
      </Box>

      <Box sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 5 }}>
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
