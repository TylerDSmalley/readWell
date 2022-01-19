import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './pages/Home';
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import UserList from './pages/UserList';
import BookList from './pages/BookList';
import ReviewList from './pages/ReviewList';
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from 'axios';


function App() {
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

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ email: "", id: 0, role: "", status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Home Page</Link>
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
              <h5>{authState.email} </h5>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
          <Routes>
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} /> 
            <Route path='/admin/users/list' element={<UserList />} />
            <Route path='admin/books/list' element={<BookList />} />
            <Route path='admin/reviews/list' element={<ReviewList />} />
            <Route path='/*' element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
