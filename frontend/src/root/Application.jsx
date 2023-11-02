import React, { useState } from 'react';
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

function Appliacation() {
    const navigate = useNavigate();
    
    const names = [
        'UNSW',
        'USYD',
        'UniMelb',
        'other'

    ];

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
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
                            <b>Apply to this project</b>
                            <div>

                            </div>
                            <div>
                                <TextField sx={{margin:'20px'}} label="First name" id="outlined-size-small"  />
                                <TextField sx={{margin:'20px'}} label="Last name" id="outlined-size-small"  />
                            </div>
                            <div>
                                <TextField sx={{margin:'20px'}} label="Email" id="outlined-size-small" defaultValue="Small" size="first name" />
                            </div>
                            <div style={{fontSize: '20px'}}>Education</div>
                            <div>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-name-label">university</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={personName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="uni" />}

                                    >
                                        {names.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                                style={getStyles(name, personName, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                           
                            <div style={{fontSize: '20px'}}>resumes</div>
                            <textarea name="" id="" cols="60" rows="6"></textarea>
                            <div><Button onClick={apply}>submit</Button>
                                </div>
                        </div>
                       
                        
                        

                    </Box>


                </Container>
            </React.Fragment>



        </>
    );

}

export default Appliacation;