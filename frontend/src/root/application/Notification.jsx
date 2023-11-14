import React, { useEffect } from 'react';
import NavigationBtn from '../../components/NavigationBtn';
import { Pagebackground } from '../../components/StyledElement';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { apiCall } from '../../components/HelpFunctions';



function Notification() {
    const [personInfo, setPersonInfo] = React.useState({})
    const [applyInfo, setApplyInfo] = React.useState([])
    const [applyRes, setApplyRes] = React.useState([]);

    // assume the data from database

    useEffect(() => {
        // /applyIndProject


        const res2 = apiCall(`/profile`, "GET");
        res2.then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                setPersonInfo(data);
                if (data.role === 2) {
                    const res3 = apiCall(`/applyIndProject`, 'Get');
                    res3.then((data) => {
                        if (data.error) {
                            alert(data.error);
                        } else {
                            setApplyInfo(data);

                        }
                    })
                } else if (data.role === 3) {
                    const res3 = apiCall(`/applyTeacherProject`, 'Get');
                    res3.then((data) => {
                        if (data.error) {
                            alert(data.error);
                        } else {
                            setApplyRes(data)


                        }
                    })
                }

            }
        });
    }, [])

    console.log(personInfo)
    console.log(applyInfo)
    // if the industry partner declined the request, the student will recive a message on his notification page that show you has been declined

    // the request message will be removed on this notificaiton page 
    function decline() {
        console.log('decline');
    }

    // if the industry partner declined the request, the student will recive a message on his notification page that show you has been accepted

    // the request message will be removed on this notificaiton page

    // on the every student(include group member) and industry partner 'my project page', there will be the paired project
    function accept(applyId) {
        console.log('accept', applyId);
        const res = apiCall("/applyProject", 'Put', { apply_id: applyId, apply_status: 1 })
        res.then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                console.log(data)
            }
        })
    }

    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>Notification</Pagebackground>

            {(personInfo.role === 2 && applyInfo) ? applyInfo.map((item) => (

                <AppBar position="static" sx={{ marginTop: '10px', width: '215vh' }}>
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
                            {item.apply_status == 0 ? <span>
                                {item.id} Your project <u>{item.project.title}</u>  has been applies by the supervisor <u>{item.teacher.name}</u>

                            </span> : null}

                        </Typography>
                        <Button variant="contained" color="success" sx={{ marginRight: '10px' }} onClick={() => accept(item.id)}>
                            Accept {item.id}
                        </Button>
                        <Button variant="outlined" color="error" >
                            declines
                        </Button>


                    </Toolbar>

                </AppBar>
            )) : (personInfo.role === 3 && applyInfo) ? applyRes.map((item) => (
                // {item.apply_status === 0 ? null :<button>ss</button>}
                <AppBar position="static" sx={{ marginTop: '10px', width: '215vh' }}>
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
                            {item.apply_status === 2 ? <span>
                                {item.id} Your project <u>{item.project.title}</u>  has been declined

                            </span> : item.apply_status === 1 ?  <span>{item.id} Your project <u>{item.project.title}</u>  has been accepted </span>:null}

                        </Typography>
                        

                    </Toolbar>

                </AppBar>)) : null}


        </>
    );

}

export default Notification;