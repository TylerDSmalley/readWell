import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReviewList() {

  const [listOfReviews, setlistOfReviews] = useState([]);
  let navigate = useNavigate();
  const theme = createTheme();

  useEffect(() => {
    axios.get("http://localhost:3001/admin/reviews/list").then((response) => {
      setlistOfReviews(response.data);
    });
  }, []);

  const deleteReview = (id) => {
    axios.delete(`http://localhost:3001/admin/reviews/delete/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      window.location.reload(false);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className="w-100">
        <Container sx={{ minHeight: "100vh" }} maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 8,
              my: 5
            }}
            justifyContent="center"
            className='contentBox rounded-3'

          >
            <h5>List of Book Reviews</h5>
            {listOfReviews.map((value, key) => {
              return (
                <div key={key} className="card m-2">
                  <div className="card-body">
                    <p className="card-title"><b>Book:</b>&nbsp;{value.Book.title}</p>
                    <p className="card-title"><b>Review:</b>&nbsp;{value.summary}</p>
                    <p className="card-title"><b>Review By:</b>&nbsp;{value.User.email}</p>
                    <button type="button" className="btn btn-primary" onClick={() => { deleteReview(value.id) }}>Delete</button>
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

export default ReviewList
