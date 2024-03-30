import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CompanyInfoEdit from 'src/components/CompanyInfoEdit';

// ----------------------------------------------------------------------

export default function CompaniesTableRow({
  companyId,
  name,
  email,
  address,
  willaya,
  commune,
  userCount,
  selected,
  handleClick,
  onDelete,
  onFetchComp,
}) {
  const [open, setOpen] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{companyId}</TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} />  */}
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{`${address}, ${commune}, ${willaya}`}</TableCell>

        <TableCell>{userCount}</TableCell>

        {/* <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
  </TableCell> */}

        <TableCell>
          {/* align="right" */}
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => setModalOpen(true)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <CompanyInfoEdit
        company={{
          companyId,
          companyName: name,
          companyEmail: email,
          companyAddress: address,
          companyWillaya: willaya,
          companyCommune: commune,
        }}
        modalOpen={modalOpen}
        onModalChange={() => {
          setModalOpen(!modalOpen);
          onFetchComp();
        }}
      />
    </>
  );
}

CompaniesTableRow.propTypes = {
  companyId: PropTypes.any,
  name: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.string,
  willaya: PropTypes.string,
  commune: PropTypes.string,
  userCount: PropTypes.number,
  selected: PropTypes.bool,
  handleClick: PropTypes.func,
  onDelete: PropTypes.func,
  onFetchComp: PropTypes.func,
};
