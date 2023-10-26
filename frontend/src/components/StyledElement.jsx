import { styled } from '@mui/system';

export const Topselection = styled('div')({
    display: 'flex',
    height: '60px',
    justifyContent: 'space-between'
})

export const Iconchicken = styled('div')({
    backgroundImage: `url('/chicken_icon.jpeg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'white',
    borderRadius: '50%',
    height: '80px',
    width: '80px',

})

export const Pagebackground = styled('Typography')({
    fontSize: '30px',
    backgroundColor: '#00008B',
    width: '1515px',
    color: 'white',
    padding: '40px',
})

export const Dashbackground = styled("div")({
    backgroundImage: `url('/background.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    width: "1470px",
    height: "300px",
    marginTop: "20px",
    zIndex: "1",
});

export const Dashtextfield = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
    background: "white",
    width: "1000px",
    position: "relative",
    top: "40px",
    left: "250px",
});