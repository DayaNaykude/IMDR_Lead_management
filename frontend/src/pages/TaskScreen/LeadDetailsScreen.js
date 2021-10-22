import React, { useEffect } from "react";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";
import { Grid, Paper, Avatar, TextField, Button, Typography } from "@material-ui/core";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import EmailIcon from "@mui/icons-material/Email";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { getLead } from "../../helper/leadApiCalls";
import { useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Checkbox from '@mui/material/Checkbox';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@material-ui/core/Box';

import { updateLead } from "../../helper/leadApiCalls";

const paperStyle = {
  padding: 20,
  maxHeight: "90%",
  width: "45%",
  margin: "10px auto",

  backgroundColor: "",
};
const avatarstyle = { backgroundColor: "#30af53", marginTop: "30px" };
const headerStyle = { marginTop: "2px" };
const textstyle = { margin: "8px 0", textSize: "20px" };
const Style = {
  margin: "8px 0",
  marginLeft: "15%",
  textSize: "20px",
  width: "35%",
};
const listStyle = { margin: "8px 20px", width:"35%"};

const mailbtnStyle = {
  backgroundColor: "#30af53",
  color: "white",
  fontSize: "20px",
  padding: "5px 5px 5px 5px",
  marginLeft: "30px",
  marginTop: "10%",
  width: "15%",
};
const smsbtnStyle = {
  backgroundColor: "#30af53",
  color: "white",
  fontSize: "20px",
  padding: "5px 5px 5px 5px",
  marginLeft: "60%",
  marginTop: "10%",
  width: "15%",
};

const editStyle = {
  backgroundColor: "#26d6ca",
  color: "white",
  fontSize: "20px",
  padding: "5px 5px 5px 5px",
  marginLeft: "65%",
  marginTop: "0%",
  width: "12%",
};

const saveStyle = {
  backgroundColor: "#26d6ca",
  color: "white",
  fontSize: "20px",
  padding: "5px 5px 5px 5px",
  marginLeft: "2%",
  marginTop: "0%",
  width: "12%",
};
const statusStyle ={
  marginLeft:"0%",
  marginTop:"5%",
  
};
const textAreaStyle ={
marginLeft:"1.5%",
marginTop:"0%",
width:"80%",
 height:"100px",
};

const LeadDetails = () => {
  const [applicantName, setApplicantName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [course, setCourse] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [entrance, setEntrance] = React.useState("");
  const [source, setSource] = React.useState("");
  const [status,setStatus] = React.useState("");
  const [percentileGK, setPercentileGK] = React.useState("");
  const [college_name, setCollege_name] = React.useState("");
  const [city, setCity] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [showdate, setShowdate] = React.useState(true);
  const [updatedate, setUpdatedate] = React.useState(false);

  let history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //const { _id, token } = isAuthenticated();

  const emailId = history.location.state.email;

  // backend call
  const preload = () => {
    console.log(history.location.state.email);

    getLead(userInfo._id, userInfo.token, { emailId })
      .then((data) => {
        if (data.error) {
          setError(true);
          setSuccess(false);
          console.log(data.error);
        } else {
          console.log(data);
          //console.log(data.reviews[0].comment);
          setApplicantName(data.applicantName);
          setDateOfBirth(data.dateOfBirth);
          setGender(data.gender ? data.gender.toLowerCase() : "");
          setCategory(data.category ? data.category.toLowerCase() : "");
          setEmail(data.email);
          setMobile(data.mobile);
          setCourse(data.course ? data.course : "NA");
          setPercentileGK(data.percentileGK);
          setCollege_name(data.college_name ? data.college_name : "NA");
          setCity(data.city);
          setPincode(data.pincode);
          setEntrance(data.entrance.toLowerCase());
          setSource(data.source.toLowerCase());
          setStatus(data.status.toLowerCase());
          setEntrance(data.entrance ? data.entrance.toLowerCase() : "NA");
          setSource(data.source ? data.source.toLowerCase() : "NA");
        }
        //console.log(data.course);
      })
      .catch((err) => console.log(err));
  };

  // backend call for update lead
  const submitHandler = async (event) => {
    event.preventDefault();
    setDisabled(true);
    setSuccess(true);
    history.go(0);

    // console.log(course);
    updateLead(userInfo._id, userInfo.token, {
      emailId,
      applicantName,
      dateOfBirth,
      gender,
      email,
      mobile,
      course,
      category,
      entrance,
      source,
      percentileGK,
      college_name,
      city,
      pincode,
      status,
    })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
        }
      })
      .catch();
  };
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success mt-4"
            style={{ display: success ? "" : "none" }}
          >
            Updation of lead Successfully.
          </div>
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    preload();
  }, []);
  //

  return (
    <>
      {successMessage()}
      {errorMessage()}
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid>
            <IconButton
              aria-label="Back to home page"
              color="primary"
              variant="contained"
              fontSize="large"
              onClick={() => {
                history.push("/");
              }}
            >
              <KeyboardBackspaceSharpIcon />
            </IconButton>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={editStyle}
              onClick={(e) => {
                setDisabled(false);
                setUpdatedate(true);
                setShowdate(false);
              }}
            >
              EDIT
            </Button>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={disabled}
              style={saveStyle}
              onClick={submitHandler}
            >
              SAVE
            </Button>
          </Grid>

          <Grid align="center">
            <Avatar style={avatarstyle}>
              <PreviewRoundedIcon />
            </Avatar>
            <h1 style={headerStyle}>Lead Details</h1>
          </Grid>

          <form>
            <TextField
              label="Name"
              style={textstyle}
              required
              variant="outlined"
              placeholder="Enter Student Name"
              fullWidth
              disabled={disabled}
              onChange={(e) => setApplicantName(e.target.value)}
              value={applicantName}
            />
            {updatedate && (
              <TextField
                id="date"
                variant="outlined"
                label="Birthday date"
                type="date"
                defaultValue="19-05-1990"
                style={textstyle}
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setDateOfBirth(e.target.value)}
                value={dateOfBirth}
              />
            )}
            {showdate && (
              <TextField
                label="Birthday date"
                style={textstyle}
                required
                variant="outlined"
                disabled={disabled}
                value={dateOfBirth}
              />
            )}
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
                  checked={gender === "female"}
                  disabled={disabled}
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  disabled={disabled}
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  disabled={disabled}
                  checked={gender === "other"}
                  onChange={(e) => setGender(e.target.value)}
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
              disabled={disabled}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <FormControl style={Style}>
              <InputLabel>Category</InputLabel>
              <Select
                labelId=""
                id=""
                label="Category"
                disabled={disabled}
                onChange={(e) => setCategory(e.target.value)}
                value={category}
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
                disabled={disabled}
                onChange={(e) => setEntrance(e.target.value)}
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
                <MenuItem value={"atma"}>ATMA</MenuItem>
                <MenuItem value={"na"}>NA</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Mobile Number"
              variant="outlined"
              style={Style}
              type="number"
              placeholder="Enter number"
              disabled={disabled}
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
            />

            <TextField
              style={listStyle}
              label="Course"
              variant="outlined"
              disabled={disabled}
              placeholder="Enter Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />

            <TextField
              label="Percentile"
              type="number"
              variant="outlined"
              placeholder="Enter Percentile"
              style={Style}
              required
              disabled={disabled}
              onChange={(e) => setPercentileGK(e.target.value)}
              value={percentileGK}
            />
            <TextField
              label="College Name"
              style={listStyle}
              variant="outlined"
              disabled={disabled}
              placeholder="Enter College Name"
              onChange={(e) => setCollege_name(e.target.value)}
              value={college_name}
            />
            <TextField
              label="City"
              variant="outlined"
              required
              placeholder="Enter City"
              disabled={disabled}
              style={Style}
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
            <TextField
              label="Pin Code"
              style={listStyle}
              variant="outlined"
              type="number"
              placeholder="Enter pin code"
              disabled={disabled}
              onChange={(e) => setPincode(e.target.value)}
              value={pincode}
            />
            <FormControl style={{ margin: "8px 230px", width: "35%" }}>
              <InputLabel>Source</InputLabel>
              <Select
                labelId=""
                id=""
                value={source}
                label="Source"
                disabled={disabled}
                onChange={(e) => setSource(e.target.value)}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={"social media"}>Social Media</MenuItem>
                <MenuItem value={"walk in"}>Walk In</MenuItem>
                <MenuItem value={"coaching class"}>Coaching Class</MenuItem>
                <MenuItem value={"outdoor"}>Outdoor</MenuItem>
                <MenuItem value={"digital fair"}>Digital Fair</MenuItem>
                <MenuItem value={"paraphernalia"}>Paraphernalia</MenuItem>
                <MenuItem value={"na"}>NA</MenuItem>
              </Select>
            </FormControl>
            
            <AppBar position="static" color="primary" style={{marginTop:20}}>
            <Toolbar>
              <Typography variant="body1" color="inherit" style={{marginLeft:"250px"}}>
                Lead Status
              </Typography>
            </Toolbar>
            </AppBar>
            <Typography style={{margin:"8px",color:"red"}}>Select Status</Typography>
            
            <FormControl style={{ margin: "8px", width: "50%" }}>
              <InputLabel>Status</InputLabel>
              <Select
                labelId=""
                id=""
                value={status}
                label="Status"
                disabled={disabled}
                onChange={(e) => setStatus(e.target.value)}
              >
                <em>Select status</em>
                <MenuItem value=""></MenuItem>
                <MenuItem value={"Level 1"}>Level 1</MenuItem>
                <MenuItem value={"Level 2"}>Level 2</MenuItem>
                <MenuItem value={"Level 3"}>Level 3</MenuItem>
                <MenuItem value={"Level 4"}>Level 4</MenuItem>
                </Select>
            </FormControl>
            
            <Typography style={{margin:"8px",color:"red"}}>Comment</Typography>
            <TextareaAutosize
           
            defaultValue="Write comment here"
            style={textAreaStyle}
          />
            
            <Grid>
              <Button
                style={mailbtnStyle}
                type="submit"
                color="#30af53"
                fontSize="large"
                startIcon={<EmailIcon fontSize="large" />}
                onClick={() => {}}
              >
                MAIL
              </Button>
              <Button
                style={smsbtnStyle}
                type="submit"
                color="#30af53"
                fontSize="large"
                startIcon={<TextsmsIcon fontSize="large" />}
                onClick={() => {}}
              >
                SMS
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default LeadDetails;
