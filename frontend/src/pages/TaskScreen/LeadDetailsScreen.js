import React from "react";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
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
import { getLead } from "../../helper/leadApiCalls";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@material-ui/core/Box";

import { updateLead, updateStatus } from "../../helper/leadApiCalls";
import Modal from "@mui/material/Modal";

// backend Imports
import { sendBulkEmails } from "../../actions/userActions";
import { readMailContent } from "../../actions/mailActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";

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
const listStyle = { margin: "8px 20px", width: "35%" };

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
  fontSize: "15px",
  padding: "5px 5px 5px 5px",
  marginLeft: "65%",
  marginTop: "0%",
  width: "12%",
};

const submitStyle = {
  backgroundColor: "#26d6ca",
  color: "white",
  fontSize: "20px",
  padding: "5px 5px 5px 5px",
  marginLeft: "2%",
  marginTop: "0%",
  width: "15%",
};
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "max-content",
  marginTop: "60px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const saveStyle = {
  backgroundColor: "#26d6ca",
  color: "white",
  display: "inline-block",
  fontSize: "15px",
  padding: "5px",
  float: "right",
  marginTop: "0%",
  width: "fit-content",
};

const sendStyle = {
  marginLeft: "45%",
  marginTop: "5%",
};

const textAreaStyle = {
  marginLeft: "1.5%",
  marginTop: "0%",
  width: "80%",
  height: "100px",
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
  const [status, setStatus] = React.useState("");
  const [percentileGK, setPercentileGK] = React.useState("");
  const [college_name, setCollege_name] = React.useState("");
  const [city, setCity] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [showdate, setShowdate] = React.useState(true);
  const [updatedate, setUpdatedate] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [reviews, setReviews] = React.useState([{}]);

  let history = useHistory();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const userSendBulkEmails = useSelector((state) => state.userSendBulkEmails);
  const {
    loading,
    success: successSendBulkEmails,
    error: errorSendBulkEmails,
    status: statusSendBulkEmails,
  } = userSendBulkEmails;

  // const mailReadContent = useSelector((state) => state.mailReadContent);
  // const {
  //   loading: loadingMailRead,
  //   error: errorMailRead,
  //   mailContent,
  // } = mailReadContent;

  // const mailUpdateContent = useSelector((state) => state.mailUpdateContent);
  // const {
  //   loading: loadingMailUpdate,
  //   success: successMailUpdate,
  //   error: errorMailUpdate,
  //   status: statusMailUpdate,
  // } = mailUpdateContent;

  const [selectedEmails, setSelectedEmails] = useState(null);
  const [subject, setSubject] = useState(
    "Craft Your Career with the First B-School of Pune"
  );

  const sendEmailHandler = async (e) => {
    e.preventDefault();
    const content = document.getElementById("editablemail").innerHTML;
    dispatch(sendBulkEmails(selectedEmails, content, subject));
  };

  // const updateMailContentHandler = async (e) => {
  //   e.preventDefault();
  //   const content = document.getElementById("editablemail").innerHTML;
  //   console.log(content.toString());
  //   dispatch(updateMailContent(content));
  // };

  //const { _id, token } = isAuthenticated();

  const emailId = history.location.state.email;
  const array = [];
  array.push(emailId);
  // backend call
  const preload = () => {
    getLead(userInfo._id, userInfo.token, { emailId })
      .then((data) => {
        if (data.error) {
          setError(true);
          setSuccess(false);
          console.log(data.error);
        } else {
          console.log(data);
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
          setEntrance(data.entrance ? data.entrance.toLowerCase() : "na");
          setSource(data.source ? data.source.toLowerCase() : "na");
          setEntrance(data.entrance.toLowerCase());
          setSource(data.source.toLowerCase());
          setStatus(data.status.toLowerCase());
          setEntrance(data.entrance ? data.entrance.toLowerCase() : "NA");
          setSource(data.source ? data.source.toLowerCase() : "NA");
          setReviews(data.reviews);
        }
      })
      .catch((err) => console.log(err));
  };

  reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  // backend call for update status
  const addReviewHandler = async (event) => {
    event.preventDefault();
    history.go(0);

    updateStatus(userInfo._id, userInfo.token, { emailId, status, comment })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
        }
      })
      .catch();
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
            Updation of lead done Successfully.
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
    if (!userInfo) {
      history.push("/login");
    }
    preload();
  }, [history, userInfo, successSendBulkEmails]);
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
              disabled={true}
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
            <FormControl
              style={{
                margin: "8px 8px 8px 15%",
                width: "35%",
                textSize: "20px",
              }}
            >
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
            <TextField
              label="Status"
              style={listStyle}
              variant="outlined"
              disabled="disabled"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            />
            <Grid>
              <Button
                style={mailbtnStyle}
                type="submit"
                color="#30af53"
                fontSize="large"
                startIcon={<EmailIcon fontSize="large" />}
                onClick={(e) => {
                  dispatch(readMailContent());
                  setSelectedEmails(email);
                  handleOpen();
                }}
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
            <hr />
            <h3 style={headerStyle}>Write a Lead Review</h3>
            <Typography style={{ margin: "8px", color: "red" }}>
              Select Status
            </Typography>

            <FormControl style={{ margin: "8px", width: "50%" }}>
              <InputLabel>Status</InputLabel>
              <Select
                labelId=""
                id=""
                defaultValue={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={"level 1"}>Level 1</MenuItem>
                <MenuItem value={"level 2"}>Level 2</MenuItem>
                <MenuItem value={"level 3"}>Level 3</MenuItem>
                <MenuItem value={"level 4"}>Level 4</MenuItem>
              </Select>
            </FormControl>

            <Typography style={{ margin: "8px", color: "red" }}>
              Comment
            </Typography>
            <TextareaAutosize
              placeholder="Write comment here"
              style={textAreaStyle}
              required
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button
              color="primary"
              variant="contained"
              style={submitStyle}
              onClick={addReviewHandler}
            >
              Submit
            </Button>
            <hr />
            <h3 style={headerStyle}> Reviews</h3>

            {reviews.map((review, index) => {
              return (
                <p key={index} className="alert alert-primary">
                  <b> status:-</b>
                  {review.status} <b>comment:-</b>
                  {review.comment} <b>time:-</b>
                  {review.createdAt}
                </p>
              );
            })}
          </form>
        </Paper>
      </Grid>
      <div>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            {loading && (
              <Alert severity="info">
                Sending Emails.. It make few minutes..
              </Alert>
            )}
            {/* {loadingMailUpdate && (
              <Alert severity="info">Updating mail content...</Alert>
            )} */}
            {/* {loadingMailRead && (
              <Alert severity="info">Loading mail content...</Alert>
            )} */}
            {errorSendBulkEmails && (
              <Alert severity="error">{errorSendBulkEmails}</Alert>
            )}
            {/* {errorMailRead && <Alert severity="error">{errorMailRead}</Alert>} */}
            {/* {errorMailUpdate && (
              <Alert severity="error">{errorMailUpdate}</Alert>
            )} */}
            {statusSendBulkEmails && (
              <Alert severity="success">{statusSendBulkEmails.data}</Alert>
            )}
            {/* {statusMailUpdate && (
              <Alert severity="success">{statusMailUpdate.status}</Alert>
            )} */}

            <form>
              <div fullwidth="true">
                <h3
                  style={{
                    display: "inline-block",
                    textAlign: "center",
                    float: "left",
                  }}
                >
                  Select Mail Template{" "}
                </h3>
                <Button
                  type="submit"
                  align="right"
                  color="primary"
                  variant="contained"
                  style={saveStyle}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </div>

              <TextField
                label="Subject"
                style={textstyle}
                required
                variant="outlined"
                placeholder="Enter Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                fullWidth
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={sendStyle}
                onClick={sendEmailHandler}
              >
                SEND
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default LeadDetails;
