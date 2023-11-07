import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { apiCall } from './HelpFunctions';
import { Iconchicken, Topselection } from './StyledElement';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getUserRole } from './EnumMap';


export const NavigationBtn = () => {
  const navigate = useNavigate();
  const [isshow, setIsshow] = React.useState(true);
  const [islog, setIslog] = React.useState(false);
  const [value, setValue] = React.useState('one');
  const [picture, setPicture] = React.useState("")
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [role, setRole] = React.useState(0)


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function switchAccount() {
    navigate('/login')
    localStorage.clear()
  }

  function savedProjects() {
    navigate('/saved-projects')
  }

  function application() {
    navigate('/apppro')
  }

  function notification() {
    navigate('/notification')
  }

  const path = useLocation();
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const res = apiCall(`/profile`, 'GET')
      res.then((data) => {
        if (data.error) {
          alert(data.error)
        } else {
          setName(data.name)
          setEmail(data.email)
          setRole(data.role)
          setPicture(data.avatarUrl)
        }
      })
    }

    if (path.pathname === '/') {
      setValue('one');
      setIsshow(true);
    } else if (path.pathname === '/profile' || path.pathname === '/profile-detail') {
      setValue('two');
    } else if (path.pathname === '/my-created-project' || path.pathname === '/create-project') {
      setValue('three');
    } else if (path.pathname === '/my-group' || path.pathname === '/my-create-group') {
      setValue('four');
    } else if (path.pathname === '/my-project' || path.pathname === '/project-delivery/:id') {
      setValue('five');
    } else if (path.pathname === '/register') {
      setIsshow(false);
    } else if (path.pathname === '/login') {
      setIsshow(false);
    } else {
      setIsshow(false);
    }
    if (localStorage.getItem('token')) {
      setIslog(true);
      setIsshow(true);
    }
  }, []);

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    navigate('/')
  }

  function testLogin() {
    if (!localStorage.getItem('token')) {
      alert('please login in')
    } else {
      navigate('/profile-detail')
    }
  }



  return (
    <>
      <Box sx={{ width: '100%', borderBottom: '2px black solid', paddingBottom: '18px' }}>

        <Topselection>
          <div style={{ display: 'flex' }}>
            <Iconchicken></Iconchicken>
            <div style={{ marginTop: '10px', width: '350px', marginLeft: '10px' }}><b style={{ fontSize: '20px' }}>Student Industry Project Management System</b></div>
          </div>

          {isshow && <Box sx={{ width: '80%', position: 'relative', marginLeftleft: '100px', top: '8px' }}>
            <Tabs
              value={value}
              aria-label="wrapped label tabs example"
            >
              <Tab value="one" label="project search" onClick={() => { navigate('/') }} />
              <Tab value="two" label="Profile" onClick={testLogin} />
              {role === 2 && <Tab value="three" label="Create Project" onClick={() => { navigate('/my-created-project') }}></Tab>}
              {role === 1 && <Tab value="four" label="My Group" onClick={() => { navigate('/my-group', '/my-create-group') }} ></Tab>}
              <Tab value="five" label="My Project" onClick={() => { navigate('/my-project') }}></Tab>
            </Tabs>
          </Box>}

          {islog && (<div style={{ width: "120px", height: "70px", marginRight: "50px", borderRadius: "50%", overflow: "hidden" }}>
            {picture && (<img src={picture} alt='avatarUrl' style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} ></img>)}
          </div>)
          }
          {islog && (<div style={{ position: 'relative', top: '15px', right: '40px' }}>
            <div style={{ width: '180px' }}><b>{getUserRole(role)}:</b></div>
            <div>
              <Button
                id="basic-button"
                sx={{ width: '100px' }}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                {name}▼
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={savedProjects}>Saved projects</MenuItem>
                <MenuItem onClick={application}>Apply project</MenuItem>
                <MenuItem onClick={notification}>Notification</MenuItem>
                <MenuItem onClick={switchAccount}>Switch account</MenuItem>
              </Menu>
            </div>
          </div>
          )
          }

          {(isshow && !islog) ?
            (<div style={{ width: '400px' }}>
              <Button variant="contained" color="success" size='large' sx={{ marginTop: '13px', marginRight: '20px' }} onClick={() => navigate('/login')}>sign in</Button>
              <Button variant="outlined" size='large' sx={{ marginTop: '13px' }} onClick={() => navigate('/register')}>Sign up</Button>
            </div>)
            : islog ? (<Button variant="contained" color="error" size='large' sx={{ marginTop: '13px', marginRight: '20px' }} onClick={logout}>logout</Button>)
              :
              <Button variant="contained" color="error" size='large' sx={{ marginTop: '13px', marginRight: '20px' }} onClick={() => navigate('/')}>return home</Button>}


        </Topselection>


      </Box>

    </>

  );
}

export default NavigationBtn;
