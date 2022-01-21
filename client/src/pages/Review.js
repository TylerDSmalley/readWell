import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useParams } from "react-router-dom";

function Review() {
  const theme = createTheme();
  const { authState } = useContext(AuthContext)
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const initialValues = {
    summary: "",
  };

  const validationSchema = Yup.object().shape({
    summary: Yup.string().required("You must input a review"),
  })

  const onSubmit = (data) => {
    data.BookId = id;
    data.UserId = authState.id
    axios.post("http://localhost:3001/reviews", data, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      navigate(`/bookshelves/${data.UserId}`);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className="w-100">
      <Container sx={{ py: 8, my: 5,  minHeight: "100vh" }} maxWidth="md" className='contentBox rounded-3'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="formContainer">
          <label>Review </label>
          <ErrorMessage name="summary" component="span" />
          <Field
            type="textArea"
            name="summary"
            placeholder="(Ex. John123...)"
          />
          <button type="submit"> submit review </button>
        </Form>
      </Formik>
      </Container>
      </main>
    </ThemeProvider>
  )
}

export default Review;
