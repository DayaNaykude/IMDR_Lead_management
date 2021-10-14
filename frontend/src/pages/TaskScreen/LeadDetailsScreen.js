import React, { useEffect } from "react";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import EmailIcon from "@mui/icons-material/Email";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { isAuthenticated } from "../../helper/index";
import { getLead } from "../../helper/leadApiCalls";
<<<<<<< HEAD
import moment from "moment/moment.js";
import { updateLead } from "../../helper/leadApiCalls";
=======
// import moment from "moment/moment.js";
>>>>>>> 3f511b87423ec6cf44e9eaa2b1946be00fd4dd06

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
  minWidth: 250,
};
const listStyle = { margin: "8px 20px", width: 250 };
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
  const [percentileGK, setPercentileGK] = React.useState("");
  const [college_name, setCollege_name] = React.useState("");
  const [city, setCity] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);

  let history = useHistory();

  const { _id, token } = isAuthenticated();

  const emailId = history.location.state.email;
  const preload = () => {
    console.log(history.location.state.email);
    getLead(_id, token, { emailId })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          //console.log(data);
          //console.log(data.reviews[0])
          setApplicantName(data.applicantName);
          setDateOfBirth(data.dateOfBirth);
          setGender(data.gender.toLowerCase());
          setCategory(data.category.toLowerCase());
          setEmail(data.email);
          setMobile(data.mobile);
          setCourse(data.course);
          setPercentileGK(data.percentileGK);
          setCollege_name(data.college_name);
          setCity(data.city);
          setPincode(data.pincode);
          setEntrance(data.entrance.toLowerCase());
          setSource(data.source);
        }
        //console.log(data.course);
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setDisabled(true);
    // console.log(course);
    updateLead(_id, token, {
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

  useEffect(() => {
    preload();
  }, []);
  //

  return (
    <>
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
            <FormControl style={{ margin: "8px 230px", width: 250 }}>
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
                <MenuItem value={"Social Media"}>Social Media</MenuItem>
                <MenuItem value={"walk in"}>Walk In</MenuItem>
                <MenuItem value={"Coaching Class"}>Coaching Class</MenuItem>
                <MenuItem value={"Outdoor"}>Outdoor</MenuItem>
                <MenuItem value={"Digital Fair"}>Digital Fair</MenuItem>
                <MenuItem value={"Paraphernalia"}>Paraphernalia</MenuItem>
              </Select>
            </FormControl>
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
