import './App.css';
import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
//Material UI imports
import AppBar from '@mui/material/AppBar';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
//--
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './pages/Home';
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Book from './pages/Book';
import Bookshelf from './pages/Bookshelf';
import Review from './pages/Review';
import PageNotFound from "./pages/PageNotFound";
import UserList from './pages/admin/UserList';
import BookList from './pages/admin/BookList';
import ReviewList from './pages/admin/ReviewList';
import AddBook from './pages/admin/AddBook';
import CreateUsers from './pages/admin/CreateUsers';
import UpdateBook from './pages/admin/UpdateBook';
import UpdateUser from './pages/admin/UpdateUser';
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from 'axios';
import Chip from '@mui/material/Chip';

function App() {
  const theme = createTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    role: "",
    status: false,
  });

  useEffect((authState) => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            role: response.data.role,
            status: true,
          });
        }
      });
  }, []);

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        Team IT -
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ email: "", id: 0, role: "", status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <AppBar position="static" className="navbar2">
              <Toolbar className="navbar2">
                <MenuBookIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit" noWrap>
                  <Link to="/" className='m-0 text-white'>ReadWell</Link>
                </Typography>



                <Typography variant="h5" color="inherit" align="right" noWrap style={{ flex: 1 }}>
                  {!authState.status ? (
                    <>
                      <Link to="/login"> Login</Link>
                    </>
                  ) : (

                    <div>
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>

                      {!authState.role === "admin" ? (
                        <>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem className='mx-3 my-2' >
                              {authState.email}
                            </MenuItem>
                            <Divider color="text.secondary" className="mt-3 mb3"><Chip label="User Menu" /></Divider>
                            <MenuItem className='my-3'>
                              <Link to={{ pathname: `/shelves/${authState.id}` }}>
                                Bookshelves
                              </Link>
                            </MenuItem>
                            <Divider color="text.secondary" className="mt-3 mb3"></Divider>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                          </Menu>
                        </>
                      ) : (
                        <>
                          <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem className='mx-3 my-2' >
                              {authState.email}
                            </MenuItem>
                            <Divider color="text.secondary" className="mt-3 mb3"><Chip label="User Menu" /></Divider>
                            <MenuItem className='my-3'>
                              <Link to={{ pathname: `/shelves/${authState.id}` }}>
                                Bookshelves
                              </Link>
                            </MenuItem>
                            <Divider color="text.secondary" className="mt-3 mb3"><Chip label="Admin" /></Divider>
                            <MenuItem className='mb-1' >
                              <Link to="/admin/users/list"> User List</Link>
                            </MenuItem>
                            <MenuItem className='mb-1'>
                              <Link to="/admin/books/list"> Book List</Link>
                            </MenuItem>
                            <MenuItem className='mb-1'>
                              <Link to="/admin/books/create">Add Book</Link>
                            </MenuItem>
                            <MenuItem className='mb-1'>
                              <Link to="/admin/users/create">Create User</Link>
                            </MenuItem>
                            <MenuItem className='mb-1'>
                              <Link to="/admin/reviews/list">Review List</Link>
                            </MenuItem>
                            <Divider color="text.secondary" className="mt-3 mb3"></Divider>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                          </Menu>
                        </>
                      )}

                    </div>
                  )}
                </Typography>

              </Toolbar>
            </AppBar>


          </ThemeProvider>
          <div className="navbar border-bottom shadow-sm">

          </div>
          <Routes>
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='/books/byId/:id' element={<Book />} />
            <Route path='/shelves/:id' element={<Bookshelf />} />
            <Route path='/review/:bookId/:rowId/:userId' element={<Review />} />
            <Route path='/admin/users/list' element={<UserList />} />
            <Route path='/admin/users/update/:id' element={<UpdateUser />} />
            <Route path='admin/books/list' element={<BookList />} />
            <Route path='admin/books/update/:id' element={<UpdateBook />} />
            <Route path='admin/reviews/list' element={<ReviewList />} />
            <Route path='admin/books/create' element={<AddBook />} />
            <Route path='admin/users/create' element={<CreateUsers />} />
            <Route path='/*' element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
      <Box sx={{ p: 6 }} component="footer" className='footer w-100'>
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
    </div>
  );
}

export default App;
