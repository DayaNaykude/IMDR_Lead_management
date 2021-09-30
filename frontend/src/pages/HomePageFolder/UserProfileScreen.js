import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { useHistory } from "react-router-dom";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const paperStyle = {
  padding: 20,
  height: "90%",
  width: "40%",
  margin: "10px auto",

  backgroundColor: "",
};

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

// backend imports

const UserProfileScreen = () => {

  const avatarstyle = { backgroundColor: "#26d6ca" };
  const headerStyle = { margin: 0 };
  const textstyle = { margin: "10px 0", textSize: "20px" };


  

  let history = useHistory();

  //*********** Backend Stuff */

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.username || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setUsername(user.username);
        setEmail(user.email);
        setContact(user.contact);
        setBio(user.bio);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setMessage("Passwords do not match");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else {
      setDisabled(true);
      dispatch(
        updateUserProfile({
          id: user._id,
          username,
          email,
          password,
          contact,
          bio,
        })
      );
    }
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <IconButton
          aria-label="Back to home page"
          color="primary"
          variant="contained"
          onClick={() => {
            history.push("/login");
          }}
        >
          <KeyboardBackspaceSharpIcon />
        </IconButton>

        <Grid align="center">
          <Avatar style={avatarstyle}>
            <PersonIcon />
          </Avatar>
          <h1 style={headerStyle}>User Profile</h1>
        </Grid>
        {message && <span className="error-message">{message}</span>}
        {error && <span className="error-message">{error}</span>}
        {success && <span className="error-message">Profile Updated</span>}
        {loading && <h3>Loading...</h3>}
        <form onSubmit={submitHandler}>
          <TextField
            label="Your Full Name"
            variant="outlined"
            style={textstyle}
            placeholder="Enter Your Name"
            fullWidth
            disabled={disabled}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Bio"
            style={textstyle}
            variant="outlined"
            placeholder="Enter Your Bio"
            fullWidth
            disabled={disabled}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <TextField
            label="Email"
            variant="outlined"
            placeholder="Enter Email"
            type="email"
            style={textstyle}
            fullWidth
            disabled={disabled}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            style={textstyle}
            type="number"
            placeholder="Enter Your Phone number"
            fullWidth
            disabled={disabled}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <TextField
            id="date"
            variant="outlined"
            label="Birthday date"
            type="date"
            style={textstyle}
            disabled={disabled}
            // style={birthStyle}
            defaultValue="1990-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Password"
            variant="outlined"
            placeholder="Enter Password"
            type="password"
            style={textstyle}
            fullWidth
            disabled={disabled}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            placeholder="Confirm Password"
            type="password"
            style={textstyle}
            fullWidth
            disabled={disabled}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            color="primary"
            variant="contained"
            style={editStyle}
            onClick={(e) => {
              setDisabled(false);
              console.log(disabled);
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
          >
            UPDATE
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default UserProfileScreen;
