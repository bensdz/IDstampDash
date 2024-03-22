import { useState } from 'react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';

import { useRouter } from 'src/routes/hooks';
import { Modal, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Api integration',
    icon: 'dashicons:rest-api',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const signOut = useSignOut();
  const router = useRouter();

  const compInfo = useAuthUser() || {};

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    signOut();
    router.push('/login');
  };

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

  const renderModal = () => (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={style}>
        <Iconify
          icon="mingcute:close-fill"
          width={20}
          height={20}
          sx={{
            aligncontent: 'flex-end',
            cursor: 'pointer',
            float: 'right',
            mb: 2,
          }}
          onClick={() => setModalOpen(false)}
        />
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          Profile Information:
        </Typography>
        <TextField
          id="outlined-basic"
          name="companyName"
          label="Company Name"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={compInfo?.company?.companyName}
        />
        <TextField
          id="outlined-basic"
          name="companyEmail"
          label="Company Email"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={compInfo?.company?.companyEmail}
        />
        <TextField
          id="outlined-basic"
          name="companyAddress"
          label="Company Address"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={compInfo?.company?.companyAddress}
        />
        <TextField
          id="outlined-basic"
          name="companyWillaya"
          label="Company Willaya"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={compInfo?.company?.companyWillaya}
        />
        <TextField
          id="outlined-basic"
          name="companyCommune"
          label="Company City/Commune"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={compInfo?.company?.companyCommune}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          sx={{ mt: 3 }}
          onClick={() => console.log('clicked')}
        >
          Update Details
        </LoadingButton>
      </Box>
    </Modal>
  );

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src="/assets/icons/user.png"
          alt={compInfo && compInfo?.role === 'admin' ? 'Admin' : compInfo?.company?.companyName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {compInfo?.role === 'admin'
            ? 'Admin'
            : compInfo?.company?.companyName.charAt(0).toUpperCase()}

          {/* account.displayName.charAt(0).toUpperCase() */}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {compInfo && compInfo?.role === 'admin' ? 'Admin' : compInfo?.company?.companyName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {compInfo && compInfo?.role === 'company' && compInfo?.company.companyEmail}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem
          key={MENU_OPTIONS[0].label}
          onClick={() => {
            setOpen(null);
            router.push('/');
          }}
        >
          <Iconify icon={MENU_OPTIONS[0].icon} width={16} height={16} sx={{ mr: 1 }} />
          {MENU_OPTIONS[0].label}
        </MenuItem>

        {compInfo && compInfo?.role === 'admin' ? null : (
          <>
            <MenuItem key={MENU_OPTIONS[1].label} onClick={() => setModalOpen(true)}>
              <Iconify icon={MENU_OPTIONS[1].icon} width={16} height={16} sx={{ mr: 1 }} />
              {MENU_OPTIONS[1].label}
            </MenuItem>

            <MenuItem key={MENU_OPTIONS[2].label} onClick={handleClose}>
              <Iconify icon={MENU_OPTIONS[2].icon} width={16} height={16} sx={{ mr: 1 }} />
              {MENU_OPTIONS[2].label}
            </MenuItem>
          </>
        )}
        {renderModal()}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          <Iconify icon="eva:log-out-fill" width={16} height={16} sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
