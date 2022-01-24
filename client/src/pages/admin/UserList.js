import React from 'react';
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




function UserList() {

  const [listOfUsers, setListOfUsers] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/admin/users/list").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const deleteUser = (id) => {
    axios.put(`http://localhost:3001/admin/users/delete/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      // setListOfUsers(listOfUsers);
      window.location.reload();
    });
  };

  const editUser = (id) => {
    navigate(`../admin/users/update/${id}`);
  };

  function createData(id,firstName, lastName, email, role, isLocal, status) {
    return { id,firstName, lastName, email, role, isLocal, status };
  }


  const rows = listOfUsers.map((value) => (
    createData(value.id, value.firstName, value.lastName, value.email, value.role, value.isLocal, value.status)
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
      <caption>List of Users</caption>
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">isLocal</TableCell>
            <TableCell align="right">Account Status</TableCell>
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
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{row.isLocal}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                <Button className="bg-secondary text-white mx-2" onClick={() => {editUser(row.id)}}>Edit!</Button>
                {row.status == 'active' && <Button className="bg-danger text-white" onClick={() => { deleteUser(row.id) }}>Delete</Button>}
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

export default UserList