import React from 'react';
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

const Registerdiv = styled('div')({
  padding: '10px'
})

// signup page
function SignUp() {
  const [email, setEmail] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
    console.log(event.target.value)
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
      const res = apiCall('/register', 'POST', { 'email': email, 'password': password1, 'role': role });
      res.then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setOpen(true);
        }
      })
    }
  }

  function keyRegister(e) {
    if (e.key === 'Enter') {
      register();
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

        <TextField id="filled-basic" label="Email" variant="filled" style={{ width: '400px' }}
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
        <TextField id="filled-basic" label="role" variant="filled" style={{ width: '400px' }}
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
            label="Age"
            onChange={handleChange}
            sx={{ width: '200px' }}
          >
            <MenuItem value='Student'>student</MenuItem>
            <MenuItem value='Industry partner'>Industry partner</MenuItem>
            <MenuItem value='Academic supervisor'>Academic supervisor</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <div>
        <input
          value={email}
          // onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button>
          Send Verification Code
        </button>

        {/* {isCodeSent && <p>Wait for {countdown} seconds to resend the code.</p>} */}
      </div>


      <Button id='registerbutton' role="register" variant="contained" color="success" onKeyDown={keyRegister} onClick={register} sx={{ marginTop: '30px' }}>register</Button>
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
    </>
  );
}
export default SignUp;
