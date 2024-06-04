/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import axios from 'axios';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import { Alert, Box, Skeleton, TextField } from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

// import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import dayjs from 'dayjs';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { baseURL } from '../../../../apiconfig';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [modalOpen, setModalOpen] = useState(false);

  const [compUsers, setCompUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const compInfo = useAuthUser() || {};

  const [error, setError] = useState(false);

  const [response, setResponse] = useState(null);

  const [formState, setFormState] = useState({
    fname: '',
    lname: '',
    gender: 'M',
    dob: '01-01-2000',
    email: '',
  });

  const genders = [
    {
      value: 'M',
      label: 'Male',
    },
    {
      value: 'F',
      label: 'Female',
    },
  ];

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 520,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  useEffect(() => {
    const fetchUsers = () => {
      setIsLoading(true);
      axios
        .post(`${baseURL}/users`, {
          companyId: compInfo?.company?.companyId,
          companyEmail: compInfo?.company?.companyEmail,
          token: compInfo?.token,
          role: compInfo?.role,
        })
        .then((res) => {
          setCompUsers(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };

    fetchUsers();
  }, [
    compInfo?.company?.companyId,
    compInfo?.company?.companyEmail,
    compInfo?.token,
    compInfo?.role,
  ]);

  const fetchUsers = () => {
    setIsLoading(true);
    axios
      .post(`${baseURL}/users`, {
        companyId: compInfo?.company?.companyId,
        companyEmail: compInfo?.company?.companyEmail,
        token: compInfo?.token,
        role: compInfo?.role,
      })
      .then((res) => {
        setCompUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await axios.delete(`${baseURL}/users/${userId}`, {
        data: {
          companyId: compInfo?.company?.companyId,
          token: compInfo?.token,
          role: compInfo?.role,
        },
      });
      if (res.status !== 200) {
        throw new Error(`Failed to delete user with ID ${userId}`);
      }
      // Refresh the user list after deletion
      setPage(0);
      fetchUsers();
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const handleDeleteSelected = async () => {
    selected.forEach((userId) => {
      handleDeleteUser(userId);
    });
    setSelected([]);
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = compUsers.map((n) => n?.userId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, userId) => {
    const selectedIndex = selected.indexOf(userId);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleAddUser = async () => {
    // console.log(formState);
    /* console.log({
      companyId: compInfo?.company?.companyId,
      token: compInfo?.token,
      role: compInfo?.role,
      ...formState,
    }); */

    try {
      setError(null);
      if (
        !formState.fname ||
        !formState.lname ||
        !formState.email ||
        !formState.dob ||
        !formState.gender
      ) {
        throw new Error('Please fill all required fields');
      }

      if (!emailRegex.test(formState.email)) {
        throw new Error('Invalid email syntax');
      }

      const res = await axios.post(`${baseURL}/users/new`, {
        companyId: compInfo?.company?.companyId,
        token: compInfo?.token,
        role: compInfo?.role,
        ...formState,
      });
      setResponse(res.data);
    } catch (err) {
      setResponse(null);
      setError(err.message || 'An error occurred');
      console.log(err);
    }
  };

  const dataFiltered = applyFilter({
    inputData: compUsers,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        {compInfo?.role !== 'admin' && (
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setModalOpen(true)}
          >
            Verify A New User
          </Button>
        )}
        <Modal
          open={modalOpen && compInfo?.role !== 'admin'}
          onClose={() => {
            setModalOpen(false);
            setFormState({
              fname: '',
              lname: '',
              gender: 'M',
              dob: '01-01-2000',
              email: '',
            });
            setError(null);
            setResponse(null);

            fetchUsers();
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
              Verify A New User
            </Typography>
            <Typography variant="caption" sx={{ textAlign: 'center' }}>
              Add a new user that you want to verify his identity. The user will be notified by
              email to complete his verification process.
            </Typography>
            <TextField
              name="fname"
              label="First Name"
              value={formState.fname}
              onChange={(e) => setFormState({ ...formState, fname: e.target.value })}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              name="lname"
              label="Last Name"
              value={formState.lname}
              onChange={(e) => setFormState({ ...formState, lname: e.target.value })}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              id="genderselect"
              select
              label="Gender"
              value={formState.gender}
              onChange={(e) => setFormState({ ...formState, gender: e.target.value })}
              SelectProps={{
                native: true,
              }}
              fullWidth
              // helperText="Please select user gender"
              sx={{ mt: 2 }}
            >
              {genders.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Date of Birth"
                value={dayjs(formState.dob)}
                onChange={(newValue) => setFormState({ ...formState, dob: newValue })}
                format="DD-MM-YYYY"
                fullWidth
                sx={{ mt: 2 }}
              />
            </LocalizationProvider>

            <TextField
              name="email"
              label="Email address"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              fullWidth
              sx={{ my: 2 }}
            />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              onClick={handleAddUser}
            >
              Add User
            </LoadingButton>
            {error ? (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            ) : null}
            {response ? (
              <Alert severity="success" sx={{ mt: 2 }}>
                User Successfully Added Unique Registration Code: <b>{response.urc}</b>
              </Alert>
            ) : null}
          </Box>
        </Modal>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onDeleteSelected={handleDeleteSelected}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            {isLoading ? (
              <Box height="50%" width="100%" sx={{ alignContent: 'center' }}>
                <Skeleton sx={{ alignContent: 'center' }} />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            ) : (
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={compUsers.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'userId', label: 'User ID' },
                    { id: 'userFirstName', label: 'Name' },
                    { id: 'email', label: 'Email' }, // align: 'center'
                    { id: 'companyname', label: 'Company' },
                    { id: 'status', label: 'Status' },
                    { id: '' },
                  ]}
                />

                <TableBody>
                  {dataFiltered.length === 0 && filterName === '' && <TableNoData colSpan={6} />}
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row.userId}
                        userid={row.userId}
                        name={`${row.userFirstName} ${row.userLastName}`}
                        email={row.email}
                        status={row.status}
                        companyname={row.company.companyName}
                        companyId={row.companyId}
                        // avatarUrl={row.avatarUrl}
                        // isVerified={row.isVerified}
                        selected={selected.indexOf(row.userId) !== -1}
                        handleClick={(event) => handleClick(event, row.userId)}
                        onDelete={() => handleDeleteUser(row.userId)}
                        onCloseFetch={fetchUsers}
                      />
                    ))}
                  {/* <UserTableRow
                    key="1"
                    userid={39}
                    name="Farouk Benslimane"
                    email="itisbens@gmail.com"
                    status="Verified"
                    companyname="Banque Extérieure D’algérie"
                    companyId={1}
                    selected={selected.indexOf(39) !== -1}
                    handleClick={(event) => handleClick(event, 39)}
                    onDelete={() => handleDeleteUser(39)}
                    onCloseFetch={fetchUsers}
                  />
                  <UserTableRow
                    key="2"
                    userid={40}
                    name="Bahamida Mouheb"
                    email="mouhe.bmd@gmail.com"
                    status="Rejected"
                    companyname="Banque Extérieure D’algérie"
                    companyId={1}
                    selected={selected.indexOf(40) !== -1}
                    handleClick={(event) => handleClick(event, 40)}
                    onDelete={() => handleDeleteUser(40)}
                    onCloseFetch={fetchUsers}
                  />
                  <UserTableRow
                    key="3"
                    userid={41}
                    name="Amine Benmouhoub"
                    email="amine.benmouhob@gmail.com"
                    status="Resubmit"
                    companyname="Banque Extérieure D’algérie"
                    companyId={1}
                    selected={selected.indexOf(41) !== -1}
                    handleClick={(event) => handleClick(event, 41)}
                    onDelete={() => handleDeleteUser(41)}
                    onCloseFetch={fetchUsers}
                  />

                  <UserTableRow
                    key="4"
                    userid={42}
                    name="Henni Mohammed"
                    email="henni.mohamed@gmail.com"
                    status="Pending"
                    companyname="Banque Extérieure D’algérie"
                    companyId={1}
                    selected={selected.indexOf(42) !== -1}
                    handleClick={(event) => handleClick(event, 42)}
                    onDelete={() => handleDeleteUser(42)}
                    onCloseFetch={fetchUsers}
                  />

                  <UserTableRow
                    key="4"
                    userid={42}
                    name="Moussaoui Ahmed"
                    email="mous.ahmed@hotmail.com"
                    status="New"
                    companyname="Banque Extérieure D’algérie"
                    companyId={1}
                    selected={selected.indexOf(42) !== -1}
                    handleClick={(event) => handleClick(event, 42)}
                    onDelete={() => handleDeleteUser(42)}
                    onCloseFetch={fetchUsers}
                  /> */}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, compUsers.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={compUsers.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
