import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from '../components/StyledElement';


function GroupComposition() {

    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>My Group</Pagebackground>
            
        </>
    );
}

export default GroupComposition;