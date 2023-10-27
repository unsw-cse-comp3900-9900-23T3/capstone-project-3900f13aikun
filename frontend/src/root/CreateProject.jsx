import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from "../components/StyledElement";

export default function CreateProject() {
  const navigate = useNavigate();
  const [classification, setClassification] = React.useState("");
  const [title, setTitle] = React.useState("");

  const [location, setLocation] = React.useState("");
  const [opportunityType, setOpportunityType] = React.useState("");
  const [problemStatement, setProblemStatement] = React.useState("");
  const [availabilityRequirement, setAvailabilityRequirement] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("");
  const [desiredOutcomes, setDesiredOutcomes] = React.useState("");
  const [requiredSkill, setRequiredSkill] = React.useState("");
  const [potentialDel, setPotentialDel] = React.useState("");
  const [expectedDel, setExpectedDel] = React.useState("");

  const handlePublishClick = () => {
    //todo: verify input

    //token

    apiCall(`/project`, "POST", {
      title,
      location,
      job_classification: classification,
      problem_statement: problemStatement,
      requirement: availabilityRequirement,
      payment_type: paymentType,
      desired_outcomes: desiredOutcomes,
      required_skill: requiredSkill,
      potential_deliverable: potentialDel,
      expected_delivery_cycle: expectedDel,
    }).then((res) => {
      navigate("/my-created-project");
    });
  };

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Pagebackground>Opportunity POST</Pagebackground>
      <Box
        component="form"
        sx={{
          py: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off">
        <TextField
          label="Title"
          variant="filled"
          value={title}
          style={{ width: "400px" }}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br></br>

        <FormControl style={{ width: "400px" }}>
          <FormLabel>Job Classification</FormLabel>
          <RadioGroup
            value={classification}
            onChange={(e) => {
              setClassification(e.target.value);
            }}>
            <FormControlLabel value="1" control={<Radio />} label="IT" />
            <FormControlLabel value="2" control={<Radio />} label="ACCOUNTING" />
            <FormControlLabel value="3" control={<Radio />} label="Banking" />
            <FormControlLabel value="4" control={<Radio />} label="Engineering" />
            <FormControlLabel value="5" control={<Radio />} label="Sport" />
            <FormControlLabel value="6" control={<Radio />} label="Business" />
            <FormControlLabel value="7" control={<Radio />} label="Media" />
          </RadioGroup>
        </FormControl>

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
            <FormControlLabel value="1" control={<Radio />} label="Internship" />
            <FormControlLabel value="2" control={<Radio />} label="Individual Project" />
            <FormControlLabel value="3" control={<Radio />} label="Group Project" />
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
            <FormControlLabel value="1" control={<Radio />} label="Paid" />
            <FormControlLabel value="2" control={<Radio />} label="Non-paid" />
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
          value={requiredSkill}
          style={{ width: "400px" }}
          onChange={(e) => {
            setRequiredSkill(e.target.value);
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
