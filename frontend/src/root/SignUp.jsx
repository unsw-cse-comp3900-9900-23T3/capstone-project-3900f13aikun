import React, { useEffect } from 'react';
import { apiCall, checkEmail, checkPassword, checkName, verifyPassword } from '../components/HelpFunctions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { styled } from '@mui/system';
import NavigationBtn from '../components/NavigationBtn';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Registerdiv = styled('div')({
  padding: '10px'
})

// signup page
function SignUp() {
  const [email, setEmail] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState(0);
  const [authvalur, setAuthvalue] = React.useState(0)

  const [passport, setPassport] = React.useState('');
  const [medicalCard, setMedicalCard] = React.useState('');
  const [driverLicense, setDriverLicense] = React.useState('')


  const [isChecked1, setChecked1] = React.useState(false);
  const [isChecked2, setChecked2] = React.useState(false);
  const [isChecked3, setChecked3] = React.useState(false);

  useEffect(() => {
    if (isChecked1 === true || isChecked2 === true || isChecked3 === true) {
      setAuthvalue(1)
    } else {
      setAuthvalue(0)
    }

  }, [isChecked1, isChecked2, isChecked3]);




  const handleChange = (event) => {
    setRole(event.target.value)
  };
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const nav = () => {
    navigate('/login');
  }
  // register function
  async function register() {
    if (checkEmail(email) && checkPassword(password1) && verifyPassword(password1, password2) && checkName(name)) {
      const res = apiCall('/register', 'POST', 
      { 'email': email, 'password': password1, 'role': role, 'name':name, 'passport': passport, 'medicalCard': medicalCard, 'driverLicense':driverLicense});
      
      res.then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setOpen(true);
        }
      })
    }
  }

  return (
    <>
      <NavigationBtn></NavigationBtn>

      <div style={{ background: '#E2E6E6', width: '1540px', height: '10000px' }}>
        <div style={{ width: '550px', height: '700px', background: 'white', margin: 'auto', marginTop: '50px' }}>
          <div style={{ position: 'relative', top: '10px', left: '220px', marginBottom: '70px', fontSize: '30px' }}>Sign up</div>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >

            <TextField id="filled-basic" label="Email" variant="filled" style={{ width: '400px', marginLeft: '60px' }}
              onChange={(e) => {
                setEmail(e.target.value);
              }} />
            <br></br>
            <TextField id="filled-basic" label="Password" variant="filled" style={{ width: '400px' }}
              onChange={(e) => {
                setPassword1(e.target.value);
              }} />
            <br></br>
            <TextField id="filled-basic" label="Verify Password" variant="filled" style={{ width: '400px' }}
              onChange={(e) => {
                setPassword2(e.target.value);
              }} />
            <br></br>
            <TextField id="filled-basic" label="name" variant="filled" style={{ width: '400px' }}
              onChange={(e) => {
                setName(e.target.value);
              }} />
          </Box>
          
          
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                onChange={handleChange}
                sx={{ width: '200px' }}
              >
                <MenuItem value='Student'>student</MenuItem>
                <MenuItem value='Industry partner'>Industry partner</MenuItem>
                <MenuItem value='Academic supervisor'>Academic supervisor</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          
          <FormGroup>
            <div style={{ display: 'flex' }}>
              <FormControlLabel control={<Checkbox />} label="Passport" onChange={(e) => setChecked1(e.target.checked)} />
              <div>
                <TextField
                  label="Enter your Passport"
                  id="filled-size-small"
                  variant="filled"
                  size="small"
                  onChange={(e) => {
                    setPassport(e.target.value)
                   
                  }} 
                />

              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <FormControlLabel control={<Checkbox />} label="Driver License" onChange={(e) => setChecked2(e.target.checked)} />
              <div>
                <TextField
                  label="Enter your Driver License"
                  id="filled-size-small"
                  variant="filled"
                  size="small"
                  onChange={(e) => {
                    setDriverLicense(e.target.value)
                   
                  }} 
                />

              </div>
            </div>

            <div style={{ display: 'flex' }}>
              <FormControlLabel control={<Checkbox />} label="Medical Card" onChange={(e) => setChecked3(e.target.checked)} />
              <div>
                <TextField
                  label="Enter your Medical Card"
                  id="filled-size-small"
                  variant="filled"
                  size="small"
                  onChange={(e) => {
                    setMedicalCard(e.target.value)
                  }} 
                />

              </div>
            </div>
          </FormGroup>
          {authvalur === 1 && <div>
            <input
              value={email}
              // onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button>
              Send Verification Code
            </button>

          </div>}


          {authvalur === 1 && <Button id='registerbutton' role="register" variant="contained" color="success" onClick={register} sx={{ marginTop: '30px' }}>register</Button>}



          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You have successfully register!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button id="gotoLogin" onClick={nav} autoFocus>
                  Go to login!
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>




    </>
  );
}
export default SignUp;
