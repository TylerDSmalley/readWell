import React, { useEffect, useState, useContext } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
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

    useEffect(() => {
        axios.get(`http://localhost:3001/books/byId/${id}`).then((response) => {
            setBookObject(response.data);
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
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="full">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Book Details
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8, minHeight: "100vh" }} maxWidth="xs" >
                    {/* End hero unit */}
                    <Grid
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ display: 'flex' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    image={bookObject.coverPhoto}
                                    alt="Live from space album cover"
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                            {bookObject.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {bookObject.summary}
                                        </Typography>
                                    </CardContent>
                                    <hr></hr>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', pl: 3, pb: 1 }}>
                                        <Typography align="left" variant="subtitle1" color="text.secondary" component="div">
                                            Author: {bookObject.author}
                                        </Typography>
                                        <Typography align="left" variant="subtitle1" color="text.secondary" component="div">
                                            Genre: {bookObject.genre}
                                        </Typography>
                                        <Typography align="left" variant="subtitle1" color="text.secondary" component="div">
                                            Date Published: {bookObject.datePublished}
                                        </Typography>
                                        <Typography align="left" variant="subtitle1" color="text.secondary" component="div">
                                            isbn: {bookObject.isbn}
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