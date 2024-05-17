import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Card,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  alpha,
} from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify';

import Logo from 'src/components/logo';
// import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import { baseURL } from '../../../apiconfig';

export default function ResetPwView() {
  const theme = useTheme();
  // const router = useRouter();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [codeValid, setCodeValid] = useState(false);
  const [pwMatch, setPwMatch] = useState(true);

  const [formState, setFormState] = useState({
    pw: '',
    pw2: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const email = searchParams.get('email');
  const code = searchParams.get('code');

  const checkCode = useCallback(async () => {
    try {
      await axios.post(`${baseURL}/companies/reset/check`, { email, code }).catch((err) => {
        if (err.response?.status === 500) throw new Error('Internal Server Error');
        else throw new Error('Invalid code');
      });
      setError(null);
      setCodeValid(true);
    } catch (err) {
      setError(err.message);
      setCodeValid(false);
      // timeout to show error message
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      // navigate('/login');
    }
  }, [email, code, navigate]);

  useEffect(() => {
    if (formState.pw2 !== '') setPwMatch(formState.pw === formState.pw2);
    checkCode();
  }, [checkCode, formState.pw, formState.pw2]);

  const handleSubmit = async () => {
    try {
      await axios
        .post(`${baseURL}/companies/reset/change`, {
          email,
          password: formState.pw,
          code,
        })
        .catch((err) => {
          if (err.response?.status === 500) throw new Error('Internal Server Error');
          else throw new Error('Unable to reset password');
        });
      setError(null);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

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
          <Typography variant="h4">Reset Your Password</Typography>

          <Typography variant="body2" sx={{ my: 2 }}>
            <Link
              variant="subtitle2"
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
            >
              Get back to login
            </Link>
          </Typography>
          <Stack spacing={2} sx={{ mb: 2 }}>
            {codeValid && (
              <>
                <TextField
                  name="pw"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formState.pw}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setFormState({ ...formState, pw: e.target.value });
                    setPwMatch(formState.pw === formState.pw2);
                  }}
                />
                <TextField
                  name="pw2"
                  label="Confirm Password"
                  type={showPassword2 ? 'text' : 'password'}
                  value={formState.pw2}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
                          <Iconify icon={showPassword2 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setFormState({ ...formState, pw2: e.target.value });
                    setPwMatch(formState.pw === formState.pw2);
                  }}
                />
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="inherit"
                  onClick={handleSubmit}
                >
                  Set New Password
                </LoadingButton>
                {!pwMatch && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    Passwords do not match
                  </Alert>
                )}
              </>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Password reset successfully
              </Alert>
            )}
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
