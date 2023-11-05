import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Table, TableCell, TableRow, TableContainer, Paper } from "@mui/material";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from "../components/StyledElement";
import NavigationBtn from "../components/NavigationBtn";
import { getJobType, getWorkRights } from "../components/EnumMap";

function ProfileDetails() {
    const [profileDetails, setProfileDetails] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
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
                    <Table>
                        <TableRow>
                            <TableCell>Email:</TableCell>
                            <TableCell>{profileDetails.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Name:</TableCell>
                            <TableCell>{profileDetails.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Workright:</TableCell>
                            <TableCell>{Array.isArray(getWorkRights(profileDetails.work_rights)) ? getWorkRights(profileDetails.work_rights).join(', ') : ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Project Intention:</TableCell>
                            <TableCell>{Array.isArray(getJobType(profileDetails.project_intention)) ? getJobType(profileDetails.project_intention).join(', ') : ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Skills</TableCell>
                            <TableCell>{profileDetails.skill}</TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
                <br></br>
            </Box>
        </>
    );
}

export default ProfileDetails;