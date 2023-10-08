import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Dashtextfield, Dashbackground } from '../root/InitialDash';
import { styled } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


const Topselection = styled('div')({
  display: 'flex',
  height: '60px',
  justifyContent: 'space-between'
})

const Iconchicken = styled('div')({
  backgroundImage: `url('/chicken_icon.jpeg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'white',
  borderRadius: '50%',
  height: '80px',
  width: '80px',
 
})

export const NavigationBtn = () => {
  const navigate = useNavigate();
  const [isshow, setIsshow] = React.useState(true);
  const [value, setValue] = React.useState('one');
  const path = useLocation();
  React.useEffect(() => {
    if (path.pathname === '/') {
      setValue('one');
      setIsshow(true);
    } else if (path.pathname === '/profile') {
      setValue('two');

    } else if (path.pathname === '/register') {

      setIsshow(false);
    } else if (path.pathname === '/login') {

      setIsshow(false);
    }
  }, []);

  return (
    <>
      <Box sx={{ width: '100%', borderBottom: '2px black solid', paddingBottom: '18px' }}>

        <Topselection>
          <div style={{display:'flex'}}>
            <Iconchicken></Iconchicken>
            <div style={{ marginTop: '10px', width: '350px',marginLeft: '10px'}}><b style={{ fontSize: '20px' }}>student industry project management system</b></div>
          </div>
          
          {isshow&&<Box sx={{ width: '80%', position: 'relative', left: '100px', top:'8px'}}>
            <Tabs
              value={value}
              aria-label="wrapped label tabs example"
            >
              <Tab value="one" label="project search" onClick={() => { navigate('/') }} />
              <Tab value="two" label="Profile" onClick={() => { navigate('/profile') }} />
            </Tabs>
          </Box>}
          
          
          {isshow ? 
          (<div style={{ width: '400px' }}>
            <Button variant="contained" color="success" size='large' sx={{ marginTop: '13px', marginRight: '20px' }} onClick={() => navigate('/login')}>sign in</Button>
            <Button variant="outlined" size='large' sx={{ marginTop: '13px' }} onClick={() => navigate('/register')}>Sign up</Button>
          </div>)
          : <Button variant="contained" color="error" size='large' sx={{ marginTop: '13px', marginRight: '20px'}} onClick={() => navigate('/') }>return home</Button>}

        </Topselection>


      </Box>

    </>

  );
}

export default NavigationBtn;
