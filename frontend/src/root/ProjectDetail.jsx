import InitialDash from "./InitialDash";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavigationBtn from "../components/NavigationBtn";

function ProjectDetail() {
  return (
    <>
     <NavigationBtn></NavigationBtn>
      <Box sx={{paddingX:10,paddingY:5}}>
        <Typography variant="h2" gutterBottom>
          Fucking Project
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Melbourne Institute of Technology - Melbourne
        </Typography>
        <Typography variant="body2" gutterBottom>
          Location: Melbourne VIC
        </Typography>
        <Typography variant="body2" gutterBottom>
          Ppportunity Type: Student Services (Education & Training)
        </Typography>

        <Box sx={{ display: "flex", gap: 10,my:5 }}>
          <Button variant="contained">Apply</Button>
          <Button variant="outlined">Save</Button>
        </Box>
        <Typography variant="h3" gutterBottom>
          The Role:
        </Typography>
        <Typography variant="body1" gutterBottom>
          We are seeking a motivated Learning Skills Officer to join our Centre of Learning at the Melbourne campus. This role involves developing and delivering tailored learning and language programs to our diverse student body. The Learning Skills Officer will report to the Learning Skills &
          Quality Assurance Coordinator.
        </Typography>
      </Box>
    </>
  );
}

export default ProjectDetail;
