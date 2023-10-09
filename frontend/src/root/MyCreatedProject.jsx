import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";

const mockProjectData = [];

export default function MyCreatedProject() {
  const navigate = useNavigate();

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Box sx={{ py: 2 }}>
        <Typography variant="h2" gutterBottom>
          My Created Projects
        </Typography>
        <Button variant="contained" color="success" onClick={()=>{navigate('/create-project')}}>
          New Project
        </Button>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Project 1
              </Typography>
              <Typography color="text.secondary">fuck</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Edit</Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </>
  );
}
