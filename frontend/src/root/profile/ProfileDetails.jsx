import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Table, TableCell, TableRow, TableContainer, Paper } from "@mui/material";
import { apiCall } from "../../components/HelpFunctions";
import { Pagebackground } from "../../components/StyledElement";
import NavigationBtn from "../../components/NavigationBtn";
import { getIntention, getWorkRights } from "../../components/EnumMap";

function ProfileDetails() {
    const [profileDetails, setProfileDetails] = React.useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    React.useEffect(() => {
        if (id) {
            apiCall(`/user/${id}`, "GET").then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setProfileDetails(data);
                }
            });
            return;
        }

        apiCall(`/profile`, "GET").then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                setProfileDetails(data);
            }
        });
    }, []);

    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>Profile Details</Pagebackground>
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
                <TableContainer component={Paper} style={{ border: "2px solid #c0c0c0" }}>
                    <Table style={{height: "350px"}}>
                        <TableRow>
                            <TableCell style={{fontSize:"16px"}}>Email:</TableCell>
                            <TableCell style={{fontSize:"16px"}}>{profileDetails.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontSize:"16px"}}>Name:</TableCell>
                            <TableCell style={{fontSize:"16px"}}>{profileDetails.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontSize:"16px"}}>Workright:</TableCell>
                            <TableCell style={{fontSize:"16px"}}>{Array.isArray(profileDetails.work_rights) ? profileDetails.work_rights.map(getWorkRights).join(', ') : ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontSize:"16px"}}>Project Intention:</TableCell>
                            <TableCell style={{fontSize:"16px"}}>{Array.isArray(profileDetails.project_intention) ? profileDetails.project_intention.map(getIntention).join(', ') : ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontSize:"16px"}}>Skills</TableCell>
                            <TableCell style={{fontSize:"16px"}}>{profileDetails.skill}</TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
                <br></br>
                {!id ? (
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            navigate(`/profile`);
                        }}>
                        Edit
                    </Button>
                ) : null}
            </Box>
        </>
    );
}

export default ProfileDetails;