import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {

    const theme = createTheme();
    let navigate = useNavigate();
    const [userObject, setUserObject] = useState([]);
    let { id } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:3001/admin/users/byId/${id}`).then((response) => {
            setUserObject(response.data);
            });
        },[]);

    const initialValues = { firstName: userObject.firstName ? userObject.firstName : "" , lastName: userObject.lastName ? userObject.lastName: "", email: userObject.email ? userObject.email: "",  role: userObject.role ? userObject.role: "" };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().required("Email is required"),
    });

    const onSubmit = (data) => {
        axios.put(`http://localhost:3001/admin/users/update/${id}`, data).then((response) => {
            navigate("/admin/users/list");
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main className="w-100">
                <Container sx={{ minHeight: "100vh"}} maxWidth="sm">
                    <Box 
                        sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 8, 
                            my: 5 }} 
                        justifyContent="center" 
                        className='contentBox rounded-3'
                    
                    >
                    <Box flexDirection="column" justifyContent="flex-start">
                        <div><h5>Update User</h5></div>
                        
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize={true}>
                            <Form >
                                <label>First Name:&nbsp;</label>
                                <ErrorMessage name="firstName" component="span" />
                                <Field name="firstName" /><br />
                                <label>Last Name:&nbsp;</label>
                                <ErrorMessage name="lastName" component="span" />
                                <Field name="lastName" /><br />
                                <label>Email:&nbsp;</label>
                                <ErrorMessage name="email" component="span" />
                                <Field name="email" /><br />
                                <div id="role">User Role:</div>
                                <div role="group" aria-labelledby="role">
                                    <label>
                                        <Field type="radio" name="role" value="user" />
                                        User
                                    </label>
                                    <label>
                                        <Field type="radio" name="role" value="admin" />
                                        Admin
                                    </label></div>
                                <button type="submit">Update User</button>
                            </Form>
                        </Formik>
                        </Box>
                    </Box>
                </Container>
            </main>
        </ThemeProvider>
    )
}

export default UpdateUser