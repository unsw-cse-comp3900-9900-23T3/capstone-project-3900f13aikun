import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from "../components/StyledElement";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Table, TableCell, TableHead, TableRow, TableBody, TableContainer, Paper } from "@mui/material";

function MyGroup() {
  const navigate = useNavigate();
  const [myGroups, setMyGroups] = useState([]);
  const [otherGroups, setOtherGroups] = useState([]);
  


  React.useEffect(() => {
    getJoinedGroups();
    getOthersGroups();
  }, []);

  const getJoinedGroups = () => {
    apiCall(`/joinedGroup`, "GET").then((res) => {
      setMyGroups(res);
    });
  };

  const getOthersGroups = () => {
    apiCall(`/notInGroup/`, "GET").then((res) => {
      setOtherGroups(res);
    });
  };

  const handleLeave = (groupId) => {
    apiCall(`/group/leave/${groupId}`, "GET").then((res) => {
      if (res.message === "success") {
        getJoinedGroups();
        getOthersGroups();
      }
    });
  };

  const handleJoin = (groupId) => {
    apiCall(`/group/join/${groupId}`, "GET").then((res) => {
      if (res.message === "success") {
        getJoinedGroups();
        getOthersGroups();
      }
    });
  };

  React.useEffect(() => {}, []);

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Pagebackground>My Group</Pagebackground>
      <Button
        sx={{ marginTop: "20px", left: "500px" }}
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/my-create-group");
        }}>
        create
      </Button>
      <Typography variant="h6" component="div" style={{ marginRight: "840px" }}>
        Groups you are in
      </Typography>
      <br></br>
      <TableContainer component={Paper} style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Group name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Members</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myGroups.map((item) => (
              <TableRow key={item.group_id}>
                <TableCell
                  sx={{ textDecorationLine: "underline", cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/group-composition/${item.group_id}`);
                  }}>
                  {item.group_name}
                </TableCell>
                <TableCell>{item.group_description}</TableCell>
                <TableCell>
                  {item.members.length + 1}/{item.limit_no}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      navigate(`/edit-group/${item.group_id}`);
                    }}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleLeave(item.group_id)}>Leave</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <br></br>
      <Typography variant="h6" component="div" style={{ marginRight: "810px" }}>
        Other joinable groups
      </Typography>
      <br></br>
      <TableContainer component={Paper} style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Group name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Members</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {otherGroups.map((item) => (
              <TableRow key={item.group_id}>
                <TableCell
                  sx={{ textDecorationLine: "underline", cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/group-composition/${item.group_id}`);
                  }}>
                  {item.group_name}
                </TableCell>
                <TableCell>{item.group_description}</TableCell>
                <TableCell>
                  {item.members.length + 1}/{item.limit_no}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleJoin(item.group_id)}>Join</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default MyGroup;
