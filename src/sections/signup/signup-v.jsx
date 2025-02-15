/* eslint-disable import/no-extraneous-dependencies */
import axios, { AxiosError } from 'axios';
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
import { Alert, MenuItem } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { willayas } from 'src/utils/willayas';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { baseURL } from '../../../apiconfig';

// ----------------------------------------------------------------------

export default function SignupView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const signIn = useSignIn();

  const [error, setError] = useState(null);

  const [formState, setFormState] = useState({
    name: '',
    address: '',
    willaya: '',
    commune: '',
    email: '',
    password: '',
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // const [addressSuggestions, setAdresseSuggestions] = useState([]);

  // const fetchAdresseSuggestions = async (adresse) => {
  //   try {
  //     const response = await axios.get(
  //       `https://nominatim.openstreetmap.org/search?q=${formState.address}&format=json`
  //     );
  //     setAdresseSuggestions(response.data);
  //   } catch (err) {
  //     console.error("Erreur lors de la récupération des suggestions d'adresse :", err);
  //   }
  // };
  // console.log(addressSuggestions);

  const handleSubmit = async () => {
    let res;
    try {
      if (!formState.email || !formState.password || !formState.name || !formState.address) {
        throw new Error('All fields are required');
      }
      if (!emailRegex.test(formState.email)) {
        throw new Error('Invalid email address');
      }
      res = await axios.post(`${baseURL}/companies/new`, formState).catch((err) => {
        if (err.response?.status === 400) throw new Error('Company already exists');
        else if (err.response?.status === 500) throw new Error('Internal Server Error');
        else throw new Error('Unable to login');
      });

      const { token, company, role, auth } = res.data;
      if (auth) {
        signIn({
          auth: {
            token,
            expiresIn: 86400,
            tokenType: 'Bearer',
          },
          userState: {
            role,
            company,
            token,
          },
        });
        router.push('/');
      }
    } catch (err) {
      if (err && err instanceof AxiosError) setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);
    }
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
          onChange={(e) => {
            // fetchAdresseSuggestions(formState.address);
            setFormState({ ...formState, address: e.target.value });
          }}
        />

        <TextField
          name="willaya"
          label="Willaya"
          value={formState.willaya}
          onChange={(e) => setFormState({ ...formState, willaya: e.target.value })}
          select
        >
          {willayas.map((willaya) => (
            <MenuItem key={willaya.id} value={willaya.name}>
              {willaya.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="commune"
          label="Commune"
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
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
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
