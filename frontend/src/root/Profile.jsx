import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NavigationBtn from '../components/NavigationBtn';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { apiCall, checkEmail, checkName, checkSkills, checkWorkRight, extractUId } from '../components/HelpFunctions';

// const ProfileDiv = styled('div')({
//   padding: '10px'
// })

function Profile() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [workRight, setWorkRight] = React.useState('');
  const [skill, setSkill] = React.useState('');

  React.useEffect(() => {
    apiCall('/profile/details', 'GET', {
      'email': email, 'name': name
    }).then(( data ) => {
      if (data.error) {
        alert(data.error)
      } else {
        console.log(data)
        console.log(data.token)
      }
    })
  });
  
  async function updateName() {
    const res = apiCall('/profile/setname', 'PUT', { 'name': name });
    res.then((data) => {
      if (data.error) {
        alert(data.error)
      } else {
        console.log(data)
      }
    })
  }

  async function updateEmail() {
    const res = apiCall('/profile/setemail', 'PUT', { 'email': email });
    res.then((data) => {
      if (data.error) {
        alert(data.error)
      } else {
        console.log(data)
      }
    })
  }

  async function updateWorkright() {
    const res = apiCall('/profile/setworkright', 'POST', { 'workright': workRight });
    res.then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        console.log(data)
      }
    })
  }

  async function updateSkills() {
    const res = apiCall('/profile/setskills', 'POST', { 'skill': skill });
    res.then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        console.log(data)
      }
    })
  }

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (workRight.includes(value)) {
      setWorkRight(workRight.filter((item) => item !== value));
    } else {
      setWorkRight([...workRight, value]);
    }
  };


  function keyProfile(e) {
    if (e.key === 'Enter') {
      checkProfile();
    }
  }

  function checkProfile() {
    if (checkEmail(email) && checkName(name) && checkWorkRight(workRight) && checkSkills(skill)) {
      updateEmail();
      updateName();
      updateWorkright();
      updateSkills();
    }
  }

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
        <Button id='registerbutton' role="profile" variant="contained" color="success" onKeyDown={keyProfile} onClick={checkProfile} sx={{ marginTop: '30px' }}>Save</Button>
      </Box >
    </>
  )
}


export default Profile;