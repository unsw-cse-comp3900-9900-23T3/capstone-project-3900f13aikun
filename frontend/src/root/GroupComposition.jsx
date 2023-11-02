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
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

function GroupComposition() {
    const { groupId } = useParams();
    const [groupDetail, setGroupDetail] = useState([]);

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
                            {/* {groupDetail.members &&
                                groupDetail.member.map((item) => (
                                    <ListItem key={item.user_id}>
                                        <ListItemText primary={item.name} />
                                    </ListItem>
                                ))} */}
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}

export default GroupComposition;
