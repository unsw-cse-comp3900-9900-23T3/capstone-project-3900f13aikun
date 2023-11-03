import { Card, CardActions, CardContent, Typography } from "@mui/material";
import NavigationBtn from "../components/NavigationBtn";
import { Pagebackground } from "../components/StyledElement";
import Button from '@mui/material/Button';
import React from "react";


function Apppro() {
    const [number,setNumber] = React.useState(1);

    return <>
        <NavigationBtn></NavigationBtn>
        <Pagebackground>My apply projects</Pagebackground>
        <div style={{ width: '1000px', borderLeft: '2px black solid', borderRight: '2px black solid', height: '300vh' }}>
            {number == 1 &&<Card sx={{ maxWidth: 600, minWidth: 400, border: '2px solid lightgray', margin: 'auto' }}>
                <CardContent>
                    <Typography
                        sx={{ textDecorationLine: "underline", cursor: "pointer" }}
                        gutterBottom
                        variant="h5"
                        component="div"
                    >
                        Software Engineering
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Location:   Sydney
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Project type: Engineering
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                        Group Project | Paid
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="error" sx={{margin:'auto'}} onClick={() => setNumber(2)}>
                        delete apply
                    </Button>
                </CardActions>
            </Card>}
            



        </div>
    </>
}
export default Apppro;