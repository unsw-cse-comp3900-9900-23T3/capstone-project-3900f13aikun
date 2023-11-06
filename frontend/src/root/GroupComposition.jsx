import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from "../components/StyledElement";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import Divider from '@mui/material/Divider';
import ListItemIcon from "@mui/material/ListItemIcon";
import CardContent from "@mui/material/CardContent";
import { create } from "@mui/material/styles/createTransitions";

function GroupComposition() {
    const { groupId } = useParams();
    const [groupDetail, setGroupDetail] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        getGroupDetail();
    }, []);

    const getGroupDetail = () => {
        apiCall(`/group/${groupId}`, "GET").then((res) => {
            setGroupDetail(res);
        });
    };



    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>My Group</Pagebackground>
            <Box sx={{ pt: 10, display: "flex", flexDirection: "column" }}>
                <Card sx={{ width: "600px", height: "500px", border: '2px solid lightgray' }}>
                    <CardContent>
                        <Typography variant="h3" gutterBottom>
                            {groupDetail.group_name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <span style={{ color: '#555' }}>{groupDetail.group_description}</span>
                        </Typography>
                        <Divider sx={{ marginTop: 2, marginBottom: 2, borderTop: '1px solid lightgray' }} />
                        <Typography variant="h6" gutterBottom>
                            Members:
                        </Typography>
                        <List>
                            {groupDetail.creator && (
                                <ListItem>
                                    <ListItemIcon>
                                        <span>&#9733;</span>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={groupDetail.creator.name}
                                        style={{ fontSize: '16px', color: 'cornflowerblue' }}
                                        sx={{ textDecorationLine: "underline", cursor: "pointer" }}
                                        onClick={() => {
                                            navigate(`/profile-view/${groupDetail.creator_id}`);
                                        }}>
                                    </ListItemText>
                                </ListItem>
                            )}
                            {groupDetail.members && groupDetail.members.map((item) => (
                                <ListItem key={item.user_id}>
                                    <ListItemIcon>
                                        <span>&#8226;</span>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.name}
                                        style={{ fontSize: '16px' }}
                                        sx={{ textDecorationLine: "underline", cursor: "pointer" }}
                                        onClick={() => {
                                            navigate(`/profile-view/${item.user_id}`);
                                        }}></ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}

export default GroupComposition;
