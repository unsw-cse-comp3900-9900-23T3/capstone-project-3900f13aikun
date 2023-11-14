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



    function renderPage() {
        const res = apiCall(`/profile`, "GET");
        res.then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                setPersonInfo(data);
                if (data.role === 2) {
                    const res2 = apiCall(`/applyIndProject`, 'Get');
                    res2.then((data) => {
                        if (data.error) {
                            alert(data.error);
                        } else {
                            setApplyInfo(data);
                        }
                    })
                }
            }
        });
    }
    useEffect(() => {
        renderPage();
    }, [])

    console.log(personInfo)
    console.log(applyInfo)

    // if the industry partner declined the request, the student will recive a message on his notification page that show you has been declined

    // the request message will be removed on this notificaiton page 
    function decline(applyId) {
        const res = apiCall("/applyProject", 'Put', { apply_id: applyId, apply_status: 2 })
        res.then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                renderPage();
            }
        })
    }

    // if the industry partner declined the request, the student will recive a message on his notification page that show you has been accepted

    // the request message will be removed on this notificaiton page

    // on the every student(include group member) and industry partner 'my project page', there will be the paired project
    function accept(applyId) {
        const res = apiCall("/applyProject", 'Put', { apply_id: applyId, apply_status: 1 })
        res.then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                renderPage();
            }
        })
    }

    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>Notification</Pagebackground>

            {applyInfo.map((item) => (

                <AppBar position="static" sx={{ marginTop: '10px', width: '215vh' }} >
                    {(item.apply_status === 0 || item.apply_status === 3) ?
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
                                {item.apply_status === 0 ? <span>
                                    Your project <u>{item.project.title}</u>  has been applies by the supervisor <u>{item.teacher.name}</u>

                                </span> : null}

                            </Typography>
                            <Button variant="contained" color="success" sx={{ marginRight: '10px' }} onClick={() => accept(item.id)}>
                                Accept
                            </Button>
                            <Button variant="outlined" color="error" onClick={() => decline(item.id)} >
                                decline
                            </Button>


                        </Toolbar> : null
                    }

                </AppBar>
            ))}


        </>
    );

}

export default Notification;