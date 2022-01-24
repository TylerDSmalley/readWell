import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios';
import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
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

  const editBook = (id) => {
    navigate(`../admin/books/update/${id}`);
  };

  function createData(id, title, author, summary, genre, datePublished,publisher,isbn) {
    return { id, title, author, summary, genre, datePublished,publisher,isbn };
  }


  const rows = listOfBooks.map((value) => (
    createData(value.id,  value.title, value.author, value.summary, value.genre, value.datePublished,value.publisher,value.isbn)
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
      <caption>List of Books</caption>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Author</TableCell>
            <TableCell align="center">Summary</TableCell>
            <TableCell align="center">Genre</TableCell>
            <TableCell align="center">Date Published</TableCell>
            <TableCell align="center">Publisher</TableCell>
            <TableCell align="center">ISBN</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.author}</TableCell>
              <TableCell align="right" width="30%">{row.summary}</TableCell>
              <TableCell align="right">{row.genre}</TableCell>
              <TableCell align="right">{row.datePublished}</TableCell>
              <TableCell align="right">{row.publisher}</TableCell>
              <TableCell align="right">{row.isbn}</TableCell>
              <TableCell align="right" width="10%">
                <Button className="bg-secondary text-white btn-toolbar" onClick={() => {editBook(row.id)}}>Edit!</Button>
                <Button className="bg-danger text-white" onClick={() => {deleteBook(row.id)}}>Delete</Button>
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

export default BookList