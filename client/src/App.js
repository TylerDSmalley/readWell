import './App.css';
import React from 'react';
//Material UI imports
import AppBar from '@mui/material/AppBar';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//--
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './pages/Home';
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Book from './pages/Book';
import Bookshelf from './pages/Bookshelf';
import PageNotFound from "./pages/PageNotFound";
import UserList from './pages/admin/UserList';
import BookList from './pages/admin/BookList';
import ReviewList from './pages/admin/ReviewList';
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const theme = createTheme();
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    role: "",
    status: false,
  });

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
            <AppBar position="relative" className="navbar2">
              <Toolbar className="navbar2">
                <MenuBookIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit" noWrap>
                <Link to="/" className='m-0 text-white'>ReadWell</Link>
                </Typography>
                <Typography variant="h5" color="inherit" align="right" noWrap style={{ flex: 1 }}>
                  {authState.email} 
                </Typography>
              </Toolbar>
            </AppBar>
          </ThemeProvider>
          <div className="navbar border-bottom rounded-2">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              ) : (
                <>
                  
                </>
              )}
              {authState.role === "admin" &&
                <>
                  <Link to="/admin/users/list"> User List</Link>
                  <Link to="/admin/books/list"> Book List</Link>
                </>
              }
            </div>
            <div className="loggedInContainer">
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
          <Routes>
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='/books/byId/:id' element={<Book />} />
            <Route path='/bookshelves' element={<Bookshelf />} />
            <Route path='/admin/users/list' element={<UserList />} />
            <Route path='admin/books/list' element={<BookList />} />
            <Route path='admin/reviews/list' element={<ReviewList />} />
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
