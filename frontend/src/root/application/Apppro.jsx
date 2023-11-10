import { Card, CardActions, CardContent, Typography } from "@mui/material";
import NavigationBtn from "../../components/NavigationBtn";
import { Pagebackground } from "../../components/StyledElement";
import Button from '@mui/material/Button';
import React from "react";


function Apppro() {
    const [number,setNumber] = React.useState(1);
    // assume the data from database
    const AppprojectInfo = {title:'master', resume: 'jjjjjjjjjjjjjjjjjjjjqwewqe wewqcqwewqcqewq wqcewcqeqwwqewarffjuhdsfudhdhdsfhsdhfdbeifhicnbjksdhsdfhsdijjjjjjjjjjjjjjj', uni: 'UNSW', location: 'Sydney',
                            projectType:'Information Technology', infor: 'GroupProject | Paid'}


    // spec:  after clicking this button, delete this project that applied by the user(show nothing at this page)
    //         
    //        if the user deleted the project applied, the apply request will also be deleted at the notification page of the corrsponding industry partner
    //       
    //          
    // 
    function deleteApp() {
        setNumber(2);
        localStorage.removeItem('applied');
    }
    return <>
        <NavigationBtn></NavigationBtn>
        <Pagebackground>My apply projects</Pagebackground>
        <div style={{ width: '1000px', borderLeft: '2px black solid', borderRight: '2px black solid', height: '300vh'}}>
            {number == 1 &&<Card sx={{maxWidth: 600, minWidth: 400, border: '2px solid lightgray', margin: 'auto', marginTop: '10%'}}>
                <CardContent >
                    <Typography
                        sx={{ textDecorationLine: "underline", cursor: "pointer",marginLeft:'42%'}}
                        gutterBottom
                        variant="h5"
                        component="div"
                    >
                        {AppprojectInfo.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                       <b>Location:</b>   {AppprojectInfo.location}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <b>Project type:</b> {AppprojectInfo.projectType}
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                        {AppprojectInfo.infor}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <b>Univeristy:</b>    {AppprojectInfo.uni}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <b>resume: </b>      {AppprojectInfo.resume}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="error" sx={{margin:'auto'}} onClick={deleteApp}>
                        delete apply
                    </Button>
                </CardActions>
            </Card>}
            



        </div>
    </>
}
export default Apppro;