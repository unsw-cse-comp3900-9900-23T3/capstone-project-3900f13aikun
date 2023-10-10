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
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';


export const Dashbackground = styled('div')({
  backgroundImage: `url('/background.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'white',
  width: '1470px',
  height: '300px',
  marginTop: '20px',
  zIndex: '1'
})

export const Dashtextfield = styled('div')({
  display: 'flex',
  justifyContent: 'center', // Center items horizontally
  alignItems: 'center',     // Center items vertically
  height: '200px',           // Optional: full viewport height
  background: 'white',
  width: "1000px",
  position: 'relative',
  top: '50px',
  left: '250px'
})




const InitialDash = () => {

  const [age, setAge] = React.useState('');

<<<<<<< HEAD
  useEffect(() => {
    // apiCall(`/get`, 'GET', {}).then((res) => {
    //   if (res.error) {
    //     alert(res.error);
    //   } else {
    //     console.log(res)
    //   }
    // })
  }, []);
=======
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // useEffect(() => {
  //   apiCall(`/get`, 'GET', {}).then((res) => {
  //     if (res.error) {
  //       alert(res.error);
  //     } else {
  //       console.log(res)
  //     }
  //   })
  // }, []);
>>>>>>> jjytest
  function CreateJob() {
    return (
      <>
        <Card sx={{ width: '300px', marginTop: '100px', marginRight: '30px' }}>
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
          <div style={{ marginRight: "40px" }}>
            <span style={{ position: 'relative', top: '45px', left: '130px' }}><b>keywords</b></span>
            <TextField id="outlined-basic" label="Enter key words" variant="outlined" style={{ zIndex: '3', marginTop: '100px', width: '220px' }} />
          </div>
          <div>

            <FormControl sx={{ m: 1, minWidth: 210, marginTop: '109px' }}>
              <InputLabel id="demo-simple-select-helper-label">Any Classification</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                label="Classificatgion"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>IT</MenuItem>
                <MenuItem value={20}>ACCOUNTING</MenuItem>
                <MenuItem value={30}>Banking</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ marginRight: "30px" }}>
            <span style={{ position: 'relative', top: '45px', left: '130px' }}><b>Where</b></span>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" style={{ zIndex: '3', marginTop: '100px', width: '220px' }} />
          </div>

          <Button variant="outlined" color='secondary' sx={{ marginTop: '100px' }}>Search</Button>



        </Dashtextfield>
      </Dashbackground>


      <div style={{ display: 'flex', width: '100%', height: '100px', justifyContent: 'center', marginTop: '15px' }}>
        <div>
          <span style={{ fontSize: '30px', position: 'relative', right: '100px' }}>recommend project</span>
        </div>

        <div>
          <div style={{ fontSize: '30px', position: 'relative', right: '-90px' }}>find your project</div>
          <div style={{ fontSize: '20px', position: 'relative', right: '-90px' }}>go through the information of every project to find the most suitable one for you</div>
        </div>

      </div>
      <div style={{ display: 'flex' }}>
        <Stack direction="column" spacing={2} style={{ overflowY: 'auto', width: '510px', background: '#F2F2F2', borderRadius: '3%', marginLeft: '28px',height:'500px' }}>
          <div><CreateJob></CreateJob></div>
          <div><CreateJob></CreateJob></div>
          <div><CreateJob></CreateJob></div>
          <div><CreateJob></CreateJob></div>
        </Stack>
        <Stack direction="row" spacing={2} style={{ overflow: 'auto', width: '880px', background: '#F2F2F2', position: 'relative', left: '60px', marginTop: '0px', border: '2px solid black', borderRadius: '3%' }}>
          <div><CreateJob></CreateJob></div>
          <div><CreateJob></CreateJob></div>
          <div><CreateJob></CreateJob></div>
          <div><CreateJob></CreateJob></div>

        </Stack>
      </div>


    </div>



  );
}

export default InitialDash;
