import React from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory, Link } from "react-router-dom";
import * as Yup from "yup";

// backend imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { Alert } from "@mui/material";

const LoginScreen = ({ handleChange }) => {
  const paperstyle = {
    padding: 20,
    height: "80%",
    width: 340,
    margin: "auto 0",
    backgroundColor: "",
  };
  const avatarstyle = { backgroundColor: "#26d6ca",marginTop:"20px" };
  const btnstyle = { marginTop: "50px" };
  const textstyle = { margin: "8px 0" };
  const linkStyle = { marginTop: "65px", cursor: "pointer" };
  const linkstyle = { marginTop: "65px" };

  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email"),
  });

  const onSubmit = (values, props) => {
    console.log(values);
    props.setSubmitting(false);
  };

  // **************** backend stuff

  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperstyle}>
          <Grid align="center">
            <Avatar style={avatarstyle}>
              <LockIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          {error && <Alert severity="error">{error}</Alert>}
          {loading && <Alert severity="info">Loading...</Alert>}

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form onSubmit={loginHandler}>
                <Field
                style={{marginTop:10}}
                  as={TextField}
                  label="Email"
                  name="email"
                  placeholder="Enter Email"
                  type="email"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  helperText={<ErrorMessage name="email" />}
                />
                <Field
                  as={TextField}
                  TextField
                  label="Password"
                  name="password"
                  placeholder="Enter Password"
                  type="password"
                  style={textstyle}
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={props.isSubmitting}
                  style={btnstyle}
                  fullWidth
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
          <Typography style={linkStyle}>
            <Link
              to="/forgotpassword"
              onClick={() => {
                history.push("/forgotpassword");
              }}
            >
              Forgot password
            </Link>
          </Typography>

          <Typography style={linkstyle}>
            Don't have an account?
            <Link to="/register" onClick={() => handleChange("event", 1)}>
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};
export default LoginScreen;
