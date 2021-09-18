import React from 'react';
import { Avatar, Button, Grid, Paper, TextField, Typography, Link } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup'

const Login = ({ handleChange }) => {
    const paperstyle = { padding: 20, height: "70vh", width: 340, margin: "0px auto" }
    const avatarstyle = { backgroundColor: "#26d6ca" }
    const btnstyle = { margin: '8px 0' }
    const textstyle = { margin: '8px 0' }
    const linkStyle = { margin: '8px 0' }
    const initialValues = {
        email: '',
        password: '',
        remember: false
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Please enter valid email'),


    })
    const onSubmit = (values, props) => {
        console.log(values)
        props.setSubmitting(false)
        console.log(props)

    }
    let history = useHistory();
    // history.push('/Home')

    return (
        <Grid>
            <Paper elevation={10} style={paperstyle}>
                <Grid align="center">
                    <Avatar style={avatarstyle}><LockIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>

                            <Field as={TextField} label="Email" name="email" placeholder="Enter Email" type="email" fullWidth required
                                helperText={<ErrorMessage name="email" />}

                            />
                            <Field as={TextField} TextField label="Password" name="password" placeholder="Enter Password" type="password" style={textstyle} fullWidth required
                            />

                            <Button type="submit" color="primary" variant="contained" disabled={props.isSubmitting} style={btnstyle} fullWidth
                                onClick={() => {
                                    history.push("/");
                                }}
                            >
                                Sign In</Button>

                        </Form>
                    )}
                </Formik>
                <Typography>
                    <Link href="#" onClick={() => { history.push("/forgot") }}
                    >
                        Forgot password
                    </Link>
                </Typography>

                <Typography style={linkStyle}>Don't have an account?
                    <Link href="#" onClick={() => handleChange("event", 1)}>
                        Sign Up

                    </Link>
                </Typography>


            </Paper>
        </Grid>
    )
}
export default Login;