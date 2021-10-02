import React from "react";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const paperStyle = {
  padding: 20,
  maxHeight: "90%",
  width: "45%",
  margin: "10px auto",

  backgroundColor: "",
};
const avatarstyle = { backgroundColor: "#26d6ca" };
const headerStyle = { margin: 0 };
const textstyle = { margin: "8px 0", textSize: "20px" };
const Style = {
  margin: "8px 0",
  marginLeft: "15%",
  textSize: "20px",
  minWidth: 250,
};
const listStyle = { margin: "8px 20px", width: 250 };

const editStyle = {
  backgroundColor: "#26d6ca",
  color: "white",
  fontSize: "20px",
  padding: "10px 10px 10px 10px",
  marginLeft: "5%",
  marginTop: "0%",
  width: "15%",
};

const saveStyle = {
  backgroundColor: "#26d6ca",
  color: "white",
  width: "15%",
  fontSize: "20px",
  padding: "10px 10px 10px 10px",
  marginLeft: "60%",
  marginRight: "0%",
  marginTop: "0%",
};

const AddContact = () => {
  const [category, setCategory] = React.useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const [entrance, setEntrance] = React.useState("");
  const handleChangeExam = (event) => {
    setEntrance(event.target.value);
  };
  const [source, setSource] = React.useState("");
  const handleChangeSource = (event) => {
    setSource(event.target.value);
  };

  let history = useHistory();

  return (
    <>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <IconButton
            aria-label="Back to home page"
            color="primary"
            variant="contained"
            onClick={() => {
              history.push("/");
            }}
          >
            <KeyboardBackspaceSharpIcon />
          </IconButton>

          <Grid align="center">
            <Avatar style={avatarstyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h1 style={headerStyle}>Add New Lead</h1>
          </Grid>

          <form>
            <TextField
              label="Name"
              style={textstyle}
              required
              variant="outlined"
              placeholder="Enter Student Name"
              fullWidth
            />
            <TextField
              id="date"
              variant="outlined"
              label="Birthday date"
              type="date"
              style={textstyle}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl
              style={{ margin: "0px 30px auto" }}
              component="fieldset"
            >
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              label="Email"
              variant="outlined"
              placeholder="Enter Email"
              type="email"
              style={textstyle}
              fullWidth
              required
            />

            <FormControl style={Style}>
              <InputLabel>Category</InputLabel>
              <Select
                labelId=""
                id=""
                value={category}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Other</em>
                </MenuItem>
                <MenuItem value={"obc"}>OBC</MenuItem>
                <MenuItem value={"general"}>General</MenuItem>
                <MenuItem value={"sc"}>SC</MenuItem>
                <MenuItem value={"st"}>ST</MenuItem>
                <MenuItem value={"nt"}>NT</MenuItem>
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

            <TextField
              label="Mobile Number"
              variant="outlined"
              style={Style}
              type="number"
              placeholder="Enter number"
            />

            <TextField
              style={listStyle}
              label="Course"
              variant="outlined"
              placeholder="Enter Course"
            />

            <TextField
              label="Percentile"
              type="number"
              variant="outlined"
              placeholder="Enter Percentile"
              style={Style}
              required
            />
            <TextField
              label="College Name"
              style={listStyle}
              variant="outlined"
              placeholder="Enter College Name"
            />
            <TextField
              label="City"
              variant="outlined"
              required
              placeholder="Enter City"
              style={Style}
            />
            <TextField
              label="Pin Code"
              style={listStyle}
              variant="outlined"
              type="number"
              placeholder="Enter pin code"
            />
            <FormControl style={{ margin: "8px 230px", width: 250 }}>
              <InputLabel>Source</InputLabel>
              <Select
                labelId=""
                id=""
                value={source}
                label="Source"
                onChange={handleChangeSource}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={"Social Media"}>Social Media</MenuItem>
                <MenuItem value={"Walk in"}>Walk In</MenuItem>
                <MenuItem value={"Coaching Class"}>Coaching Class</MenuItem>
                <MenuItem value={"Outdoor"}>Outdoor</MenuItem>
                <MenuItem value={"Digital Fair"}>Digital Fair</MenuItem>
                <MenuItem value={"Paraphernalia"}>Paraphernalia</MenuItem>
              </Select>
            </FormControl>

            <Grid style={{ marginTop: 30 }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={editStyle}
              >
                clear
              </Button>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={saveStyle}
              >
                SUBMIT
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default AddContact;
