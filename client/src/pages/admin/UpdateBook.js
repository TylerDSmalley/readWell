import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {

    const theme = createTheme();
    let navigate = useNavigate();
    const [bookObject, setBookObject] = useState([]);
    let { id } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:3001/admin/books/byId/${id}`).then((response) => {
            setBookObject(response.data);
            });
        },[]);

    const initialValues = { title: bookObject.title ? bookObject.title : "" , author: bookObject.author ? bookObject.author: "", summary: bookObject.summary ? bookObject.summary: "", genre: bookObject.genre ? bookObject.genre: "", datePublished: bookObject.datePublished ? bookObject.datePublished:"", publisher: bookObject.publisher ? bookObject.publisher: "", isbn: bookObject.isbn ? bookObject.isbn: "", coverPhoto: "" };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        author: Yup.string().required("Author is required"),
        summary: Yup.string().required("Summary is required"),
        genre: Yup.string().required("Genre is required"),
        publisher: Yup.string().required("Publisher is required"),
        isbn: Yup.string().required("ISBN is required"),
    });

    const onSubmit = (data) => {
        //data.coverPhoto = `https://readwell.s3.ca-central-1.amazonaws.com/${selectedFile.name}`;
        console.log(data);
        axios.put(`http://localhost:3001/admin/books/update/${id}`, data).then((response) => {
            navigate("/admin/books/list");
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
                        <div><h5>Update Book</h5></div>
                        
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize={true}>
                            <Form >
                                <label>Title:&nbsp;</label>
                                <ErrorMessage name="title" component="span" />
                                <Field name="title" /><br />
                                <label>Author:&nbsp;</label>
                                <ErrorMessage name="author" component="span" />
                                <Field name="author" /><br />
                                <label>Summary:&nbsp;</label>
                                <ErrorMessage name="summary" component="span" />
                                <Field name="summary" /><br />
                                <label>Genre:&nbsp;</label>
                                <ErrorMessage name="genre" component="span" />
                                <Field name="genre" /><br />
                                <label>Date Published:&nbsp;</label>
                                <ErrorMessage name="datePublished" component="span" />
                                <Field type="date" name="datePublished" /><br />
                                <label>Publisher:&nbsp;</label>
                                <ErrorMessage name="publisher" component="span" />
                                <Field name="publisher" /><br />
                                <label>ISBN:&nbsp;</label>
                                <ErrorMessage name="isbn" component="span" />
                                <Field name="isbn" /><br />
                                <button type="submit">Update Book</button>
                            </Form>
                        </Formik>
                        </Box>
                    </Box>
                </Container>
            </main>
        </ThemeProvider>
    )
}

export default UpdateBook