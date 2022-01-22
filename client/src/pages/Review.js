import React, { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import CardMedia from '@mui/material/CardMedia';
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
  const [bookObject, setBookObject] = useState({});
  const [personalRating, setPersonalRating] = useState(0);
  const theme = createTheme();
  const { authState } = useContext(AuthContext)
  let { bookId, rowId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      console.log(bookId)
      axios.get(`http://localhost:3001/books/byId/${bookId}`).then((response) => {
        setBookObject(response.data);
      });

      console.log(rowId)
      axios.get(`http://localhost:3001/shelves/rowid/${rowId}`).then((response) => {
        setPersonalRating(response.data.personalRating);
      });

    }
  }, []);

  const changeRating = (newRating) => {
    let data = {personalRating: newRating}
    console.log(data)
    axios.put(`http://localhost:3001/shelves/rate/${rowId}`, data, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      setPersonalRating(newRating);
    });
  };

  const initialValues = {
    summary: "",
  };

  const validationSchema = Yup.object().shape({
    summary: Yup.string().required("You must input a review"),
  })

  const onSubmit = (data) => {
    data.BookId = bookId;
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
        <Container sx={{ py: 8, my: 5, minHeight: "100vh" }} maxWidth="sm">
          <Box
            sx={{
              p: 5,
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
            className='contentBox rounded-3'
          >
            <Typography
              sx={{
                textTransform: 'capitalize',
                fontWeight: 'bold'
              }}
              component="h5"
              variant="h5"
              color="info.main"
              gutterBottom
            >
              {bookObject.title} &gt; review &gt; edit
            </Typography>
            <Grid
              spacing={2}
              container
              direction="row"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={2} sm={2} md={2}>
                <CardMedia
                  className="rounded my-2"
                  component="img"
                  sx={{ boxShadow: 3 }}
                  image={bookObject.coverPhoto}
                  alt={bookObject.title}
                  title={bookObject.title}
                />
              </Grid>
              <Grid>
                <Stack className='mt-2 ms-2'>
                  <Typography variant="h6">
                    {bookObject.title}
                  </Typography>
                  <Typography align='left' variant="caption" color="text.secondary">
                    by {bookObject.author}
                  </Typography>
                  <Typography align='left' variant="caption" color="text.secondary">
                    My rating:
                  </Typography>
                  <Rating
                    sx={{ pl: 0, ml: 0 }}
                    name="personalRating"
                    value={personalRating}
                    onChange={(event, newValue) => {
                      changeRating(newValue);
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              <Form className='d-flex flex-column  mb-3 w-100 align-items-start'>
                <label>Review </label>
                <Field
                  rows="15"
                  className="mb-5 w-100 p-3"
                  as="textarea"
                  name="summary"
                  placeholder="Enter your review..."
                />
                <Button
                  sx={{ bgcolor: 'primary.main', color: 'text.primary' }}
                  type="submit"
                  className='w-25'>
                  submit
                </Button>
                <ErrorMessage name="summary" component="span" />
              </Form>
            </Formik>
          </Box>
        </Container>
      </main>
    </ThemeProvider>
  )
}

export default Review;
