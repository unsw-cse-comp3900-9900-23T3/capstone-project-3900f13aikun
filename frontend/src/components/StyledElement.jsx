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
