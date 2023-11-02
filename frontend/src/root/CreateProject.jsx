import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from "../components/StyledElement";
import { checkTitle, checkClassification, checkLocation, checkOpportunity, checkPaymentType, checkProblemStatement, checkRequirement } from "../components/HelpFunctions";

export default function CreateProject() {
  const navigate = useNavigate();
  const { id } = useParams();
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

  React.useEffect(() => {
    if (id) {
      getProjectInfo();
    }
  }, []);

  const handlePublishClick = () => {
    if (id) {
      apiCall(`/project`, "PUT", {
        id,
        title,
        location,
        job_classification: classification,
        opportunity_type: opportunityType,
        problem_statement: problemStatement,
        requirement: availabilityRequirement,
        payment_type: paymentType,
        desired_outcomes: desiredOutcomes || "",
        required_skill: requiredSkill || "",
        potential_deliverable: potentialDel || "",
        expected_delivery_cycle: expectedDel || "",
      }).then((res) => {
        navigate("/my-created-project");
      });
      return;
    }

    apiCall(`/project`, "POST", {
      title,
      location,
      job_classification: classification,
      opportunity_type: opportunityType,
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

  const getProjectInfo = () => {
    apiCall(`/project/${id}`, "GET").then((res) => {
      setClassification(res.job_classification);
      setLocation(res.location)
      setTitle(res.title);
      setProblemStatement(res.problem_statement);
      setAvailabilityRequirement(res.requirement);
      setPaymentType(res.payment_type);
      setOpportunityType(res.opportunity_type);
      setDesiredOutcomes(res.desired_outcomes);
      setRequiredSkill(res.required_skill);
      setPotentialDel(res.potential_deliverable);
      setExpectedDel(res.expected_delivery_cycle);
    });
  };

  const checkProjects = () => {
    if (checkTitle(title) && checkClassification(classification) && checkLocation(location) && checkOpportunity(opportunityType)
      && checkProblemStatement(problemStatement) && checkRequirement(availabilityRequirement) && checkPaymentType(paymentType)) {
      handlePublishClick();
    }
  }

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
          <FormLabel>Project Classification</FormLabel>
          <RadioGroup
            value={classification}
            onChange={(e) => {
              setClassification(e.target.value);
            }}>
            <FormControlLabel value="1" control={<Radio />} label="Information Technology" />
            <FormControlLabel value="2" control={<Radio />} label="Accounting" />
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
          <FormLabel>Payment type</FormLabel>
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
            checkProjects();
          }}>
          Publish
        </Button>
      </Box>
    </>
  );
}
