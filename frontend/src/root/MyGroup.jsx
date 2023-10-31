import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from '../components/StyledElement';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Table, TableCell, TableHead, TableRow, TableBody, TableContainer, Paper } from '@mui/material';

function MyGroup() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [joinStatus, setJoinStatus] = React.useState({});

    const handleLeave = () => { }
    const handleJoin = () => { }

    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>My Group</Pagebackground>
            <Button
                sx={{ marginTop: '20px', left: '500px' }}
                variant="contained"
                color="success"
                onClick={() => {
                    navigate("/my-create-group");
                }}>
                create
            </Button>
            <Typography variant="h6" component="div" style={{ marginRight: '840px' }}>
                Groups you are in
            </Typography>
            <br></br>
            <TableContainer component={Paper} style={{ maxWidth: 1000, margin: '0 auto' }}>
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
                        {groups.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell
                                    sx={{ textDecorationLine: "underline", cursor: "pointer" }}
                                    onClick={() => {
                                        navigate(`/group-composition/${item.id}`);
                                    }}>
                                    {item.groupName}
                                </TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => {
                                            navigate(`/edit-group/${item.id}`);
                                        }}>
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleLeave(item.id)}>
                                        Leave
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
            <br></br>
            <Typography variant="h6" component="div" style={{ marginRight: '810px' }}>
                Other joinable groups
            </Typography>
            <br></br>
            <TableContainer component={Paper} style={{ maxWidth: 1000, margin: '0 auto' }}>
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
                        {groups.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.groupName}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>
                                    {joinStatus[item.id] ? (
                                        <Button onClick={() => handleLeave(item.id)}>
                                            Leave
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handleJoin(item.id)}>
                                            Join
                                        </Button>
                                    )}
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