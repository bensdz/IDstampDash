import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import { LoadingButton } from '@mui/lab';
import { Alert, Box, Modal, TextField, Typography } from '@mui/material';
import Iconify from './iconify';

function CompanyInfoEdit({ company, modalOpen, onModalChange }) {
  const [formState, setFormState] = useState({
    companyName: company?.companyName,
    companyEmail: company?.companyEmail,
    companyAddress: company?.companyAddress,
    companyWillaya: company?.companyWillaya,
    companyCommune: company?.companyCommune,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const authUser = useAuthUser();

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(`http://localhost:3000/api/companies/${company.companyId}`, {
        token: authUser?.token,
        role: authUser?.role,
        name: formState.companyName,
        address: formState.companyAddress,
        willaya: formState.companyWillaya,
        commune: formState.companyCommune,
        email: formState.companyEmail,
      });
      setFormState({
        companyName: response.data.companyName,
        companyEmail: response.data.companyEmail,
        companyAddress: response.data.companyAddress,
        companyWillaya: response.data.companyWillaya,
        companyCommune: response.data.companyCommune,
      });
      setIsLoading(false);
      setSuccess(true);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'An error occurred');
      console.error(err);
    }
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        onModalChange(!modalOpen);
        setSuccess(false);
        setError(null);
      }}
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
          onClick={() => onModalChange(!modalOpen)}
        />
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          Company Information:
        </Typography>
        <TextField
          id="outlined-basic"
          name="companyName"
          label="Company Name"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={formState.companyName}
          onChange={(e) => setFormState({ ...formState, companyName: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          name="companyEmail"
          label="Company Email"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={formState.companyEmail}
          onChange={(e) => setFormState({ ...formState, companyEmail: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          name="companyAddress"
          label="Company Address"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={formState.companyAddress}
          onChange={(e) => setFormState({ ...formState, companyAddress: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          name="companyWillaya"
          label="Company Willaya"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={formState.companyWillaya}
          onChange={(e) => setFormState({ ...formState, companyWillaya: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          name="companyCommune"
          label="Company City/Commune"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={formState.companyCommune}
          onChange={(e) => setFormState({ ...formState, companyCommune: e.target.value })}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          sx={{ mt: 3 }}
          onClick={handleUpdate}
          disabled={isLoading}
        >
          Update Details
        </LoadingButton>
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Company details updated successfully
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Modal>
  );
}

CompanyInfoEdit.propTypes = {
  company: PropTypes.object,
  modalOpen: PropTypes.bool,
  onModalChange: PropTypes.func,
};

export default CompanyInfoEdit;
