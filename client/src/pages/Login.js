import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleLogin } from "react-google-login";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState({});
    const { setAuthState } = useContext(AuthContext)
    let navigate = useNavigate();
    const clientId = "413254531245-7ol21fbdp7k43o4pbdm8k0k3ip2bee07.apps.googleusercontent.com";

    /////////////////////////////////////////////////////////
    const onSuccess = async (res) => {
        // Check if a token was recieved and send it to our API:
        if (res.tokenId) {
            let data = {};
            data.firstName = res.profileObj.givenName
            data.lastName = res.profileObj.familyName
            data.email = res.profileObj.email
            data.password = res.profileObj.googleId
            data.isLocal = "no"
            // Check if we have some result:
            await axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({ email: response.data.email, id: response.data.id, status: true });
                navigate("/");
            };
        });
        }
    };

    //const onSuccess = (res) => {
    //    console.log('[Login Success] Current User: ', res.profileObj);
    // }

    const onFailure = (res) => {
        console.log('[Login Failed] res: ', res);
    }

    const login = () => {
        let data = { email: email, password: password };
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({ email: response.data.email, id: response.data.id, status: true });
                navigate("/");
            };
        });
    };



    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright Â© '}
                <Link color="inherit" href="#">
                    Team IT
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    };

    const theme = createTheme();

    return (
        <div >
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box noValidate sx={{ mt: 1 }}>
                            <TextField
                                className="bg-light"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                            <TextField
                                className="bg-light"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                onClick={login}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>

                            <GoogleLogin
                                clientId={clientId}
                                buttonText="Log in with Google"
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookiePolicy={'single_host_origin'}
                            />

                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/registration" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default Login