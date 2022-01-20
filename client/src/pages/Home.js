import * as React from 'react';
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
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function Home() {

    const theme = createTheme();

    const [listOfBooks, setListOfBooks] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(
            "http://localhost:3001/books",
        ).then((response) => {
            setListOfBooks(response.data);
            console.log(response.data)
        });
    }, []);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main className="w-100">
                <Container sx={{ py: 8, my: 5,  minHeight: "100vh" }} maxWidth="md" className='contentBox rounded-3'>
                <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            The Library
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Browse our selection of books and start adding to your bookshelves!
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                        </Stack>
                    <Grid container spacing={4}>
                        {listOfBooks.map((value, key) => (
                            <Grid item key={key} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image={value.coverPhoto}
                                        alt="random"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {value.title}
                                        </Typography>
                                        <Typography>
                                            {value.summary}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small"
                                            onClick={
                                                () => {
                                                    navigate(`/books/byId/${value.id}`)
                                                }
                                            }
                                        >View details</Button>
                                        <Button size="small">Add to Bookshelf</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}

export default Home