import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NavigationBtn from '../components/NavigationBtn';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, formControlClasses } from '@mui/material';
import { apiCall, checkEmail, checkName, checkSkills, checkWorkRight, extractUId, fileToDataUrl } from '../components/HelpFunctions';
import { Pagebackground } from '../components/StyledElement';

function Profile() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [workRight, setWorkRight] = React.useState('');
  const [skill, setSkill] = React.useState('');


  const [inputname, setInputname] = React.useState('');
  const [inputemail, setInputEmail] = React.useState('');

  const [avatarUrl, setAvatarUrl] = React.useState('https://img2.baidu.com/it/u=3406119999,3272762192&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500');

  const headerStyle = {
    backgroundColor: '#007BFF', // 背景颜色为蓝色
    color: 'white', // 文字颜色为白色
    textAlign: 'center', // 文字居中
    padding: '20px' // 上下左右的内边距，可根据需要调整
  };

  React.useEffect(() => {
    apiCall(`/getUserInfo/${localStorage.getItem('userId')}`, 'GET')
      .then((data) => {
        if (data.error) {
          alert(data.error)
        } else {
          setEmail(data.email)
          setName(data.name)
        }
      })
    console.log(workRight)
  });

  async function updateProfile() {
    const res = apiCall(`/updateprofile/${localStorage.getItem('userId')}`, 'PUT', { 'name': inputname, 'email': inputemail, 'workright': workRight, 'skill': skill });
    res.then((data) => {
      if (data.error) {
        alert(data.error)
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



  function checkProfile() {
    if (checkEmail(inputemail) && checkWorkRight(workRight) && checkSkills(skill)) {
      updateProfile();
    }
  }

  const handleReplaceAvatar = () => {
    setAvatarUrl(null);
  };


  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Pagebackground>My Profile</Pagebackground>
      <Box
        component="form"
        sx={{
          py: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl style={{ textAlign: 'center', position: 'relative'}}>
          <div style={{ width: '130px', height: '130px', border: '2px solid #3489db', borderRadius: '50%', overflow: 'hidden' }}>
            <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }} />
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
            <Button htmlFor="upload" onClick={handleReplaceAvatar} style={{ left: '50%', transform: 'translateX(-50%)', backgroundColor: 'transparent', color: '#3489db' }}>
              Replace
            </Button>
          )}
        </FormControl>
        <br></br>
        <FormControl style={{ width: "400px", backgroundColor: '#F5F5F5', borderRadius: '10px', padding: '100px'}}>
          <FormLabel style={{ fontWeight: 'bold', color: 'black' }}>Email:</FormLabel>
          <TextField id="filled-basic" label="email" variant="filled" placeholder={email} value={inputemail} style={{ width: '400px' }}
            onChange={(e) => {
              setInputEmail(e.target.value);
            }} />
          <br></br>
          <FormLabel style={{ fontWeight: 'bold', color: 'black' }}>Name:</FormLabel>
          <TextField id="filled-basic" label="name" variant="filled" placeholder={name} value={inputname} style={{ width: '400px' }}
            onChange={(e) => {
              setInputname(e.target.value);
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
          <FormLabel style={{ fontWeight: 'bold', color: 'black' }} >Skills:</FormLabel>
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

        <Button id='registerbutton' role="profile" variant="contained" color="success" onClick={checkProfile} sx={{ marginTop: '30px' }}>Save</Button>
      </Box >
    </>
  )
}


export default Profile;