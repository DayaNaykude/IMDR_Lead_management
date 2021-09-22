import { Grid,Typography,Paper,Button} from "@mui/material";
import { fontSize } from "@mui/system";
import React from "react";
import { useHistory } from "react-router";
import   './home.css';


//import { Redirect } from "react-router-dom";

const Home=()=>{


const paperStyle = {
    width: 380,
     marginLeft: "500px",
     marginTop:"50px",
     height:400,
};
const btnStyle = { marginLeft: "" };
return(
    
    <div class="imageStyle" style={{
        
        backgroundImage:'url("images/IMDRPicture.png")'}}>
        <Grid>
        <Paper elevation={10} style={paperStyle}>
                <Typography>Hello</Typography>
                
                </Paper>
        
       </Grid>


    </div>
  );
};
export default Home;