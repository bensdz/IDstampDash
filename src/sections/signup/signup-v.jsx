/* eslint-disable import/no-extraneous-dependencies */
// import axios from 'axios';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function SignupView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    address: '',
    willaya: '',
    commune: '',
    email: '',
    password: '',
  });

  const handleSubmit = () => {
    // console.log(formState);
    /* axios.post('http://localhost:3000/api/companies', formState).then((res) => {
      console.log(res);
    }); */
    // router.push('/dashboard');
  };

  const renderForm = (
    <>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <TextField
          name="name"
          label="Company Name"
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        />
        <TextField
          name="address"
          label="Address"
          value={formState.address}
          onChange={(e) => setFormState({ ...formState, address: e.target.value })}
        />
        <TextField
          name="willaya"
          label="Willaya"
          value={formState.willaya}
          onChange={(e) => setFormState({ ...formState, willaya: e.target.value })}
        />
        <TextField
          name="commune"
          label="City"
          value={formState.commune}
          onChange={(e) => setFormState({ ...formState, commune: e.target.value })}
        />
        <TextField
          name="email"
          label="Email address"
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
        />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formState.password}
          onChange={(e) => setFormState({ ...formState, password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit}
      >
        Sign Up
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 520,
          }}
        >
          <Typography variant="h4">Sign Up to IDStamp</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Do you have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={() => router.push('/login')}>
              Get back to login
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
