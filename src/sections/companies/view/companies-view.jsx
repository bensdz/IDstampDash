import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import { Box, Skeleton } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import CompaniesTableRow from '../companies-table-row';
import CompaniesTableHead from '../companies-table-head';
import CompaniesTableToolbar from '../companies-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function CompaniesPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const admin = useAuthUser() || {};
  const [comps, setComps] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = comps.map((n) => n.companyId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleDeleteCompany = async (companyId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/companies/${companyId}`, {
        data: {
          token: admin?.token,
          role: admin?.role,
        },
      });
      if (res.status !== 200) {
        throw new Error(`Failed to delete user with ID ${companyId}`);
      }
      // Refresh the user list after deletion
      fetchComps();
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const handleDeleteSelected = async () => {
    selected.forEach((companyId) => {
      handleDeleteCompany(companyId);
    });
    setSelected([]);
  };

  const dataFiltered = applyFilter({
    inputData: comps,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const fetchComps = useCallback(async () => {
    setIsLoading(true);
    axios
      .post('http://localhost:3000/api/companies', {
        token: admin?.token,
        role: admin?.role,
      })
      .then((res) => {
        // console.log(res.data);
        setComps(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [admin?.token, admin?.role]);

  useEffect(() => {
    fetchComps();
  }, [fetchComps]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Companies</Typography>

        {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
  </Button> */}
      </Stack>

      <Card>
        <CompaniesTableToolbar
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
                <CompaniesTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={comps.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'companyId', label: 'Company ID' },
                    { id: 'companyName', label: 'Company Name' },
                    { id: 'companyEmail', label: 'Email' },
                    { id: 'address', label: 'Address' },
                    { id: 'users', label: 'N° of users' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <CompaniesTableRow
                        key={row.companyId}
                        companyId={row.companyId}
                        name={row.companyName}
                        email={row.companyEmail}
                        address={row.companyAddress}
                        commune={row.companyCommune}
                        willaya={row.companyWillaya}
                        userCount={row.users.length}
                        selected={selected.indexOf(row.companyId) !== -1}
                        handleClick={(event) => handleClick(event, row.companyId)}
                        onDelete={() => handleDeleteCompany(row.companyId)}
                        onFetchComp={() => fetchComps()}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, comps.length)}
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
          count={comps.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
