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
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';

const Dashbackground = styled('div')({
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

const Dashtextfield = styled('div')({
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

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  function CreateJob(imgpath ) {
    console.log(imgpath.imgpath)
    return (
      <>
        <Card sx={{ width: '300px', marginTop: '100px', marginRight: '30px' }}>
          <CardMedia
            sx={{ height: 120 }}
            image={imgpath.imgpath}
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
          <div style={{margin:'auto'}}><CreateJob imgpath="data:image/jpeg;base64,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"></CreateJob></div>
          <div style={{margin:'auto'}}><CreateJob imgpath="https://img1.baidu.com/it/u=2978943956,1947196634&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1697216400&t=754f7f1d208468886f4aaba9fbd6d11b"></CreateJob></div>
          <div style={{margin:'auto'}}><CreateJob imgpath="https://img0.baidu.com/it/u=2105544423,3215514087&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1697216400&t=2eabbb5fde27c2b34c22d99f31294ac5"></CreateJob></div>
        </Stack>
        <Stack direction="row" spacing={2} style={{ overflow: 'auto', width: '880px', background: '#F2F2F2', position: 'relative', left: '60px', marginTop: '0px', border: '2px solid black', borderRadius: '3%' }}>
         <div><CreateJob imgpath="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFRUYGBgaGiMcGBgYGRgZGBodGhwZGhkcGhocIy4lHB4rHxoYJjomKzA0NTU1GiQ7QDszPy40NTEBDAwMEA8QHhISHz0sJCw0Nj89MTE6NjE0NjE3NzQ/NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAKcBLQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYBB//EAEcQAAIBAgQDBAYGBwYEBwAAAAECAAMRBBIhMQVBUSIyYXEGE1KBkbEjQmJykqEzorLBwtHSBxQkc+HwFTSCszVDU2PT4vH/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAsEQADAAIBAwMDBAIDAQAAAAAAAQIDERIhMVEEIkETcYEyYcHwobGR4fEj/9oADAMBAAIRAxEAPwCTERPbPDEREAREQBERAEREAREQBERAEREAREQCThsC7q7KAQgu2oBtqdL76AzfU4PVVgjBVJXMCWFiAQOXPUTzAopp1SyOxAGVlvZTZtWtpbbfoZZ0UUVuxTqJ9Gbhra9pNRn2EwrJSb1/f8msxLSKWrhGUkEppv21+ydASD9Yfn0M0slunxBltj1bO+jcvqU2Hdp/W+H5dTKuoNBv+EDkOm80x06W2UtKXpHi0ydQDPfUt7Jk3hpYDsorHtCzC9taeo8f9ZMcuy2FGla4OYDoQbX6aW95kO2mFKaKb1LeyZgykaEWlr6zf6OhqOu3ja+hlbVHaAGvZX9lZdVsro1xJ2KyZSAnTXLa2vxkGE9ktaNlCgzmyqWNr2Avp1/MTeeG1f8A03+El+jTWqsfsH9pJ0DVlJHeXXUmxt7hMby1NaSNYxzU7bOSOAqew011MM6i7KQOs7A1EvrUbc3308dvL48pU8WqoU0JfQXvcWNxp/vpInNVPWibwzK3soIkmkgZgoVbn7Ztz6eU3DAn2VvexGc3BIvrN3SXcxUt9iBEsGwBG6pp9pj8hItVQpsU/Nv3wrT7By13NMTZVA7JAtcXtv8AWYfumuSQIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAWnB8NVdXFNwoNgwJYXuG6A35/GTqvDcQzBmemxAsMzObA9NPCPRY9mp5r8ml6ig3JNlG5+QHjOPJbm2dePGqhHOtwh73Io+/OfmJpq8Hc86a/dz/vE6DFagMqlV2udbnz5SLnvy16RN1rZFRO9Mp24Q+UDMm59rov2fCaTwlvbT9b+mdQaQW6gF2HeObKqk7DxO0rqzOpsxYEeP+7y05HXYiscz3KY8Nb20/W/pm58KQCMyXIXtdq9sqgju+B+MtKC3Uu7vlBsApOZ2OuUdPOaMYmuY0nRepLNbxJMssjb0VqFM7RUnB/bX9b+maatPKbXBuL3F/Hr5SXW0NpGxW6/d/e02lsyaWtom8Aazsb27B16dpJeGoxZe2GOYWGtr8r3G05/g7AOxO2TX8SSfWqryvfTmPfymNzujWHqS2U1Ljsp3mtvqdbg/n46C/KUnFS+RcyqOwMuXmLrv+W2mp8ZgHGujbG/xH57SLVtlNr7C9/vCIx8XsVl5LR7h3IdSDftW694ke0esuKKvlOUg2JABB+qcupzX5dJpwvDKeRHu+YgNoRa++gIlk2DSzC7gA30fLa4BJuB1JMrltNlscNIrqxrdoHJsG7xGgOo15Gx1Omsqce5JBLqwOoCtfL4WOolri8EBolR0AF7Z2Ita99wBzlTXQG59bnI6h9R4E/Lxl8Wu5TJvszVU2T7v8bzXNlTZPu/xvNc3Ri+4iIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIBf8Ao0ey/wB5fk0tKlYjS/ZO/ny/fKj0fayP94fIy19WzKzAdld/f4TkvXJ7OuNuEkSquJT1QXtZt/C/PntvK2jUyuGOwYH4GYEianaJhSmvJHN00+nTwW1RwrMGKgFs6M18rBiDoRI1UqwLHuqmUMMwDMdFC31PX4zU9WrRJQkaC+U5WXXpcSFjMS7WzNfTQaADyA0EpON9y1ZJ7P8A4JAYmiCl81NiSBvYjRvcRaaMVxBnRVVrkjtAAi3LKNToRqbW+Gk1YZalmqUzbILsQbEA/PY6Su45VxL2yMA2RmcrlUlVtzA31mihb34MryNSb8SdbdAAfMbyPifq/d/iaRfQ6i+IaspZmZaeZLknUMNNeouPfJWJ+r93+JprFqnozctQjfwtiHNjY2Fj07aSU9fNoHJtrYgW7IPj5ytw9YobgA6c79QeXiBLNK2IqLcIWU6HoevORaaey0ta0bVw7C5uTa+6oB8c8h4hiFOZV2FrNfmOjT04SoN6I+J/qmt8PUsR6sC/j7+bQv3YaWuiLJMSBTQWHcHXoPGQq2Jv9UfFv5zAl7AFF0AHe6C3tTCzewn4v/tChIl0zXiKgzd0d1ebewvjNWcewPi38564ZybL00AJtYAD5Tz1D+y3wM0WkjJ7bPHe9tALCwtfqTzPiZhM3psBcqQPEGYSyIYiIgCIiAIiIAiJY8LRTTrkqCVp3UkXsb7jpIuuK2TM8norolz6P4gvWSky0mWxH6Jc3ZUkXbmbgStrYxnADCmBe/ZphT7yNxrM1bdcdFnCU8tmiIialBERAEREA9UX0myphnUXYWHmD8jNaNYg9DJNTE59CWHmQVv4gASHvZK1on8DPYf7w+RliAWvbYak8gOplbwpCquDocw6HkeYlrhVQg5rb82A006ss5sj6tnVj/SkaXQNcrfKO8W3Xlc25Hl8JFruOQsLdd/EyxqrSUXNvcwJ+AqXlViHTP2e7pvp57k/ORD2KWjY6AXViQ5tlB2H3/MWt05yPWGW6sO30v3PPqT05ee1k1Cj9n8a/wDyyFi/UAMADmtodSL/AHg5HzkzW38kVOlsh0qZILG4QWzHz2HiTyErPSDDAhXBIpBmBbQuCQLJbmxAPhYX0ANunGDQHtgWZVYXZVH1lO7Lfbx3lbx6hhVRWcAgE6K4Y62GirXufcDFZNleD0Y/2aOGxVZlUIppiyBi2XtLzbU9ffJXpTSC12AFgQGt4tcn87zD+z40ji6vqQQnqRoQwN8wv3mY9Ocs+LqDj1DAEZRcEAg9lzsZljrWRv8AY1qd4Uv3OXnU8Bb6EebEnprJ9bhqhQ3qksbfVTntfTxmQw7IVQU01vl2A6naXvMqWkRGFy9siVWB7pJPQ2ufLX8pBr1AuhAZudybDw0IuflLNqFRmZRTTMBfXLYgkgWPuMhf3Wq6sVpL2SVYXUNcWJFra7ysufP+S1J/CKvEEEZl22YeyenkeR8xynlHsC5Au9goIBsL6sL7cgD59Jrq4rKVZQVJXdWy/WYcvKaTibnMVub3uWJPvnSpbWjmdJMxC3zAblhb4mSK3CmVnAscgDE/ZYAg687EXHzmnDsdTzuDYeBO15MfHVDnuD2wFPd7oCgDbey7yadJ9CqUtdTVxDB+r0BvmVG8r5wR49385Ak3HV2cXfllVb2vYZzyAvq0hS2Peuvcitb6CIk9+GhQpevSTMoZQxa+Vtr2W0Vcz3ImHXYgRJGLwbU8ubKVYZldCGRh1UiR5Kaa2g009MREl4fBqabVWfIgbKLIXLMRmtYbC3ORVKVthS29IiSfw6uipWDMqlqeVASAWN72XqZXz2KXJaJl8XsseA11SujOyqozXLEAC6sBcnxIlaJ7EKfc6Dr2qRE2Mq5VIcFiTmSxuoGxJ53muSnsq1oRESQInl5LwGE9YWGbLkRn2vfJbTfTfeQ2ktslJt6RFmNR8qljyBPwF5lEEIrOCcdxLo7rReqMwvkKgDTu2ILNpbadBR4pmUFqTo3NGYXU7EHsyHhLUECGgFXVkdVOSxXKb2UkMwAJ5XN4dgTcDKDsvTwnnekdXkpV8HqetmJxy46N/wCia2NX2D+If0zA4pfZb8Q/pnvC8KtR8jEgZSbi19CBz85YvwZB9Z7dSVA+OWdrcy9M4JVUtoqjWX2W/EP6YNZfZb8Q/pk2vhwq9hjoNe0tic1u1oLix56SrxDAB2HdQM+nsrroJZNMq9oveNuoWgSp7rcx18tZx/pHiEsl1fdtnUez9mdlxnDM1ClVFsqrY337TC1hINPhNN0X1qK53Gblfl8pjLnh/fJak2yN/ZXVVsRVyqw+i+swP1l6KJf8YNscv3P4Xkn0d4RToVUZKaqalJybcwrUct/xE++QeP1AuNDE2AXfXmrAbeJEwh8sj14Z00nOJb8lnUeoQBrawNsw5baXkWrVrEg63F8t3sehtc3kd+MKdmXS3J7aeFprPGPFL8z2xfx2l1D8FXcv5MqlSuCTdr5d89tBc97N56XmkHEC4BbtEkkPodNzZrfGajxFi1w6i4PtnZWPMbeExHEWvfOl+Vwxtfp2dJqpfhGba8sgYj6v3f4mmpkIF8p+H85uqrmIsQbDU62HaY63HiJvxGMzKVBFrfaJ92gE22+iRlpbezlsVXxeRnFFkRRmLFQOz17Wp06SdwnGGrSVyNTcG22hIvOhw2FR0AK3BBXL97Rxpr/oZT0KIRcoVVtfsqLKCSSQByFydJwekvJWSlT7Ho+uxYoxQ5Xc2RET0TyxLzirUgtDOKpP93W2QIRbXcuw13lHN1fFM4UNl7KhFygjsrte5Nz46TK4dUmi8WpTRbcLxS1K9CmEy00zBVYhmOZWYltLXJA0G1phw8itWCsqBEDMlNVtfKNAzbuTYXJ8esq8JinpurplzLtmBK6gjUAjkTzmNGsysGVsrg3DDkfI7jfSV+l3146fcusvbfnr9i14RiGr1BSqhWRlbQIiZCFLAqVAIta2pO8LjHGCJDDSsFHYTu+rvbu7/a38ZDbidQhgopIWFmamhViDuLliFB52AmgYhvV+q7OQvm2ObNly73ta3K0r9Nt9tLa6f7LfU0u/Xr1LniTig4ppWpIFVbq1FnLki5LMKbXBvsDpNAxWHWrVKnKrKPV1PVs4psbX7BW9r3ANtJDXib2UMtJ8oAVqiFnAGwuGAYDlcGY0+IVQzMWDF++HXMjdLqCLW5WItKrFXXf/AKS8s7WiZjM2Wm7+rrJmsatKwLgG5RlAADWBtoJIep631nqXpVVKkigyCnUpgc07IJK9bm8q34hUIUDKgRsyrTUqA3tHMWLG2mptaZtxSoSxC0kZgQzohDkN3rEsQpPMgSfp3pf3+/gLJG2TEoK1DDKbDNWZWYDWxYDf3xVxrrXNIKgpipk9VkQgqGy3LWzZiNb33MrWxTFEpmwRCWWwIYFt7tf4WAkj/i9W4YiiXH/mmn9JpoD3rFvHLJeOvlb7/wCyFc/D12LGlQWm2MAVWCKMocXAN9PO352kZapq4as1SzNTZMrBEVgHbKy9kAESBTxjqHAIPrBZywJY65rg3FiTzN5imJdUemMuR8ue4JbsG62N9PgZP067/O1/2Q8k9l20y0ao1M00Z6VHsqTTFM1We571QhDYsOVxaSadFVxOKRRYCjUsBsLhDp8ZUtxSobXFJmUALUamTUAHdN81iR1Kzw8TqZ3qdjO6lX7Jy5WAByjNobKNbmU+nfX7fyWeSen3/wAEQTluIcfcuyL2UVipI7zFTY68he/850zvlUt0BPwF5809YbKTuxufM3J/MyfU25SS+SfSwqbbXY+ycHxIqYKgWY3Fb1D2J1Vw9NL+QqUz/wBM5Hh2Pf1poVNwDY87qbMD8D8Jv9F8aRg3vtTxVBmvyGY6/qAe6R+I07cXrL0dm027a5/45x4Kc5NJ+D0PUY1WFU15Oo4M9nY/YP7SyyfEfHw1I+Oi+coMBjqYrCmXXMyns5gDZbMffYbdL9JMxGMDaZWy9M4t7+zO6mqvSPNUuce306/ljENfPf2RuQfrpzErcV+hrf5T/KSmrCxAUi4tqwPMHoOkzweA9fnpBsudCua17ZtL2uLzSuksx70tF/xfFrS4crspYLkuoNr3dRuZz/BPShK9dKXqmGcnXMD3VZzy55be+W3pkmXhbLvYoL+VVROB9C/+doeb/wDbeck/pf5NqeqS+x9lpV82Ipm1rUqg/Ww85r0oqUlxV6lWmvZF0dgDbWxsZ0OC/Tp/l1P2sPPn39oIH99e4U/R0+9bq+1xMsT4308HRme8e35LnBGhUJ9X6t8vaYIVay33NthLTinCKbqnq/V0idTfQkEaDSct6DgCriLBR/hx3LW7x6AaztqighNPqL8nmtVXLuYTKc9TjsRhjTqmmxBKhgSNv0bmRpaY3tcVSmdVYsWHUeqK7++QMZTCu6jZXYDyBIE64ret+EYVOt68s9wwZuwNjqdvD+Q+EsfRzhS13bNfKgBIGhJN7C/IaGaeF4XN2w1rGxFvLn750no7SFNqgXZypVSb279xfnqRr4zny5XLqU/Gv5OvFhVTLa87/gsaOCpipkVQFVAbDS5Zjv17u/jI/G+B06isyqFcDvLpf7w2PzknCuxxFXQaKoOp8T08ZIdrrUv5e62k45qlW0zscqp010PmETJ9z5mYz10eMxERJAiIgCIiAIiIAiIgCIiAIiIAiIgETit/UVcu/q3t+Ezga9ICnTce2ynyAQr82n0gi+h25zgsdg3SkylXslawbK2XKFdb5rWtonxE5PUz1T+52elruv3PoP8AZNgkrU8ZTqKGRvVhlOx/S/n4yl9OOG1W4nXWj2QQmZr2CqaaC3XXKdB0nPcK45iMMSaFYopILqLZXy7BjuNzsRvLzgfEKterWq1WLswXW2gAzZVHgAba69Zy4ZVWkzrzW5xvRJ4TwVKGo7b83bfyX2RLcoune2v3efx28ZrAksKbDv8AdHlz/V/1nqTKlaR5F06e2yMV28v5y19Gh9MPd8xK8pt5fzkzC8PLlMlZ6RJ1ZMoPMcwZTK/YyY/Uif6b/wDhlT7y/wDeE+e+hn/O0fN/+28+jcToCrhzQdiFK3LXAYlXJBvtuLzi/RHh6itSqZ0vmcA+sOY2RxfIEOlrnvfynLK4y9mrrlkWvjR9OwP6en/l1P2sPPn/APaCwGNftIPo6fe56vtqJ3WAf6VD/wC3U/aw84f07b/GP2lH0dPcE3sX21FpljXvOnK//l+TL0HYGriLFT/hx3Nu8d9TrO3fur9xfk84f0Mf6Sucyt9ABdQQO8dNzrOzd9F+4nyeXpdTKH7Shy34ux9inm+JQSHxhbV6o+2fzN5ZYdb8QxTdKaL+K5/hkXi9LNiHA+sQfigM6Mf6l9jG37X9zHgtSzMvUX94/wD38pdU8TkZW6Ha9r+HylBTwbh7BgCBcEX2Okg8V4jWpo7LUZXTunQ2OYW0YEGZ58Dtupejo9L6qZ1NLZ9OwrqAW9Wysxu2hJ8LkfKR8bjaaK5L6tyOlrabGfGq3prj7DLiGUqtiQFOc+0wYEA/dAGu0k+j3Fq+JV3r1C7BrC4UW0zHugbk/lMcfp65JUdWXMpltIt4iJ6R5IiIgCIiAIiIAiIgCIiAIiIAiIgCIiAJo4+4bBVVtqqEjrp2jb4TfI+PTNSqKedNh8VMyzY1a6/BtgyvG3r56Hzlu57h+6dP6F1L5x1Cn4ZgfnKHBYbOjj2aTOPNADLX0Ff6Rx9g/kyfznDh2rTO3O04a8Haqkk+r27Ld3r567bTFUkgJt2eXX8/9J6ezx6ZpKbeX85YcPNmTz/fIpX5SP8A8PR3uzOLkXyuy8raW2mV9UaYt72dQcDSr4YpW7hJuQ2XKAxIN/PrppOE9GcGgqo/rKVwzhe03rCArgH1YuACBfUbHrOlr00eiUqHsW5m2zXFz7hOd4BhqYdHzpmzMALMXtlcX71gLfZmKhpN7N3appJdjtcI/wBIn+W/7VCcf6YtfFOb2+jTkTsXnS4ap21+4/zpTmvSc3xDG57ibC+xbfQyJn3F8lewy9Fm7dbW/wBCBsR9c9Z1Lvov3F+TzlfR82epqT9HbUW+sfAS/apoPur8mlqnqUl+0xwf/M4purIvwQH+KasX+mDaahdxcdy23umzDmz1T7VS/wAEQfumLgmopW97aW30zS8rr+Clfp/JqVTnbtLquhyrpqdh1nM+lJtTYE3u4BI563/dOsWm2dhd9V13vufDbecb6cXWnbU9vc791t5fa0yuLraT3+TjcI18x8b/ABnUeh62p1D1qn8lWc9hcNair82dl8goW35lvynUeiy/4cHq7n9Yj9wkT3R2Zn7H9y4iImpxCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAkfiX6Grbf1b/sNJAmT08ysvUEfEWkV2YT00fOaDZaVUjnTC/jemD+WadJ6BYXsvU8lH7TfwTmUB/uz33zU1/bJ/Yn0T0YwuTDUxzYZz/1aj9W3wnDgndr9ju9TXHG15ZaKk2qPAfnPVWbFWduzymzWy6e6R6NQZhrzm7HGyjx0PlaViYZL90fnI1s1x9tnUYFMO1BhXyEXObObWF9CNd79NbzleFU6QdTn1zNZfVkvazWJcsBtb4y1oNSyEVLWtsfPSVuAWmMpLnNc9kICba27R8PGZKOLb2zZ3y0tdi2o1O2Put80/lKXjZvVY691dvfJ6VO0D4H5pIGP1cnXYfvl1PUVXt0e8J0Z9/0fPzlsX0H3R++VGC0Lfd/fJpqfIfvhyVl9CYH1PiSZizcxI5qTfhze8lLRFv2mBvrqdd/HzlJ6TYbPQbTukN7hofyJnQMsj16QZSp2YEHyIsZb4M4rjSZ8vwR+idD9WoD+JXB/YE6j0XH0Hh6x7fGc7Rp5fXqdxkPvVyh+ZnU+jVO2GQ+1mb8TMZSe53Zn7PyWMQYmpyHmYdYzDrI8S/Ez5EjMOsZh1keI4jkSMw6xmHWR4jiORIzDrGYdZHiOI5EjMOsZh1keI4jkSMw6xmHWR4jiORIzDrGYdZHiOI5EjMOsXHUSPEcRyJKsOom9HXqPiJXwJHEcjiK2HrnPTXD1LNWzqcrAWX1lhci2ucG9+U+gcG4urhVNKrSYLqHUqgtpYMdDMFMxczCMHF7TNcnqPqLTReLXT21/EJtXEJ7afiE5qJtwObRecRrKQuVlOvIg8vCQA0i095JVtRHHRpNaWj2pfLqCJopAXFjJOKbsGQsL3xCXQs60yaA3sn4Hwmmvvrp5ywWp/v4StxRuxkLqKrSPaR315TfZjyPwkShufKWVJ+zDWiJrZHLyTgKyjNmIG25A6zQqF3CjdjYX6nYTdX4NU17nZ1btbC+502tdvJSZDcro2TqqXREpq6e2v4hIHEeJLTAKo9Um9hTynUdSWFr9ddp5U4PVVlU5QWzEG+llGYkm2gtNi8IewN1JuQQCSAOxY353zjbl8JVufhkTjpPqtnEr/fHFRhg8OpLXAYIHIzZiDdhn89NbzqcB2aNMEKhyrdVsFVrXZQLnQG8n/wDCnINipIYqw7WmXICb21sXsfLS/KMeHNdgcoysym5O6AlyLA6AC/yvKY5mXvls6MuW7STnRrZh1E8zDrN1fhTorMxTs6kAkmwbL0tv4yDN1xrsznbc90IiJoZiIiAIiIAiIgCIiAIiIAiIgCIiAIERANgM8aeRKkGMREsSeqZtV/CIlWDOs3ZkejowiIXYs+5NV/8AfwkasdZ7EhCjWm8mI2kRDCNJfW81vUb2jqLHU66W+RI989iNEGIrN7bfEzNKz+03h2jz3iJOkTtmZrP7TcvrHltzms1nv3m/EeRJB36kn3xEaRCbMDUb2j8TMYiSD//Z"></CreateJob></div>
          <div><CreateJob imgpath="https://img1.baidu.com/it/u=2978943956,1947196634&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1697216400&t=754f7f1d208468886f4aaba9fbd6d11b"></CreateJob></div>
          <div><CreateJob imgpath="https://img0.baidu.com/it/u=2105544423,3215514087&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1697216400&t=2eabbb5fde27c2b34c22d99f31294ac5"></CreateJob></div>

        </Stack>
      </div>


    </div>



  );
}

export default InitialDash;
