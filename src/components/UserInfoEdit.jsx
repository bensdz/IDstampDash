import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Modal, TextField, Typography } from '@mui/material';

import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { baseURL } from '../../apiconfig';

function UserInfoEdit({ userid, modalOpen, onModalChange, onCloseFetch }) {
  const authUser = useAuthUser();
  const [response, setResponse] = useState(null);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [formState, setFormState] = useState({
    fname: response?.fname || '',
    lname: response?.lname || '',
    gender: response?.gender || '',
    dob: response?.dob || dayjs(),
    email: response?.email || '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [success, setSuccess] = useState(false);

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
    backdropFilter: isLoading ? 'blur(8px)' : null,
  };

  const genders = [
    {
      value: 'M',
      label: 'Male',
    },
    {
      value: 'F',
      label: 'Female',
    },
  ];

  const handleUpdate = async () => {
    try {
      setError(null);
      if (
        !formState.fname ||
        !formState.lname ||
        !formState.dob ||
        !formState.gender ||
        !formState.email
      ) {
        throw new Error('All fields are required');
      }
      if (!emailRegex.test(formState.email)) {
        throw new Error('Invalid email address');
      }
      setIsLoading(true);
      await axios.put(`${baseURL}/users/${userid}`, {
        token: authUser?.token,
        role: authUser?.role,
        companyId: authUser.company ? authUser.company.companyId : null,
        fname: formState.fname,
        lname: formState.lname,
        gender: formState.gender,
        dob: formState.dob,
        email: formState.email,
      });
      setIsLoading(false);
      setSuccess(true);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'An error occurred');
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post(`${baseURL}/users/details/${userid}`, {
          token: authUser?.token,
          role: authUser?.role,
          companyId: authUser?.company?.companyId,
        });
        setFormState((prev) => ({
          ...prev,
          fname: res.data.userFirstName,
          lname: res.data.userLastName,
          dob: res.data.userDateOfBirth,
          gender: res.data.userGender,
          email: res.data.email,
        }));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (modalOpen) {
      fetchData();
    }
  }, [authUser?.company?.companyId, authUser?.role, authUser?.token, modalOpen, userid]);

  // const handleChange = (_, newValue) => {
  //   setFormState((prev) => ({
  //     ...prev,
  //     dlRequired: newValue.includes('DL'),
  //     passportRequired: newValue.includes('Passport'),
  //     idRequired: newValue.includes('ID'),
  //   }));
  // };

  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        onModalChange(false);
        setResponse(null);
        onCloseFetch();
      }}
      aria-labelledby="simple-modal"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          Edit User Info
        </Typography>
        <TextField
          name="fname"
          label="First Name"
          value={formState.fname}
          onChange={(e) => setFormState({ ...formState, fname: e.target.value })}
          fullWidth
          disabled={isLoading}
          sx={{ mt: 2 }}
        />
        <TextField
          name="lname"
          label="Last Name"
          value={formState.lname}
          onChange={(e) => setFormState({ ...formState, lname: e.target.value })}
          fullWidth
          disabled={isLoading}
          sx={{ mt: 2 }}
        />
        <TextField
          id="genderselect"
          select
          label="Gender"
          value={formState.gender}
          onChange={(e) => setFormState({ ...formState, gender: e.target.value })}
          SelectProps={{
            native: true,
          }}
          fullWidth
          disabled={isLoading}
          // helperText="Please select user gender"
          sx={{ mt: 2 }}
        >
          {genders.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            label="Date of Birth"
            value={dayjs(formState.dob)}
            onChange={(newValue) => setFormState({ ...formState, dob: newValue })}
            format="DD-MM-YYYY"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 2 }}
          />
        </LocalizationProvider>

        <TextField
          name="email"
          label="Email address"
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          fullWidth
          disabled={isLoading}
          sx={{ my: 2 }}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          disabled={isLoading}
          onClick={handleUpdate}
        >
          Update Details
        </LoadingButton>
        {error ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        ) : null}
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            User Informations Successfully Edited
          </Alert>
        )}
      </Box>
    </Modal>
  );
}

UserInfoEdit.propTypes = {
  userid: PropTypes.any,
  modalOpen: PropTypes.bool,
  onModalChange: PropTypes.func,
  onCloseFetch: PropTypes.func,
};

export default UserInfoEdit;
