import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from '../components/StyledElement';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function MyGroup() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');
    
    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>My Group</Pagebackground>
            <Button
                sx={{ marginTop: '20px', left: '500px' }}
                variant="contained"
                color="success"
                onClick={() => {
                    navigate("/my-create-group");
                }}>
                create
            </Button>
            <Typography style={{ fontfontSize: "30px", marginRight:"1000px"}}>Groups you are in</Typography>
        </>
    );

}

export default MyGroup;