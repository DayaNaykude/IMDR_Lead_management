import React,{ useState } from "react";
import Button from "@material-ui/core/Button";
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import Grid from "@material-ui/core/Grid";
import   './home.css';
import Box from '@material-ui/core/Box';
import { useHistory} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Modal from '@material-ui/core/Modal';
import AboutScreen from '../pages/HomePageFolder/AboutScreen';
//C:\Users\HP\Desktop\imdr\frontend\src\pages\HomePageFolder\UserScreen.js

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height:720,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const about = { 
  backgroundColor:"#11a6da",
  color: 'white',
  fontSize:"20px",
  padding: "10px 20px 20px 20px",
  marginLeft:"400px", 
  marginTop:"20px",
  
};
const btnStyle = { 
backgroundColor:"#11a6da",
color: 'white',
width:"200px",
fontSize:"20px",
padding: "10px 20px 20px 20px",
marginLeft:"450px", 
marginTop:"25px",
};
const backStyle={
  padding:"0px",
  margin:"0px",
  backgroundColor:"#4ab5da",

}


//import { Redirect } from "react-router-dom";

const Home=()=>{

  let history=useHistory();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return(

  
  <div  className="imageStyle" style={{backgroundImage:'url("images/IMDRPicture.png")'}}>
  <Grid>
 
   
    <Button    type="submit"
                  style={btnStyle}
                  variant="contained"
                  fontSize="large"
                  startIcon={<PeopleIcon fontSize="large" />}
                  onClick={() => {
                   history.push("/userscreen");
                  
                  }}>
      USERS
      </Button> 

      <Button style={about}  startIcon={<PersonIcon fontSize="large" />} 
      onClick={handleOpen}>ABOUT ME </Button>
      <Modal
        open={open}
        onClose={handleClose}
      
      >
        <Box sx={style}>
          <AboutScreen/>
          
        </Box>
      </Modal>
      </Grid>    
     
      </div>
  );
};
export default Home;