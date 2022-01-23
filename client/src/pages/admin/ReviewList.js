import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';

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

  function createData(id,summary, booktitle, reviewby) {
    return { id,summary, booktitle, reviewby };
  }


  const rows = listOfReviews.map((value) => (
    createData(value.id, value.summary, value.Book.title, value.User.email)
  ))

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <caption>List of Reviews</caption>
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Book Title</TableCell>
            <TableCell align="right">Book Review</TableCell>
            <TableCell align="right">Review By</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.booktitle}</TableCell>
              <TableCell align="right">{row.summary}</TableCell>
              <TableCell align="right">{row.reviewby}</TableCell>
              <TableCell align="right">
                <Button className="bg-danger text-white" onClick={() => {deleteReview(row.id)}}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      ></TablePagination>
    </TableContainer>

  )
}

export default ReviewList