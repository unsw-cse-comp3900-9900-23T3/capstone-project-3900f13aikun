import React from 'react';
import { useNavigate } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from '../components/StyledElement';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function MyGroup() {
    const navigate = useNavigate();
    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>My group</Pagebackground>
            <Button
                variant="contained"
                color="success"
                onClick={() => {
                    navigate("/my-create-group");
                }}>
                New Group   
            </Button>

        </>
    );

}

export default MyGroup;