import React from 'react';
import NavigationBtn from '../../components/NavigationBtn';
import { Pagebackground } from '../../components/StyledElement';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';



function Notification() {
    const [number, setNumber] = React.useState(1)
    // assume the data from database
    const AppprojectInfo = [{title:'master',studentName:'Mike', GroupInfo:'nothing'},{title:'master2',studentName:'Mike2', GroupInfo:'nothing2'}]


    // if the industry partner declined the request, the student will recive a message on his notification page that show you has been declined

    // the request message will be removed on this notificaiton page 
    function decline() {
        console.log('decline');
    }

    // if the industry partner declined the request, the student will recive a message on his notification page that show you has been accepted

    // the request message will be removed on this notificaiton page

    // on the every student(include group member) and industry partner 'my project page', there will be the paired project
    function accept() {
        console.log('accept');
    }

    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>Notification</Pagebackground>
            {number == 1 && 
            AppprojectInfo.map((item) => (
            
            <AppBar position="static" sx={{marginTop:'10px',width:'215vh'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Your project <u>{item.title}</u>  has been applies by the student <u>{item.studentName}</u>
                        <div>his group detail is {item.GroupInfo}</div>
                    </Typography>
                    <Button variant="contained" color="success" sx={{marginRight:'10px'}}>
                        Accept
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => {setNumber(2)}}>
                        decline
                    </Button>


                </Toolbar>

            </AppBar>
       ))
            }

        </>
    );

}

export default Notification;