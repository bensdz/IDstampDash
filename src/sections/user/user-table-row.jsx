/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import UserInfoEdit from 'src/components/UserInfoEdit';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  companyname,
  companyId,
  status,
  handleClick,
  email,
  userid,
  onDelete,
  onCloseFetch,
}) {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const statusColors = {
    Rejected: 'error',
    Pending: 'info',
    Resubmit: 'warning',
    Verified: 'success',
    default: 'default',
  };

  const statusIcons = {
    Rejected: 'eva:close-circle-outline',
    Pending: 'eva:clock-outline',
    Resubmit: 'eva:repeat-outline',
    Verified: 'eva:checkmark-circle-2-outline',
    default: '',
  };
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleOpenDetails = () => {
    router.push(`/users/${userid}`);
  };
  const handleEditDetails = () => {
    setModal(true);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell onClick={handleOpenDetails}>
          <Typography>{userid}</Typography>
        </TableCell>

        <TableCell component="th" scope="row" padding="none" onClick={handleOpenDetails}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} /> */}
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell onClick={handleOpenDetails}>{email}</TableCell>
        <TableCell>{companyname}</TableCell>

        <TableCell>
          <Label color={statusColors[status] || statusColors.default}>
            <Iconify icon={statusIcons[status] || statusIcons.default} sx={{ pr: 0.5 }} /> {status}
          </Label>
        </TableCell>

        <TableCell align="right">
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
        <MenuItem onClick={handleOpenDetails}>
          <Iconify icon="ep:view" sx={{ mr: 1 }} />
          View
        </MenuItem>
        <MenuItem onClick={handleEditDetails}>
          <Iconify icon="ep:edit" sx={{ mr: 1 }} />
          Edit Details
        </MenuItem>

        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 1 }} />
          Delete
        </MenuItem>

        <UserInfoEdit
          userid={userid}
          modalOpen={modal}
          onModalChange={setModal}
          onCloseFetch={onCloseFetch}
        />
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  companyname: PropTypes.any,
  companyId: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  email: PropTypes.string,
  userid: PropTypes.any,
  onDelete: PropTypes.func,
  onCloseFetch: PropTypes.func,
};
