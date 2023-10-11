import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate, Link, Form } from 'react-router-dom';
import NavigationBtn from '../components/NavigationBtn';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { apiCall, checkEmail, checkName, checkSkills, checkWorkRight } from '../components/HelpFunctions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


// const ProfileDiv = styled('div')({
//   padding: '10px'
// })

function Profile() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [workRight, setWorkRight] = React.useState('');
  const [skill, setSkill] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(workRight)
  },[workRight])
  async function profile() {
    if (checkEmail(email) && checkName(name) && checkWorkRight(workRight) && checkSkills(skill)) {
      const res = apiCall('/profile', 'POST', { 'email': email }, { 'name': name }, { 'workRight': workRight }, { 'skill': skill });
      res.then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setOpen(true);
        }
      })
    }
  }

  function keyProfile(e) {
    if (e.key === 'Enter') {
      profile();
    }
  }

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (workRight.includes(value)) {
      setWorkRight(workRight.filter((item) => item !== value));
    } else {
      setWorkRight([...workRight, value]);
    }
  };


  const handleSubmitClick = () => {
    //
  };

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Box
        component="form"
        sx={{
          py: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl style={{ width: "400px" }}>
          <FormLabel style={{ fontWeight: 'bold', color: 'black' }}>Email:</FormLabel>
          <TextField id="filled-basic" label="email" variant="filled" value={email} style={{ width: '400px' }}
            onChange={(e) => {
              setEmail(e.target.value);
            }} />
          <br></br>
          <FormLabel style={{ fontWeight: 'bold', color: 'black' }}>Name:</FormLabel>
          <TextField id="filled-basic" label="name" variant="filled" value={name} style={{ width: '400px' }}
            onChange={(e) => {
              setName(e.target.value);
            }} />
          <br></br>
          <FormLabel style={{ fontWeight: 'bold', color: 'black' }}>WorkRights</FormLabel>
          <FormGroup
            value={workRight}
          >
            <FormControlLabel
              control={<Checkbox />}
              label="Monday"
              value="Monday"
              checked={workRight.includes('Monday')}
              onChange={handleCheckboxChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Tuesday"
              value="Tuesday"
              checked={workRight.includes('Tuesday')}
              onChange={handleCheckboxChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Wenesday"
              value="Wenesday"
              checked={workRight.includes('Wenesday')}
              onChange={handleCheckboxChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Thursday"
              value="Thursday"
              checked={workRight.includes('Thursday')}
              onChange={handleCheckboxChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Friday"
              value="Friday"
              checked={workRight.includes('Friday')}
              onChange={handleCheckboxChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Saturday"
              value="Saturday"
              checked={workRight.includes('Saturday')}
              onChange={handleCheckboxChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Sunday"
              value="Sunday"
              checked={workRight.includes('Sunday')}
              onChange={handleCheckboxChange}
            />
          </FormGroup>
          <br></br>
          <FormLabel style={{ fontWeight: 'bold', color: 'black' }}>Skills:</FormLabel>
          <TextField
            id="filled-basic"
            style={{ width: '400px', borderWidth: '1px', borderStyle: 'solid' }}
            value={skill}
            multiline
            rows={4}
            onChange={(e) => {
              setSkill(e.target.value);
            }} />
        </FormControl>
        <Button id='registerbutton' role="profile" variant="contained" color="success" onKeyDown={keyProfile} onClick={profile} sx={{ marginTop: '30px' }}>Save</Button>
      </Box >
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You have successfully saved!
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}


export default Profile;