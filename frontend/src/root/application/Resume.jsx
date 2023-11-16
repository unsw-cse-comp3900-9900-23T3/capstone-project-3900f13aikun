import { Card, CardActions, CardContent, Typography } from "@mui/material";
import NavigationBtn from "../../components/NavigationBtn";
import { Pagebackground } from "../../components/StyledElement";
import Button from '@mui/material/Button';
import React, { useEffect } from "react";
import { apiCall } from "../../components/HelpFunctions";
import { getJobType, getOpportunityType, getPaymentType, getUniType } from "../../components/EnumMap";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


function Resume() {
    const { id } = useParams();
    const { role } = useParams();
    const [resume, setResume] = React.useState('');



    useEffect(() => {
        apiCall(`/applyProjectId/${id}`, 'Get').then(res => {
            if (res.error) {
                alert(res.error);
            } else {
                setResume(res)
            }
        })

    }, [])



    return <>
        <NavigationBtn></NavigationBtn>
        <Pagebackground>Resume</Pagebackground>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 1282,
                    height: 500,
                },
            }}
        >
            {role === 'teacher' ? <Paper elevation={3} sx={{fontSize:'30px',alignContent:'center'}}>{resume.teacher_resumes}</Paper>:
            <Paper elevation={3} sx={{fontSize:'30px',alignContent:'center'}}>{resume.student_resumes}</Paper>}
           
           
        
        </Box>





    </>
}
export default Resume;