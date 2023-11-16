import React, { useEffect, useState } from 'react';
import { Pagebackground } from '../../components/StyledElement';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { apiCall, transUni, checkGroup } from '../../components/HelpFunctions';
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

    function applyOrSup() {
        // supervisor can supervise several projects, they can not apply the project which they are applying for
        if (role === 3) {
            const res = apiCall(`/applyProject`, "POST", { project_id: parseInt(id), teacher_uni: transUni(uni), teacher_resumes: resume });
            res.then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    navigate('/');
                }
            });
        } else if (role === 1) {
            if (projectInfo.opportunity_type !== 3) {
                const res = apiCall(`/applyProject`, "POST", { project_id: parseInt(id), student_uni: transUni(uni), student_resumes: resume });
                res.then((data) => {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        navigate('/');
                    }
                });
            } else {
                if (checkGroup(myGroups)) {
                    const res = apiCall(`/applyProject`, "POST", { project_id: parseInt(id), student_uni: transUni(uni), student_resumes: resume, group_id: chooseGroup.group_id });
                    res.then((data) => {
                        if (data.error) {
                            alert(data.error);
                        } else {
                            navigate('/');
                        }
                    });
                }
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
                            <div style={{ position: 'relative', left: '240px' }}><b >Apply to this project <u>{projectInfo.title}</u></b></div>
                            <br></br>
                            <div>
                                <TextField sx={{ marginTop: '10px',marginLeft:'20px', width: '900px' }} label="First name" id="outlined-size-small" value={firstname} />
                            </div>
                            <div>
                                <TextField sx={{ marginTop: '20px',marginLeft:'20px',  width: '450px' }} label="Email" id="outlined-size-small" value={email} size="first name" />
                            </div>
                            <br></br>
                            {projectInfo.opportunity_type === 3 && role !== 3 ?
                                <div style={{ fontSize: '23px' }}>Choose your Uni and Group</div> :
                                <div style={{ fontSize: '23px' }}>Choose your Uni</div>}

                            <div>
                                <FormControl sx={{ m: 1, width: 450, marginLeft: '20px' }}>
                                    <InputLabel id="demo-multiple-name-label">University</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        label="University"
                                        value={uni}
                                        onChange={(e) => { setUni(e.target.value) }}
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

                                {projectInfo.opportunity_type === 3 && role !== 3 && <FormControl sx={{ m: 1, width: 450, marginLeft: '20px' }}>
                                    <InputLabel id="demo-multiple-name-label">Group</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        value={chooseGroup}
                                        label="Group"
                                        onChange={(e) => { setChooseGroup(e.target.value) }}
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
                            <textarea name="" id="" cols="137" rows="6" style={{ marginLeft: '20px' }} onChange={(e) => { setResume(e.target.value) }}></textarea>
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