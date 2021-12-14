 import React from "react";
import { useState, useEffect } from "react";

import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { useHistory, Link } from "react-router-dom";
import * as Yup from "yup";
import Stack from '@mui/material/Stack';
// backend imports

import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { Alert } from "@mui/material";

const RegisterScreen = ({ handleChange }) => {
  const paperStyle = {
    padding: 20,
    height: "90%",
    width: 340,
    margin: "auto 0",
    backgroundColor: "",
  };
  const avatarstyle = { backgroundColor: "#26d6ca" };
  const headerStyle = { margin: 0 };
  const textstyle = { margin: "5px 0" };
  const btnstyle = { marginTop: "40px" };
  const linkStyle = { marginTop: "50px" };
  let history = useHistory();

  

  // ************* Backend Stuff

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setMessage("Passwords do not match");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else {
      dispatch(register(username, email, password));
    }
  };
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    
}

const validationSchema = Yup.object().shape({
username: Yup.string().required("Please Provide name "),
email: Yup.string().email("Enter valid email").required("Required"),
password: Yup.string().min(6, "Password minimum length should be 8").required("Required"),
confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
})

const onSubmit = (values, props) => {
console.log(values);
props.setSubmitting(false);
}
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarstyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption">
            Please fill this form to create an account!
          </Typography>
        </Grid>

       
         <Stack sx={{ width: '100%' }} spacing={2}>
          {message && <Alert variant="filled" severity="error">{message}</Alert>}
          {error &&<Alert variant="filled" severity="error">Invalid Credentials!</Alert>}
          {loading && <Alert variant="filled" severity="info">Loading...</Alert>}
          </Stack>

        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >

          {(props) => (
            <Form onSubmit={registerHandler}>
              <Field
                as={TextField}
                label="Your Name"
                name="username"
                style={textstyle}
                placeholder="Enter Your Name"
                fullWidth
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                helperText={<ErrorMessage name="username"/>}
              />
              
              <Field
                as={TextField}
                label="Email"
                placeholder="Enter Email"
                type="email"
                name="email"
                style={textstyle}
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                label="Password"
                placeholder="Enter Password"
                type="password"
                name="password"
                style={textstyle}
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText={<ErrorMessage name="password" />} 
              />
              <Field
                as={TextField}
                label="Confirm Password"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                style={textstyle}
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                helperText={<ErrorMessage name="confirmPassword" />} 
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                disabled={props.isSubmitting}
                fullWidth
                onClick={registerHandler}
              >
                Sign Up
              </Button>
              </Form>
          )}
        </Formik>
                  <Typography style={linkStyle}>
                    Already have an account ?{" "}
                    <Link to="/login" onClick={() => handleChange("event", 0)}>
                      Sign In
                    </Link>
                  </Typography>
       
      </Paper>
    </Grid>
  );
};

export default RegisterScreen;
