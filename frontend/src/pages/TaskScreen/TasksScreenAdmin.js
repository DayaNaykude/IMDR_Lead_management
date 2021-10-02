import React from 'react';
import { Grid, Paper,Button } from "@material-ui/core";

const TaskScreenAdmin = () => {
    const paperStyle = {
        padding: 20,
        maxHeight: "90%",
        width: "80%",
        margin: "50px 50px 50px 50px",
    };
	const inputStyle = {
		marginLeft:"30px",
		marginTop:"40px"
	}

return (
	<div style={{
	display: 'flex',
	margin: 'auto',
	width: 400,
	flexWrap: 'wrap',
	}}>
    <Grid align="center">
    <Paper elevation={20} style={paperStyle}>        
	<div style={{ width: '100%', float: 'left' }}>
		<h3> Use the form below to upload a list of  Click </h3> 
		<a href="/template">here</a> for an example template.
	</div>
    
	<input style={inputStyle}
		type="file"
		accept="*.csv"
		id="contained-button-file"
	/>
	  <label htmlFor="contained-button-file">
		<Button style={{marginTop:"40px"}}
		type="submit"
		 variant="contained" 
		 color="primary"
		  >
	        Upload
		</Button>
        </label>

    
    </Paper>
    </Grid>
	</div>
);
}

export default TaskScreenAdmin;
