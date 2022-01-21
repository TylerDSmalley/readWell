import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import AWS from 'aws-sdk';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const S3_BUCKET = 'readwell';
const REGION = 'ca-central-1';
const theme = createTheme();


AWS.config.update({
    accessKeyId: 'AKIAXJR27NJ66LXTY6EN',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

const AddBook = () => {

    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }

    let navigate = useNavigate();

    const initialValues = { title: "", author: "", summary: "", genre: "", datePublished: "", publisher: "", isbn: "", coverPhoto: "" };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        author: Yup.string().required("Author is required"),
        summary: Yup.string().required("Summary is required"),
        genre: Yup.string().required("Genre is required"),
        publisher: Yup.string().required("Publisher is required"),
        isbn: Yup.string().required("ISBN is required"),
    });

    const onSubmit = (data) => {
        data.coverPhoto = `https://readwell.s3.ca-central-1.amazonaws.com/${selectedFile.name}`;
        console.log(data);
        axios.post("http://localhost:3001/admin/books/create", data).then((response) => {
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
                        <div><h5>Add Book</h5></div>
                        <label>Image of Book Cover</label><br />
                        <input type="file" onChange={handleFileInput} accept="image/*" /><br />
                        <div> Upload Progress is {progress}%</div>
                        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button><br />
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
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
                                <Field type="hidden" name="isbn" value={selectedFile} /><br />
                                <button type="submit">Add Book</button>
                            </Form>
                        </Formik>
                        </Box>
                    </Box>
                </Container>
            </main>
        </ThemeProvider>
    )
}

export default AddBook;