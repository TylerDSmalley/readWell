import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Registration() {

    let navigate = useNavigate();
    const theme = createTheme();

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(1).max(30).required("You must input a first name"),
        lastName: Yup.string().min(1).max(30).required("You must input a last name"),
        email: Yup.string().min(3).max(15).required("You must input a email"),
        password: Yup.string().min(4).max(20).required("You must input a password"),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    // const onSubmit = (event) => {
    //     const form = new FormData(event.currentTarget);
    //     let data = {
    //         firstName: form.get('firstName'),
    //         lastName: form.get('lastName'),
    //         email: form.get('email'),
    //         password: form.get('password'),
    //     };

    //     axios.post("http://localhost:3001/auth", data).then((response) => {
    //         navigate("/");
    //     });
    // };

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((response) => {
            navigate("/");
        });
    };


    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container sx={{ minHeight: "100vh" }} component="main" maxWidth="xs">
                    <CssBaseline />
                    <main className="w-100">
                        <Box
                            sx={{
                                p: 5,
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            className='contentBox rounded-3'
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box sx={{ mt: 3 }}>
                                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                    <Form >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <label>First Name: </label>
                                                <Field
                                                    className="form-control"
                                                    name="firstName"
                                                />
                                                <ErrorMessage name="firstName" component="span" />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label>Last Name: </label>
                                                <Field
                                                    className="form-control"
                                                    name="lastName"
                                                />
                                                <ErrorMessage name="lastName" component="span" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <label>Email: </label>
                                                <Field
                                                    className="form-control"
                                                    name="email"
                                                />
                                                <ErrorMessage name="email" component="span" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <label>Password: </label>
                                                <Field
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                />
                                                <ErrorMessage name="password" component="span" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <label>Confirm Password: </label>
                                                <Field
                                                    type="password"
                                                    className="form-control"
                                                    name="passwordConfirmation"
                                                />
                                                <ErrorMessage name="passwordConfirmation" component="span" />
                                            </Grid>
                                            <Grid item xs={12}>

                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Sign Up
                                        </Button>
                                        <Grid container justifyContent="flex-end">
                                            <Grid item>
                                                <Link href="/login" variant="body2">
                                                    Already have an account? Sign in
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                </Formik>
                            </Box>
                        </Box>
                    </main>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default Registration
