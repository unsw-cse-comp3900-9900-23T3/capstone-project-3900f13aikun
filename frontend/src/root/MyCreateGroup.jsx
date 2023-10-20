import React from 'react';
import { useNavigate } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from '../components/StyledElement';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function MyCreateGroup() {
    const navigate = useNavigate();
    const [groupName, setGroupName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleCreateClick = () => {
        navigate("/my-group");
    }
    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>Create Group</Pagebackground>
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
                    label="Group Name"
                    variant="filled"
                    value={groupName}
                    style={{ width: "400px" }}
                    onChange={(e) => {
                        setGroupName(e.target.value);
                    }}
                />
                <br></br>
                <TextField
                    label="Group Description"
                    variant="filled"
                    value={description}
                    style={{ width: "400px" }}
                    multiline
                    rows={4}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
                <Button
                    variant="contained"
                    color="success"
                    sx={{ marginTop: "30px" }}
                    onClick={() => {
                        handleCreateClick();
                    }}>
                    +create
                </Button>
            </Box>
        </>
    );

}

export default MyCreateGroup;