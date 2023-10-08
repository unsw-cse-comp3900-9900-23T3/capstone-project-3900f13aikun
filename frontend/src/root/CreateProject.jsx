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
import { useNavigate } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";

const steps = ["Send request code", "Verify code", "Reset password"];

export default function CreateProject() {
  const navigate = useNavigate();
  const [classification, setClassification] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [opportunityType, setOpportunityType] = React.useState("");
  const [problemStatement, setProblemStatement] = React.useState("");
  const [availabilityRequirement, setAvailabilityRequirement] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("");
  const [desiredOutcomes, setDesiredOutcomes] = React.useState("");
  const [requiredSkills, setRequiredSkills] = React.useState("");
  const [potentialDel, setPotentialDel] = React.useState("");
  const [expectedDel, setExpectedDel] = React.useState("");

  const handlePublishClick = () => {
    //
  };

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Box
        component="form"
        sx={{
          py: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off">
        <TextField
          label="Job Classification"
          variant="filled"
          value={classification}
          style={{ width: "400px" }}
          onChange={(e) => {
            setClassification(e.target.value);
          }}
        />
        <br></br>
        <TextField
          label="Location"
          variant="filled"
          value={location}
          style={{ width: "400px" }}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <br></br>
        <FormControl style={{ width: "400px" }}>
          <FormLabel>Opportunity type</FormLabel>
          <RadioGroup
            value={opportunityType}
            onChange={(e) => {
              setOpportunityType(e.target.value);
            }}>
            <FormControlLabel value="internship" control={<Radio />} label="Internship" />
            <FormControlLabel value="individualProject" control={<Radio />} label="Individual Project" />
            <FormControlLabel value="groupProject" control={<Radio />} label="Group Project" />
          </RadioGroup>
        </FormControl>

        <br></br>
        <TextField
          label="Problem statement"
          variant="filled"
          value={problemStatement}
          style={{ width: "400px" }}
          multiline
          rows={4}
          onChange={(e) => {
            setProblemStatement(e.target.value);
          }}
        />
        <br></br>
        <TextField
          label="Availability requirement"
          variant="filled"
          value={availabilityRequirement}
          style={{ width: "400px" }}
          multiline
          rows={4}
          onChange={(e) => {
            setAvailabilityRequirement(e.target.value);
          }}
        />
        <br></br>

        <FormControl style={{ width: "400px" }}>
          <FormLabel>Opportunity type</FormLabel>
          <RadioGroup
            value={paymentType}
            onChange={(e) => {
              setPaymentType(e.target.value);
            }}>
            <FormControlLabel value="paid" control={<Radio />} label="Paid" />
            <FormControlLabel value="non-paid" control={<Radio />} label="Non-paid" />
          </RadioGroup>
        </FormControl>

        <br></br>
        <TextField
          label="Desired outcomes(optional)"
          variant="filled"
          value={desiredOutcomes}
          style={{ width: "400px" }}
          onChange={(e) => {
            setDesiredOutcomes(e.target.value);
          }}
        />
        <br></br>
        <TextField
          label="Required skills(optional)"
          variant="filled"
          value={requiredSkills}
          style={{ width: "400px" }}
          onChange={(e) => {
            setRequiredSkills(e.target.value);
          }}
        />
        <br></br>
        <TextField
          label="Potential deliverables(optional)"
          variant="filled"
          value={potentialDel}
          style={{ width: "400px" }}
          onChange={(e) => {
            setPotentialDel(e.target.value);
          }}
        />
        <br></br>
        <TextField
          label="Expected delivery cycle(optional)"
          variant="filled"
          value={expectedDel}
          style={{ width: "400px" }}
          onChange={(e) => {
            setExpectedDel(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="success"
          sx={{ marginTop: "30px" }}
          onClick={() => {
            handlePublishClick();
          }}>
          Publish
        </Button>
      </Box>
    </>
  );
}
