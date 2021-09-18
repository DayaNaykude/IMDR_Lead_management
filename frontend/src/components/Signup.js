import React from 'react';
import { Grid, Paper , Avatar, Typography ,TextField, Button, Link} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom';


const SignUp=({handleChange})=>{
const paperStyle={padding :'20px', height :"75vh", width : 340, margin:'0px auto'}
const avatarstyle={backgroundColor:"#26d6ca"}
const headerStyle={margin:0}
const textstyle={margin:'5px 0'}
const btnstyle={margin:'5px 0'}
const linkStyle={margin:'8px 0'}
let history = useHistory();

    return(
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                        <Avatar style={avatarstyle}><AddCircleOutlineOutlinedIcon/></Avatar>
                        <h2 style={headerStyle}>Sign Up</h2>  
                        <Typography variant='caption'>Please fill this form to create an account!</Typography>                    
                </Grid>
            <form>
                <TextField label="First Name" style={textstyle} placeholder="Enter First Name"fullWidth />
                <TextField label="Last Name" style={textstyle} placeholder="Enter Last Name" fullWidth/>
                <TextField label="Email" placeholder="Enter Email" type="email" style={textstyle} fullWidth required/>
                <TextField label="Password" placeholder="Enter Password" type="password" style={textstyle} fullWidth required/>
                <TextField label="Confirm Password" placeholder="Confirm Password" type="password" style={textstyle} fullWidth required/>
                
                <Button type="submit" color="primary" variant="contained" style={btnstyle} fullWidth
                 onClick={()=>{
                    history.push("/Home");
                }}
            >
               Sign Up</Button>

                        <Typography style={linkStyle}>Already have an account
                            <Link href="#" onClick={()=>handleChange("event",0)}>
                                Sign In
                                
                            </Link>
                        </Typography>
            </form>
            </Paper>
        </Grid>
    )
}

export default SignUp;