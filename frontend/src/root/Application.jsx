import React, { useEffect, useState } from 'react';
import NavigationBtn from '../components/NavigationBtn';
import { Pagebackground } from '../components/StyledElement';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { apiCall } from '../components/HelpFunctions';

function Appliacation() {
    const navigate = useNavigate();
    const [firstname,setFirstname] = React.useState('');
    const [lastname,setLastname] = React.useState('');
    const [inputemail,setInputEmail] = React.useState('');
    
    const [resume,setResume] = React.useState('');
    const [email,setEmail] = React.useState('');

    console.log(firstname)
    useEffect(() => {
        const user = apiCall('/profile','GET');
        user.then(data => {
            setEmail(data.email)
        })

    },[])
    console.log(email)
    const names = [
        'UNSW',
        'USYD',
        'UniMelb',
        'other'

    ];

    function getStyles(name, uniName, theme) {
        return {
            fontWeight:
                uniName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const theme = useTheme();
    const [uni,setUni] = React.useState([]);
    console.log(uni)

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setUni(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    function apply() {
        navigate('/dashboard/industryp')
    }
    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>Application</Pagebackground>
            <React.Fragment>
                <CssBaseline />
                <Container sx={{ border: '2px solid black', margin: '20px' }}>
                    <Box sx={{ bgcolor: '#C0C0C0', height: '80vh', fontSize: '30px', display: 'flex', justifyContent: 'center' }}>
                        <div>
                            <div style={{position:'relative',left:'310px'}}><b >Apply to this project</b></div>
                            <div>

                            </div>
                            <div>
                                <TextField sx={{margin:'20px',width:'450px'}} label="First name" id="outlined-size-small" onChange={(e) => setFirstname(e.target.value)} />
                                <TextField sx={{margin:'20px',width:'450px'}} label="Last name" id="outlined-size-small"  onChange={(e) => setLastname(e.target.value)}/>
                            </div>
                            <div>
                                <TextField sx={{margin:'20px',width:'450px'}} label="Email" id="outlined-size-small" value={email} size="first name" onChange={(e) => setInputEmail(e.target.value)}/>
                            </div>
                            <div style={{fontSize: '23px'}}>Education</div>
                            <div>
                                <FormControl sx={{ m: 1, width: 450,marginLeft:'20px'}}>
                                    <InputLabel id="demo-multiple-name-label">university</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={uni}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="uni" />}

                                    >
                                        {names.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                                style={getStyles(name, uni, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                           
                            <div style={{fontSize: '23px'}}>Resumes</div>
                            <textarea name="" id="" cols="70" rows="6" style={{marginLeft:'20px'}}></textarea>
                            <div><Button onClick={apply} variant="contained" sx={{marginLeft:'450px'}}>submit</Button>
                                </div>
                        </div>
                       
                        
                        

                    </Box>


                </Container>
            </React.Fragment>



        </>
    );

}

export default Appliacation;