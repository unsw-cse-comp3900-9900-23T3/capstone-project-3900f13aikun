import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from '../components/StyledElement';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function MyGroup() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');

    const handleGroupCreate = () => {
        if (groupName.trim() !== '') {
            setGroups([...groups, groupName]);
            setGroupName('');
        }
    };

    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>My Group</Pagebackground>
            <div>
                <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <button onClick={handleGroupCreate}>Create Group</button>

                <h2>Group List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Group Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map((group, index) => (
                            <tr key={index}>
                                <td>{group}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    );

}

export default MyGroup;