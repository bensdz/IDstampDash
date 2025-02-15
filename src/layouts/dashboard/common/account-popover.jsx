import { useEffect, useState } from 'react';
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
import CompanyInfoEdit from 'src/components/CompanyInfoEdit';
import ApiInfo from 'src/components/ApiInfo';
import axios from 'axios';
import { baseURL } from '../../../../apiconfig';

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
  const [modal, setModal] = useState(false);

  const [apikey, setApiKey] = useState('');

  useEffect(() => {
    if (compInfo?.company?.companyId)
      axios
        .post(`${baseURL}/endpoints/key/${compInfo?.company?.companyId}`, {
          token: compInfo?.token,
        })
        .then((res) => {
          setApiKey(res.data.key);
        });
  }, [compInfo?.company?.companyId, compInfo.companyId, compInfo?.token]);

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

            <MenuItem key={MENU_OPTIONS[2].label} onClick={() => setModal(true)}>
              <Iconify icon={MENU_OPTIONS[2].icon} width={16} height={16} sx={{ mr: 1 }} />
              {MENU_OPTIONS[2].label}
            </MenuItem>
          </>
        )}
        <CompanyInfoEdit
          company={compInfo.company}
          modalOpen={modalOpen}
          onModalChange={setModalOpen}
        />

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
        <ApiInfo
          modal={modal}
          onModalChange={setModal}
          api={[
            `${baseURL}/endpoints/users`,
            `${baseURL}/endpoints/user`,
            `${baseURL}/endpoints/new`,
            `${baseURL}/endpoints/update`,
            `${baseURL}/endpoints/delete`,
          ]}
          apikey={apikey}
        />
      </Popover>
    </>
  );
}
