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
import { createLead } from "../../helper/leadApiCalls";
import { isAuthenticated } from "../../helper/index";
import { useState } from "react";

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
  let history = useHistory();
  const { _id, token } = isAuthenticated();

  const [values, setValues] = useState({
    applicantName: "",
    dateOfBirth: "",
    email: "",
    gender: "",
    mobile: "",
    city: "",
    source: "",
    entrance: "",
    college_name: "",
    category: "",
    course: "",
    percentileGK: "",
    pincode: "",
    error: "",
    success: false,
  });

  const {
    applicantName,
    dateOfBirth,
    email,
    gender,
    mobile,
    city,
    source,
    entrance,
    college_name,
    category,
    course,
    percentileGK,
    pincode,
    error,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onClear = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      applicantName: "",
      dateOfBirth: "",
      email: "",
      gender: "",
      mobile: "",
      city: "",
      source: "",
      entrance: "",
      college_name: "",
      category: "",
      course: "",
      percentileGK: "",
      pincode: "",
      error: "",
      success: false,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createLead(_id, token, {
      applicantName,
      dateOfBirth,
      email,
      gender,
      mobile,
      city,
      source,
      entrance,
      college_name,
      category,
      course,
      percentileGK,
      pincode,
    })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            applicantName: "",
            dateOfBirth: "",
            email: "",
            gender: "",
            mobile: "",
            city: "",
            source: "",
            entrance: "",
            college_name: "",
            category: "",
            course: "",
            percentileGK: "",
            pincode: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in lead creation!"));
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

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success mt-4"
            style={{ display: success ? "" : "none" }}
          >
            New lead is saved Successfully.
          </div>
        </div>
      </div>
    );
  };

  const addContactForm = () => {
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
                value={applicantName}
                onChange={handleChange("applicantName")}
                fullWidth
              />
              <TextField
                id="date"
                variant="outlined"
                label="Birthday date"
                type="date"
                value={dateOfBirth}
                onChange={handleChange("dateOfBirth")}
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
                  value={gender}
                  onChange={handleChange("gender")}
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
                value={email}
                onChange={handleChange("email")}
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
                  onChange={handleChange("category")}
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
                  onChange={handleChange("entrance")}
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
                value={mobile}
                onChange={handleChange("mobile")}
                placeholder="Enter number"
              />

              <TextField
                style={listStyle}
                label="Course"
                variant="outlined"
                value={course}
                onChange={handleChange("course")}
                placeholder="Enter Course"
              />

              <TextField
                label="Percentile"
                type="number"
                variant="outlined"
                placeholder="Enter Percentile"
                value={percentileGK}
                onChange={handleChange("percentileGK")}
                style={Style}
                required
              />
              <TextField
                label="College Name"
                style={listStyle}
                variant="outlined"
                placeholder="Enter College Name"
                value={college_name}
                onChange={handleChange("college_name")}
              />
              <TextField
                label="City"
                variant="outlined"
                required
                placeholder="Enter City"
                value={city}
                onChange={handleChange("city")}
                style={Style}
              />
              <TextField
                label="Pin Code"
                style={listStyle}
                variant="outlined"
                type="number"
                value={pincode}
                onChange={handleChange("pincode")}
                placeholder="Enter pin code"
              />
              <FormControl style={{ margin: "8px 230px", width: 250 }}>
                <InputLabel>Source</InputLabel>
                <Select
                  labelId=""
                  id=""
                  value={source}
                  label="Source"
                  onChange={handleChange("source")}
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
                  onClick={onClear}
                >
                  clear
                </Button>

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={saveStyle}
                  onClick={onSubmit}
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

  return (
    <>
      {successMessage()},{errorMessage()},{addContactForm()}
    </>
  );
};

export default AddContact;
