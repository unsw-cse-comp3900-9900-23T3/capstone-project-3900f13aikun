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
  const [picture, setPicture] = React.useState("");
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState(0);

  const NavRefresh = (paths) => {
    navigate(paths);
    window.location.reload();
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function switchAccount() {
    NavRefresh('/login')
    localStorage.clear()
  }

  function savedLists() {
    NavRefresh('/saved-projects')
  }

  function application() {
    NavRefresh('/apppro')
  }

  function recommendLists() {
    NavRefresh('/recommend-projects')
  }


  function notification() {
    NavRefresh('/notification')
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
          if (data.avatarUrl == null) {
            setPicture("https://d2w9rnfcy7mm78.cloudfront.net/8040974/original_ff4f1f43d7b72cc31d2eb5b0827ff1ac.png?1595022778?bc=0")
          } else {
            setPicture(data.avatarUrl);
          }
        }
      })
    }

    if (path.pathname === '/') {
      setValue('one');
      // setIsshow(true);
    } else if (path.pathname === '/profile' || path.pathname === '/profile-detail') {
      setValue('two');
    } else if (path.pathname === '/my-created-project' || path.pathname === '/create-project') {
      setValue('three');
    } else if (path.pathname === '/my-group' || path.pathname === '/my-create-group') {
      setValue('four');
    } else if (path.pathname === '/my-project' || path.pathname === '/project-delivery/:id') {
      setValue('five');
    } else if (path.pathname === '/saved-projects') {
      setValue('six');
    } else if (path.pathname === '/saved-academic-supervisors') {
      setValue('seven');
    } else if (path.pathname === '/recommend-academic-supervisors') {
      setValue('eight');
    } else if (path.pathname === '/recommend-projects') {
      setValue('nine');
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
  }, [name, picture, email, role, path.pathname]);

  function logout() {

    localStorage.clear();
    NavRefresh('/')
  }

  function testProfile() {
    if (!localStorage.getItem('token')) {
      alert('please login in')
    } else {
      NavRefresh('/profile-detail')
    }
  }

  function testMyProject() {
    if (!localStorage.getItem('token')) {
      alert('please login in')
    } else {
      NavRefresh('/my-project')
    }
  }



  return (
    <>
      <Box sx={{ width: '100%', paddingBottom: '18px' }}>

        <Topselection>
          <div style={{ display: 'flex' }}>
            <Iconchicken onClick={() => {NavRefresh('/')}}></Iconchicken>
            <div style={{ marginTop: '10px', width: '350px', marginLeft: '10px' }}><b style={{ fontSize: '20px' }}>Student Industry Project Management System</b></div>
          </div>

          {isshow && <Box sx={{ width: '80%', position: 'relative', marginLeftleft: '100px', top: '8px' }}>
            <Tabs
              value={value}
              aria-label="wrapped label tabs example"
            >
              <Tab value="one" label="project search" onClick={() => { NavRefresh('/') }} />
              <Tab value="two" label="Profile" onClick={testProfile} />
              {role === 2 && <Tab value="three" label="Create Project" onClick={() => { NavRefresh('/my-created-project') }}></Tab>}
              {role === 1 && <Tab value="four" label="My Group" onClick={() => { NavRefresh('/my-group') }} ></Tab>}
              <Tab value="five" label="My Project" onClick={testMyProject}></Tab>
            </Tabs>
          </Box>}

          {islog && (<div style={{ width: "130px", height: "70px", marginRight: "50px", borderRadius: "50%", overflow: "hidden" }}>
            {picture && (<img src={picture} alt='avatarUrl' onClick={() => NavRefresh('/profile')} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} ></img>)}
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
                <MenuItem onClick={application}>Applied project</MenuItem>
                <MenuItem onClick={notification}>Notification</MenuItem>
                <MenuItem onClick={recommendLists}>Recommended Lists</MenuItem>
                <MenuItem onClick={savedLists}>Saved Lists</MenuItem>
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
