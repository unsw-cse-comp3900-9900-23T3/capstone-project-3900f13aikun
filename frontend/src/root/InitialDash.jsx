import React, { useEffect } from 'react';
import NavigationBtn from '../components/NavigationBtn';
import TextField from '@mui/material/TextField';
import { apiCall } from '../components/HelpFunctions';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const Dashbackground = styled('div')({
  backgroundImage: `url('/background.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'white',
  width: '1470px',
  height: '300px',
  marginTop: '50px',
  zIndex: '1'
})

export const Dashtextfield = styled('div')({
  display: 'flex',
  justifyContent: 'center', // Center items horizontally
  alignItems: 'center',     // Center items vertically
  height: '200px'           // Optional: full viewport height
})

const Dashsingletext = styled('div')({
  margin: '10px', padding: '20px', background: 'white', zIndex: '2'
})
const InitialDash = () => {


  useEffect(() => {
    // apiCall(`/get`, 'GET', {}).then((res) => {
    //   if (res.error) {
    //     alert(res.error);
    //   } else {
    //     console.log(res)
    //   }
    // })
  }, []);
  function CreateJob() {
    return (
      <>
        <Card sx={{ maxWidth: 345, marginTop: '100px',marginRight:'30px'}}>
          <CardMedia
            sx={{ height: 120 }}
            image="https://img0.baidu.com/it/u=1275095085,1961143463&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </>
    )
  }


  return (
    <div>
      <NavigationBtn />

      <Dashbackground>

        <Dashtextfield>
          <Dashsingletext>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" style={{ zIndex: '3', marginTop: '100px' }} />
          </Dashsingletext>
          <Dashsingletext>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" style={{ zIndex: '3', marginTop: '100px' }} />
          </Dashsingletext>
          <Dashsingletext>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" style={{ zIndex: '3', marginTop: '100px' }} />
          </Dashsingletext>
        </Dashtextfield>

      </Dashbackground>
      <Dashtextfield>
        <CreateJob ></CreateJob>
        <CreateJob></CreateJob>
        <CreateJob></CreateJob>

      </Dashtextfield>

    </div>



  );
}

export default InitialDash;
