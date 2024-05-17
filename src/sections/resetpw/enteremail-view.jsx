import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Card, Stack, TextField, Typography, alpha } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from 'src/components/logo';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import { baseURL } from '../../../apiconfig';

function EnterEmail() {
  const theme = useTheme();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      await axios.post(`${baseURL}/companies/reset`, { email }).catch((err) => {
        if (err.response?.status === 500) throw new Error('Internal Server Error');
        else throw new Error('Unable to send email');
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
            <Link variant="subtitle2" onClick={(e) => router.back()}>
              Get back to login
            </Link>
          </Typography>
          <Stack spacing={2} sx={{ mb: 2 }}>
            <TextField
              name="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              onClick={handleSubmit}
            >
              Reset
            </LoadingButton>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Please check your email for further instructions
              </Alert>
            )}
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}

export default EnterEmail;
