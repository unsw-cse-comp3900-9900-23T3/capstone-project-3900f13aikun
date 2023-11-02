import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from '../components/StyledElement';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function MyCreateGroup() {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const [groupName, setGroupName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [limitNumber, setLimitNumber] = React.useState('');
    const [isPrivate, setIsPrivate] = React.useState('');

    React.useEffect(() => {
        if (groupId) {
            getGroupInfo();
        }
    }, []);

    const handleCreateClick = () => {
        if (groupId) {
            apiCall(`/group`, "PUT", {
                group_id: groupId,
                group_name: groupName,
                group_description: description,
                limit_no: limitNumber,
                is_private: isPrivate,
            }).then((res) => {
                navigate('/my-group');
            });
            return;
        }
        apiCall(`/group`, "POST", {
            group_name: groupName,
            group_description: description,
            limit_no: limitNumber,
            is_private: isPrivate,
        }).then((res) => {
            navigate("/my-group");
        });
    };

    const getGroupInfo = () => {
        apiCall(`/group/${groupId}`, "GET").then((res) => {
            setGroupName(res.group_name);
            setDescription(res.group_description);
            setLimitNumber(res.limit_no);
            setIsPrivate(res.is_private);
        });
    };

    return (
        <>
            <NavigationBtn></NavigationBtn>
            <Pagebackground>Create Group</Pagebackground>
            <Box
                component="form"
                sx={{
                    py: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                noValidate
                autoComplete="off">
                <TextField
                    label="Group Name"
                    variant="filled"
                    value={groupName}
                    style={{ width: "400px" }}
                    onChange={(e) => {
                        setGroupName(e.target.value);
                    }}
                />
                <br></br>
                <TextField
                    label="Group Description"
                    variant="filled"
                    value={description}
                    style={{ width: "400px" }}
                    multiline
                    rows={4}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
                <br></br>
                <TextField
                    label="Limit members"
                    variant="filled"
                    value={limitNumber}
                    style={{ width: "400px" }}
                    onChange={(e) => {
                        setLimitNumber(e.target.value);
                    }}
                />
                <br></br>
                <FormControl style={{ width: "400px" }}>
                    <FormLabel>Group status:</FormLabel>
                    <RadioGroup
                        value={isPrivate}
                        onChange={(e) => {
                            setIsPrivate(e.target.value);
                        }}>
                        <FormControlLabel value="0" control={<Radio />} label="public" />
                        <FormControlLabel value="1" control={<Radio />} label="Private" />
                    </RadioGroup>
                </FormControl>
                <br></br>
                <Button
                    variant="contained"
                    color="success"
                    sx={{ marginTop: "30px" }}
                    onClick={() => {
                        handleCreateClick();
                    }}>
                    Publish
                </Button>
            </Box>
        </>
    );

}

export default MyCreateGroup;