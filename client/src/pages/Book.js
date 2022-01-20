import React, { useEffect, useState, useContext } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function Book() {
    let { id } = useParams();
    let navigate = useNavigate();
    const theme = createTheme();
    const { authState } = useContext(AuthContext)
    const [bookObject, setBookObject] = useState({});
    // const [reviews, setReviews] = useState([]);
    // const [newReview, setNewReview] = useState("");
    const [ratingValue, setRatingValue] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:3001/books/byId/${id}`).then((response) => {
            setBookObject(response.data);
            setRatingValue(response.data.rating);
        });

        // axios.get(`http://localhost:3001/reviews/${id}`).then((response) => {
        //     setReviews(response.data);
        // });
    }, [id]);

    // const addReview = () => {
    //     axios.post("http://localhost:3001/reviews", {
    //         summary: newReview,
    //         BookId: bookObject.id,
    //         UserId: authState.id,
    //     },
    //         {
    //             headers: {
    //                 accessToken: localStorage.getItem("accessToken")
    //             },
    //         }
    //     ).then((response) => {
    //         if (response.data.error) {
    //             console.log(response.data.error);
    //         } else {
    //             const reviewToAdd = { summary: newReview, firstName: response.data.firstName };
    //             setReviews([...reviews, reviewToAdd]);
    //             setNewReview("");
    //         }
    //     });
    // };

    // const deleteReview = (id) => {
    //     axios.delete(`http://localhost:3001/reviews/${id}`, {
    //         headers: { accessToken: localStorage.getItem("accessToken") }
    //     }).then(() => {
    //         setReviews(
    //             reviews.filter((val) => {
    //                 return val.id !== id;
    //             })
    //         );
    //     });
    // };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main className="w-100">
                <Container sx={{ py: 8, minHeight: "100vh" }} >
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item xs={12} sm={2} md={2}>
                            <CardMedia
                                className="rounded"
                                component="img"
                                sx={{ width: 151, boxShadow: 3 }}
                                image={bookObject.coverPhoto}
                                alt={bookObject.title}
                                title={bookObject.title}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h4">
                                            {bookObject.title}
                                        </Typography>
                                        <Typography align="left" variant="h6" color="text.secondary" component="div">
                                            By: {bookObject.author}
                                        </Typography>
                                        <Typography align="left" component="div">
                                            <Rating  sx={{ pl: 0, ml: 0 }} name="read-only" value={ratingValue} readOnly /> {ratingValue}
                                        </Typography>
                                        <Typography align="left" variant="subtitle1" color="text.secondary" component="div">
                                            {bookObject.summary}
                                        </Typography>
                                    </CardContent>
                                    <hr></hr>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', pl: 3, pb: 1 }}>
                                        <Typography align="left" variant="caption" color="text.secondary" component="div">
                                            <strong>Genre:</strong> {bookObject.genre}
                                        </Typography>
                                        <Typography align="left" variant="caption" color="text.secondary" component="div">
                                            <strong>Date Published:</strong> {bookObject.datePublished}
                                        </Typography>
                                        <Typography align="left" variant="caption" color="text.secondary" component="div">
                                            <strong>isbn:</strong> {bookObject.isbn}
                                        </Typography>
                                    </Box>
                                </Box>

                            </Card>
                        </Grid>


                    </Grid>

                </Container>
            </main>
        </ThemeProvider>
    );
}

export default Book;