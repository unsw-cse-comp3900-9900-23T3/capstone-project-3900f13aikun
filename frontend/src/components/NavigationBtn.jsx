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



export const NavigationBtn = () => {
  const navigate = useNavigate();
  const [isshow, setIsshow] = React.useState(true);
  const [islog, setIslog] = React.useState(false);
  const [value, setValue] = React.useState('one');
  const [picture, setPicture] = React.useState('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fda0b06cb-b769-4c8d-b95c-e29b60b50e21%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1699602551&t=56a7074535ae9fd82e0d783badd8ae21')
  const [email, setEmail] = React.useState('')
  const [role, setRole] = React.useState('')


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


  const path = useLocation();
  React.useEffect(() => {
    if (localStorage.getItem('userId')) {
      const res = apiCall(`/getUserInfo/${localStorage.getItem('userId')}`, 'GET')
      res.then((data) => {
        if (data.error) {
          alert(data.error)
        } else {
          setEmail(data.email)
          setRole(data.role)
        }
      })
    }

    if (path.pathname === '/') {
      setValue('one');
      setIsshow(true);
    } else if (path.pathname === '/profile') {
      setValue('two');
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

    // const res2 = apiCall(`/getUserProfile/${localStorage.getItem('userId')}`, 'GET')
    // res2.then((data) => {
    //   setPicture(data.avatarUrl)
    //   console.log(data.avatarUrl)
    // })
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
      navigate('/profile')
    }
  }



  return (
    <>
      <Box sx={{ width: '100%', borderBottom: '2px black solid', paddingBottom: '18px' }}>

        <Topselection>
          <div style={{ display: 'flex' }}>
            <Iconchicken></Iconchicken>
            <div style={{ marginTop: '10px', width: '350px', marginLeft: '10px' }}><b style={{ fontSize: '20px' }}>student industry project management system</b></div>
          </div>

          {isshow && <Box sx={{ width: '80%', position: 'relative', left: '100px', top: '8px' }}>
            <Tabs
              value={value}
              aria-label="wrapped label tabs example"
            >
              <Tab value="one" label="project search" onClick={() => { navigate('/') }} />
              <Tab value="two" label="Profile" onClick={testLogin} />
              {role === 'Industry partner' && <Button sx={{ marginLeft: '60px' }} variant="contained" color="success" onClick={() => navigate('/create-project')}>create project</Button>}

            </Tabs>
          </Box>}

          {islog && (<div style={{
            width: '160px', height: '70px',
            background: `url(${picture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            borderRadius: '50%', marginRight: '60px'
          }}>
          </div>)
          }

          {islog && (<div style={{ position: 'relative', top: '20px', right: '50px' }}>
            <div style={{ width: '180px' }}><b>[{role}]</b></div>
            <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {email}
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
              <MenuItem onClick={switchAccount}>switch account</MenuItem>
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
