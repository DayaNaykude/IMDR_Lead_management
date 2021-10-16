import React from 'react';
import { Grid, Paper,Button } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const listStyle = { margin: "8px 20px", width: 250 };

const TaskScreenAdmin = () => {
 const [entrance, setEntrance] = React.useState('');
  const handleChangeExam = (event) => {
    setEntrance(event.target.value);
  };
  const [source, setSource] = React.useState('');
  const handleChangeSource = (event) => {
    setSource(event.target.value);
  };
    const paperStyle = {
        padding: 20,
    	height: "90%",
        width: "80%",
        margin: "50px 50px 50px 50px",
    };
	const inputStyle = {
		marginLeft:"30px",
		marginTop:"40px"
	};
	
	

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
	<FormControl style={{ margin: "40px", width: 250 }}>
              <InputLabel>Source</InputLabel>
              <Select
                labelId=""
                id=""
                value={source}
                label="Source"
                onChange={handleChangeSource}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={'Social Media'}>Social Media</MenuItem>
                <MenuItem value={'Walk in'}>Walk In</MenuItem>
                <MenuItem value={'Coaching Class'}>Coaching Class</MenuItem>
                <MenuItem value={'Outdoor'}>Outdoor</MenuItem>
                <MenuItem value={'Digital Fair'}>Digital Fair</MenuItem>
                <MenuItem value={'Paraphernalia'}>Paraphernalia</MenuItem>
              </Select>
            </FormControl>

			<FormControl style={listStyle}>
                <InputLabel>Entrance Exam</InputLabel>
                <Select
                  labelId=""
                  id=""
                  required
                  value={entrance}
                  label="Entrance Exam"
                  onChange={handleChangeExam}
                >
                  <MenuItem value="">
                    <em>OTHER</em>
                  </MenuItem>
                  <MenuItem value={"cat"}>CAT</MenuItem>
                  <MenuItem value={"mat"}>MAT</MenuItem>
                  <MenuItem value={"cmat"}>C-MAT</MenuItem>
                  <MenuItem value={"xat"}>XAT</MenuItem>
                  <MenuItem value={"mhcet"}>MH-CET</MenuItem>
                  <MenuItem value={"xat"}>XAT</MenuItem>
                  <MenuItem value={"ATMA"}>ATMA</MenuItem>
                </Select>
              </FormControl>

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
