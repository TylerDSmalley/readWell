import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios';
import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';

function BookList(){

    const [listOfBooks,setListOfBooks] = useState([]);
    let navigate = useNavigate();
    const theme = createTheme();

  useEffect(()=>{
    axios.get("http://localhost:3001/admin/books/list").then((response)=>{
      setListOfBooks(response.data);
    });
  },[]);

  const deleteBook = (id) => {
    axios.delete(`http://localhost:3001/admin/books/delete/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      window.location.reload(false);
    });
  };


    return(
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className="w-100">
      <Container sx={{ minHeight: "100vh"}} maxWidth="lg">
      <Box 
                        sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 8, 
                            my: 5 }} 
                        justifyContent="center" 
                        className='contentBox rounded-3'
                    
                    >
            <h5>List of Books</h5>
            {listOfBooks.map((value,key)=>{
        return (
        <div key={key} className="card m-2">
        <img src={value.coverPhoto} alt="Book Cover" width="150" height="250"></img>
          <div className="card-body">
          <p className="card-title"><b>Title:</b>&nbsp;{value.title}</p>
          <p className="card-text"><b>By:</b>&nbsp;{value.author}</p>
          <p className="cart-text"><b>Summary:</b>&nbsp;{value.summary}</p>
          <p className="cart-text"><b>Genre:</b>&nbsp;{value.genre}</p>
          <p className="cart-text"><b>Date Published:</b>&nbsp;{value.datePublished}</p>
          <p className="cart-text"><b>Publisher:</b>&nbsp;{value.publisher}</p>
          <p className="cart-text"><b>ISBN:</b>&nbsp;{value.isbn}</p>
          <button type="button" className="btn btn-primary" onClick={()=>{navigate(`/admin/list`)}}>Edit</button>
          <button type="button" className="btn btn-primary" onClick={() => {deleteBook(value.id)}}>Delete</button>
          </div>
          </div>
        );
        })}
        </Box>
        </Container>
        </main>
        </ThemeProvider>
    )
}

export default BookList