import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from '../components/StyledElement';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Table, TableCell, TableHead, TableRow } from '@mui/material';

function MyGroup() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);

    const handleCreate = () => {
        const newRow = {
            name: `小组${groups.length + 1}`,
            introduction: `这是小组${groups.length + 1}的介绍`,
        };
        setGroups([...groups, newRow]);
    };

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
            <Typography style={{ fontSize: "30px", marginRight: "1000px" }}>Groups you are in</Typography>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>小组名</th>
                            <th>介绍</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map((group, index) => (
                            <tr key={index}>
                                <td>{group.name}</td>
                                <td>{group.introduction}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleCreate}>Create</button>
            </div>
        </>
    );

}

export default MyGroup;