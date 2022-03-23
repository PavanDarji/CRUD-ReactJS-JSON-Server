import { Button, makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getUser, deleteUser } from '../Service/api'
import Swal from 'sweetalert2';
import { Stack } from '@mui/material';
import Pagination from '@material-ui/lab/Pagination';

const useStyle = makeStyles({
  table: {
    width: "90%",
    margin: "50px 0 0 50px",
  },
  thead: {
    "& > *": {
      background: "#000000",
      color: "#ffffff",
      fontSize: 20
    },
    row: {
      "& > *": {
        fontSize: 20
      },
    }
  }
})

const AllUser = () => {

  const [users, setUsers] = useState([]);


  const classes = useStyle();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const response = await getUser();
    console.log(response.data);
    setUsers(response.data);
  }

  // const deleteUserData = async (id) => {
  //   await deleteUser(id)

  //   getAllUsers();
  // }


  <Stack spacing={2}>
    <Pagination count={10} />
    <Pagination count={10} color="primary" />
    <Pagination count={10} color="secondary" />
  </Stack>



  const deleteUserData = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to delete this data !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it !'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id)
          .then(response => {
            Swal.fire(
              'Deleted !',
              'Your data has been deleted.',
              'success'
            )
            getAllUsers()
            // console.log(response)
            // history.push('/books')
            // setBooks(response.data.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    })
  }


  return (
    <>

      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.thead}>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>UserName</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            users.map(user => (
              <TableRow className={classes.row}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Button variant='contained' color='primary' style={{ marginRight: 10 }} component={Link} to={`/edit/${user.id}`}>Edit</Button>
                  <Button variant='contained' color='secondary' onClick={() => deleteUserData(user.id)}>Delete</Button>

                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <Pagination count={5} style={{ display: 'block', padding: 30 }} />
    </>
  )
}

export default AllUser