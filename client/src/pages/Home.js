import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function Home() {
    function Copyright() {
        return (
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="#">
                    Team IT
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
            <AppBar position="relative">
                <Toolbar>
                    <MenuBookIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Library layout
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
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
                            Library layout
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Something short and leading about the collection below—its contents,
                            the creator, etc. Make it short and sweet, but not too short so folks
                            don&apos;t simply skip over it entirely.
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
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
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
                                        image="https://source.unsplash.com/random"
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
                                        <Button size="small">View details</Button>
                                        <Button size="small">Add to Bookshelf</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer" className='w-100'>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}

export default Home