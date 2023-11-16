import { Card, CardActions, CardContent, Typography } from "@mui/material";
import NavigationBtn from "../../components/NavigationBtn";
import { Pagebackground } from "../../components/StyledElement";
import Button from '@mui/material/Button';
import React, { useEffect } from "react";
import { apiCall } from "../../components/HelpFunctions";
import { getJobType, getOpportunityType, getPaymentType, getUniType } from "../../components/EnumMap";


function Apppro() {

    const [applyInfo, setApplyInfo] = React.useState([]);
    const [personInfo, setPersonInfo] = React.useState({});

    // render the page
    async function renderApply() {
        const res = apiCall(`/profile`, "GET");
        res.then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                setPersonInfo(data);
                if (data.role === 3) {
                    const res2 = apiCall('/applyTeacherProject', 'Get');
                    res2.then((data2) => {
                        if (data2.error) {
                            alert(data2.error);
                        } else {
                            setApplyInfo(data2);
                        }
                    })
                } else if (data.role === 1) {
                    Promise.all( [apiCall("/applyStudentProject", "Get"),apiCall("/applyStudentGroupProject", "Get")]).then(d => {
                        console.log(d);
                        setApplyInfo([
                          ...d[0],
                          ...d[1]
                        ])
                        })
                }
            }
        });
    }

    useEffect(() => {
        renderApply();

    }, [])

    // spec:  after clicking this button, delete this project that applied by the user(show nothing at this page)
    //         
    //        if the user deleted the project applied, the apply request will also be deleted at the notification page of the corrsponding industry partner
    //       
    //          
    // 
    function deleteApp(deleteId) {
        const res = apiCall('/applyProject', 'Delete', { 'delete_id': deleteId });
        res.then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                renderApply();
            }
        })
    }


    return <>
        <NavigationBtn></NavigationBtn>
        <Pagebackground>My apply projects</Pagebackground>
        <div style={{ width: '1000px', borderLeft: '2px black solid', borderRight: '2px black solid', height: '300vh' }}>
            {applyInfo.map(data => (

                <Card sx={{ maxWidth: 600, minWidth: 400, margin: 'auto', marginTop: '3%', marginBottom: '3%', border: '2px solid lightgray' }}>
                    {(data.apply_status === 0 || data.apply_status === 3)
                        ? <>
                            <CardContent >
                                <Typography
                                    sx={{ textDecorationLine: "underline", cursor: "pointer", marginLeft: '42%' }}
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {data.project.title}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <b>Location:</b>   {data.project.location}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <b>Project type:</b> {getJobType(data.project.job_classification)}
                                </Typography>

                                <Typography variant="body1" gutterBottom>
                                    {getOpportunityType(data.project.opportunity_type)} | {getPaymentType(data.project.payment_type)}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <b>Univeristy:</b>   {(personInfo.role === 3) ? getUniType(data.teacher_uni) : getUniType(data.student_uni)}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <b>resume: </b>        {(personInfo.role === 3) ? data.teacher_resumes : data.student_resumes}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="error" sx={{ margin: 'auto' }} onClick={() => deleteApp(data.project.id)}>
                                    <span>delete apply</span>
                                </Button>
                            </CardActions>
                        </> : null}

                </Card>
            ))}




        </div>
    </>
}
export default Apppro;