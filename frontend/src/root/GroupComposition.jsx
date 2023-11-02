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

function GroupComposition() {
  const { groupId } = useParams();
  const [groupDetail, setGroupDetail] = useState({});

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
      <Box>
        <Typography variant="h3" gutterBottom>
          {groupDetail.group_name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {groupDetail.group_description}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5" gutterBottom>
          Members
        </Typography>
        <List>
          {groupDetail.members &&
            groupDetail.members.map((item) => (
              <ListItem key={item.user_id}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
        </List>
      </Box>
    </>
  );
}

export default GroupComposition;
