import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { apiCall } from '../components/HelpFunctions';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import NavigationBtn from '../components/NavigationBtn';

const Logindiv = styled('div')({
  padding: '10px'
})

// signin page
function SignIn () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  // login function
  async function login () {
    const res = apiCall('/login', 'POST', { 'email': email, 'password': password });
    res.then((data) => {
      if (data.error) {
        alert(data.error)
      } else {
        console.log(data)
        console.log(data.token)
        localStorage.setItem('toke3n', data.token);
        navigate('/dashboard')
      }
    })
  }

  function keyLogin (e) {
    if (e.key === 'Enter') {
      login();
    }
  }

  return (
        <>
          <NavigationBtn></NavigationBtn>
          
          <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        
        <TextField id="filled-basic" label="Email" variant="filled" style={{width:'400px'}} 
          onChange={(e) => {
            setEmail(e.target.value);
        }}/>
        <br></br>
        <TextField id="filled-basic" label="password" variant="filled" style={{width:'400px'}} 
          onChange={(e) => {
            setPassword(e.target.value);
        }}/>
        <br></br>
        <Typography>
          <Link to="/forgot">Forgot password?</Link>
        </Typography>
      </Box>
          <Button id='loginbutton' role='login' variant="contained" color="success" onKeyDown={keyLogin} onClick={login} sx={{ marginTop: '30px' }}>login</Button>
        </>
  )
}

export default SignIn;
