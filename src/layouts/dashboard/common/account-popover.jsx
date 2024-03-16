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

  const userinfo = useAuthUser() || {};

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
          alt={userinfo?.role === 'admin' ? 'Admin' : userinfo?.company.companyName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {userinfo?.role === 'admin'
            ? 'Admin'
            : userinfo?.company.companyName.charAt(0).toUpperCase()}

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
            {userinfo?.role === 'admin' ? 'Admin' : userinfo?.company.companyName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userinfo?.role === 'company' && userinfo?.company.companyEmail}
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

        {userinfo?.role === 'admin' ? null : (
          <>
            <MenuItem key={MENU_OPTIONS[1].label} onClick={handleClose}>
              <Iconify icon={MENU_OPTIONS[1].icon} width={16} height={16} sx={{ mr: 1 }} />
              {MENU_OPTIONS[1].label}
            </MenuItem>

            <MenuItem key={MENU_OPTIONS[2].label} onClick={handleClose}>
              <Iconify icon={MENU_OPTIONS[2].icon} width={16} height={16} sx={{ mr: 1 }} />
              {MENU_OPTIONS[2].label}
            </MenuItem>
          </>
        )}

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
