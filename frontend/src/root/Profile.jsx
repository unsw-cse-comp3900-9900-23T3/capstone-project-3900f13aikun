import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import NavigationBtn from '../components/NavigationBtn';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { apiCall, checkEmail, checkName, checkSkills, checkWorkRight, fileToDataUrl } from '../components/HelpFunctions';

// const ProfileDiv = styled('div')({
//   padding: '10px'
// })

const Profile = () => {
  const param = useParams();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [workRight, setWorkRight] = React.useState('');
  const [skill, setSkill] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState(null);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      const res = apiCall(`/getUserInfo/${localStorage.getItem('userId')}`, 'GET')
      res.then((data) => {
        if (data.error) {
          alert(data.error)
        } else {
          setEmail(data.email)
          setName(data.name)
        }
      })
    }
  });

  async function updateProfile() {
    if (checkEmail(email) && checkName(name) && checkWorkRight(workRight) && checkSkills(skill)) {
      const res = apiCall(`/profile/update/${param.userId}/`, 'PUT',
        { 'name': name, 'email': email, 'workRight': workRight, 'skill': skill, "avatarUrl": avatarUrl });
      res.then((data) => {
        if (data.error) {
          alert(data.error)
        } else {
          console.log(data)
        }
      })
    }
  }

  useEffect(() => {
    apiCall(`/profile/details/${param.userId}/`, 'GET', {}).then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setEmail(data.email);
        setName(data.name);
        setWorkRight(data.workRight);
        setSkill(data.skill)
      }
    });
  }, [])

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (workRight.includes(value)) {
      setWorkRight(workRight.filter((item) => item !== value));
    } else {
      setWorkRight([...workRight, value]);
    }
  };

  const handleReplaceAvatar = () => {
    setAvatarUrl(null);
  };

  function keyProfile(e) {
    if (e.key === 'Enter') {
      updateProfile();
    }
  }

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Box
        component="form"
        sx={{
          py: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ width: '130px', height: '130px', border: '2px solid #3489db', borderRadius: '50%', overflow: 'hidden' }}>
            <img src={avatarUrl || 'empty-avatar.png'} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }} />
          </div>
          {!avatarUrl && (
            <div>
              <label htmlFor="upload" style={{ backgroundColor: '#3498db', padding: '5px 10px', borderRadius: '5px', marginBottom: '10px' }}>
                Upload
              </label>
              <input type="file" id="upload" accept="image/jpeg, image/png, image/jpg"
                onChange={async (e) => { setAvatarUrl(await fileToDataUrl(e.target.files[0])); }} 
                style={{ display: 'none' }} />
            </div>
          )}
          {avatarUrl && (
            <Button onClick={handleReplaceAvatar} style={{ left: '50%', transform: 'translateX(-50%)', backgroundColor: 'transparent', color: '#3489db' }}>
              Replace
            </Button>
          )}
        </FormControl>
        <br></br>
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
        <Button id='registerbutton' role="profile" variant="contained" color="success" onKeyDown={keyProfile} onClick={updateProfile} sx={{ marginTop: '30px' }}>Save</Button>
      </Box >
    </>
  )
}


export default Profile;