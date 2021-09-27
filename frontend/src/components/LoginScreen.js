import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

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

const LoginScreen = ({ handleChange }) => {
  const paperstyle = {
    padding: 20,
    height: "70vh",
    width: 340,
    margin: "auto 0",
    backgroundColor: "",
  };
  const avatarstyle = { backgroundColor: "#26d6ca" };
  const btnstyle = { marginTop: "40px" };
  const textstyle = { margin: "8px 0" };
  const linkStyle = { marginTop: "55px", cursor: "pointer" };
  const linkstyle={marginTop:"55px", }
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
    console.log(props);
  };
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      setTimeout(() => {
        setError("");
      }, 5000);
    }
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
          {error && <span className="error-message">{error}</span>}
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form onSubmit={loginHandler}>
                <Field
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
            <Link
              to="/register"
             
              onClick={() => handleChange("event", 1)}
            >
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};
export default LoginScreen;
