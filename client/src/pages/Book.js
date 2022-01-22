import React, { useEffect, useState, useContext, forwardRef } from "react";
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Divider } from "@mui/material";
import Chip from '@mui/material/Chip';
import moment from "moment";

function Book() {
    let { id } = useParams();
    let navigate = useNavigate();
    const theme = createTheme();
    const { authState } = useContext(AuthContext)
    const [bookObject, setBookObject] = useState({});
    const [listOfReviews, setListOfReviews] = useState([]);
    // const [newReview, setNewReview] = useState("");
    const [ratingValue, setRatingValue] = useState(0);
    const [popUp, setPopUp] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [snackOpen, setSnackOpen] = useState(false);
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSnackClick = () => {
        setSnackOpen(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackOpen(false);
    };

    const addToRead = () => {
        axios.post(`http://localhost:3001/shelves`, {
            shelf: "read",
            BookId: id,
            UserId: authState.id
        },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                },
            }
        ).then((response) => {
            if (response.data.error) {
                setPopUp(response.data.error);
            } else {
                setPopUp("Book added to Read shelf!");
                handleSnackClick();
                setAnchorEl(null);
            }
        });
    };

    const addToReading = () => {
        axios.post(`http://localhost:3001/shelves`, {
            shelf: "reading",
            BookId: id,
            UserId: authState.id
        },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                },
            }
        ).then((response) => {
            if (response.data.error) {
                setPopUp(response.data.error);
            } else {
                setPopUp("Book added to Reading shelf!");
                handleSnackClick();
                setAnchorEl(null);
            }
        });
    };

    const addToWant = () => {
        axios.post(`http://localhost:3001/shelves`, {
            shelf: "want",
            BookId: id,
            UserId: authState.id
        },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                },
            }
        ).then((response) => {
            if (response.data.error) {
                setPopUp(response.data.error);
            } else {
                setPopUp("Book added to Want to Read shelf!");
                handleSnackClick();
                setAnchorEl(null);
            }
        });
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/books/byId/${id}`).then((response) => {
            setBookObject(response.data);
            setRatingValue(response.data.rating);
        });

        axios.get(`http://localhost:3001/review/${id}`).then((response) => {
            setListOfReviews(response.data);
        });
    }, [id]);

    console.log(listOfReviews)

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
                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                    open={snackOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackClose}
                >
                    <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                        {popUp}
                    </Alert>
                </Snackbar>
                <Container sx={{ minHeight: "100vh", maxWidth: '100%' }} >
                    <Box sx={{ p: 8, my: 5, minWidth: 'fit-content' }} className='contentBox rounded-3'>
                        <Grid
                            container
                            spacing={2}
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
                                                <Rating sx={{ pl: 0, ml: 0 }} name="read-only" value={ratingValue} readOnly /> {ratingValue}
                                            </Typography>
                                            <Typography align="left" variant="subtitle1" color="text.secondary" component="div">
                                                {bookObject.summary}
                                            </Typography>
                                        </CardContent>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', pl: 3, pb: 1 }}>
                                            <hr></hr>
                                            <Typography align="left" variant="caption" color="text.secondary" component="div">
                                                <strong>Genre:</strong> {bookObject.genre}
                                            </Typography>
                                            <Typography align="left" variant="caption" color="text.secondary" component="div">
                                                <strong>Date Published:</strong> {bookObject.datePublished}
                                            </Typography>
                                            <Typography align="left" variant="caption" color="text.secondary" component="div">
                                                <strong>isbn:</strong> {bookObject.isbn}
                                            </Typography>
                                            <hr></hr>

                                            {authState.status &&
                                                <>
                                                    <Button
                                                        id="basic-button"
                                                        aria-controls={open ? 'basic-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        onClick={handleClick}
                                                    >
                                                        Add To Shelf
                                                    </Button>
                                                    <Menu
                                                        id="basic-menu"
                                                        size="small"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                    >
                                                        <MenuItem onClick={addToRead}>Read</MenuItem>
                                                        <MenuItem onClick={addToReading}>Reading</MenuItem>
                                                        <MenuItem onClick={addToWant}>Want to Read</MenuItem>
                                                    </Menu>
                                                </>
                                            }

                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                        <Divider color="text.secondary" className="mt-3 mb3"><Chip label="Reviews" /></Divider>
                        <div className="container w-50 mt-3">
                            {listOfReviews.map((value, key) => (
                                <div key={key} className="card w-auto mt-2 mb-4 shadow-sm">
                                    <div className="card-header d-flex justify-content-between">
                                        <div>{value.User.firstName}'s Review</div>
                                        <div>Posted on: {moment(value.updatedAt).format('DD/MM/YYYY')}</div>
                                        
                                    </div>
                                    <div className="card-body">
                                        <blockquote className="blockquote mb-0">
                                            <p>{value.summary}</p>
                                            <footer className="blockquote-footer"> <cite title="Source Title"></cite></footer>
                                        </blockquote>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </Box>
                </Container>
            </main>
        </ThemeProvider>
    );
}

export default Book;