import React, { useEffect, useState } from 'react';
import { Pagebackground } from '../../components/StyledElement';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { apiCall, transUni } from '../../components/HelpFunctions';
import NavigationBtn from '../../components/NavigationBtn';

function Application() {
    const { id } = useParams();
    const [role, setRole] = useState(0);
    const navigate = useNavigate();
    const Uninames = [
        'UNSW',
        'USYD',
        'UniMelb',
        'UTS',
        'other'

    ];

    // the information of logging user
    const [firstname, setFirstname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [projectInfo, setProjectInfo] = useState({});
    const [myGroups, setMyGroups] = useState([]);
    const [resume, setResume] = React.useState('');
    const [uni, setUni] = React.useState([]);
    const [chooseGroup, setChooseGroup] = useState([]);
    const getJoinedGroups = () => {
        apiCall(`/joinedGroup`, "GET").then((res) => {
            setMyGroups(res);
        });
    };

    // project information
    const getProjectInfo = () => {
        apiCall(`/project/${id}`, "GET").then((res) => {
            setProjectInfo(res);
        });
    };


    useEffect(() => {
        const user = apiCall('/profile', 'GET');
        user.then(data => {
            setEmail(data.email);
            setFirstname(data.name);
            setRole(data.role)
        })
        getProjectInfo();
        getJoinedGroups();
    }, [])

    // **********
    //submit function
    // spec: After the submit button being clicked, store the resume and university, mark this project which is applied by the corresponding user
    //       
    //       return the dashboard page and at the applied project page (Apppro.jsx) there should be a project information shown applied by the user
    //      
    //       (one user should only apply one project one time, after the user applied, the apply button should be disabled until the user delete the applied project)
    // 
    //       the notification page of the corresponding industry partner will show a message which ask the industry partner if accepting or declining
    // 
    //        the group project can only be applied by the group
    // **********

    function applyOrSup() {
        // supervisor can supervise several projects, they can not apply the project which they are applying for
        if (role === 3) {
            const res = apiCall(`/applyProject`, "POST", { project_id: parseInt(id), teacher_uni: transUni(uni), teacher_resumes: resume });
            res.then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    navigate('/dashboard/industryp');
                }
            });
        } else if (role === 1) {
            if (projectInfo.opportunity_type !== 3) {
                const res = apiCall(`/applyProject`, "POST", { project_id: parseInt(id), student_uni: transUni(uni), student_resumes: resume });
                res.then((data) => {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        navigate('/dashboard/industryp');
                    }
                });
            } else {
                if (myGroups.length === 0) {
                    alert('you have not formed or joined a group')
                }
                const res = apiCall(`/applyProject`, "POST", { project_id: parseInt(id), student_uni: transUni(uni), student_resumes: resume, group_id: chooseGroup.group_id });
                res.then((data) => {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        navigate('/dashboard/industryp');
                    }
                });
            }

        }
    }


    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>Application</Pagebackground>
            <React.Fragment>
                <CssBaseline />
                <Container sx={{ border: '2px solid black', margin: '20px' }}>
                    <Box sx={{ bgcolor: '#F0F0F0', height: '80vh', fontSize: '30px', display: 'flex', justifyContent: 'center' }}>
                        <div>
                            <div style={{ position: 'relative', left: '310px' }}><b >Apply to this project <u>{projectInfo.title}</u></b></div>
                            <div>

                            </div>
                            <div>
                                <TextField sx={{ margin: '20px', width: '900px' }} label="First name" id="outlined-size-small" value={firstname} />
                            </div>
                            <div>
                                <TextField sx={{ margin: '20px', width: '450px' }} label="Email" id="outlined-size-small" value={email} size="first name" />
                            </div>

                            {projectInfo.opportunity_type === 3 ?
                                <div style={{ fontSize: '23px' }}> Choose your Uni and Group</div> :
                                <div style={{ fontSize: '23px' }}>Choose your Uni</div>}

                            <div>
                                <FormControl sx={{ m: 1, width: 450, marginLeft: '20px' }}>
                                    <InputLabel id="demo-multiple-name-label">university</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        value={uni}
                                        onChange={(e) => { setUni(e.target.value) }}
                                        input={<OutlinedInput label="uni" />}

                                    >
                                        {Uninames.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}

                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {projectInfo.opportunity_type === 3 && <FormControl sx={{ m: 1, width: 450, marginLeft: '20px' }}>
                                    <InputLabel id="demo-multiple-name-label">Group</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        value={chooseGroup}
                                        onChange={(e) => { setChooseGroup(e.target.value) }}
                                        input={<OutlinedInput label="uni" />}

                                    >
                                        {myGroups.map((group) => (
                                            <MenuItem
                                                key={group}
                                                value={group}
                                            >
                                                {group.group_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>}
                            </div>
                            <div style={{ fontSize: '23px' }}>Resumes</div>
                            <textarea name="" id="" cols="137" rows="8.3" style={{ marginLeft: '20px' }} onChange={(e) => { setResume(e.target.value) }}></textarea>
                            <div><Button onClick={applyOrSup} variant="contained" sx={{ marginLeft: '450px' }}>submit</Button>
                            </div>
                        </div>
                    </Box>
                </Container>
            </React.Fragment>
        </>
    );

}

export default Application;