import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import { willayas } from 'src/utils/willayas';
import { LoadingButton } from '@mui/lab';
import { Alert, Autocomplete, Box, MenuItem, Modal, TextField, Typography } from '@mui/material';
import Iconify from './iconify';
import { baseURL } from '../../apiconfig';

function CompanyInfoEdit({ company, modalOpen, onModalChange }) {
  const [formState, setFormState] = useState({
    companyName: company?.companyName,
    companyEmail: company?.companyEmail,
    companyAddress: company?.companyAddress,
    companyWillaya: company?.companyWillaya,
    companyCommune: company?.companyCommune,
    dlRequired: company?.dlRequired ? company?.dlRequired : true,
    passportRequired: company?.passportRequired ? company?.passportRequired : true,
    idRequired: company?.idRequired ? company?.idRequired : true,
  });
  const [docsRequired, setDocsRequired] = useState(
    [
      formState?.dlRequired ? 'DL' : null,
      formState?.passportRequired ? 'Passport' : null,
      formState?.idRequired ? 'ID' : null,
    ].filter(Boolean)
  );
  const options = ['DL', 'Passport', 'ID'];

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
      const response = await axios.put(`${baseURL}/companies/${company.companyId}`, {
        token: authUser?.token,
        role: authUser?.role,
        name: formState.companyName,
        address: formState.companyAddress,
        willaya: formState.companyWillaya,
        commune: formState.companyCommune,
        email: formState.companyEmail,
        docsRequired,
        dl: formState.dlRequired,
        passport: formState.passportRequired,
        id: formState.idRequired,
      });

      if (authUser?.company && authUser?.role !== 'admin') {
        Cookies.set(
          '_auth_state',
          JSON.stringify({
            token: authUser.token,
            role: authUser.role,
            company: response.data.company,
          }),
          { path: '/' }
        );
      }

      setIsLoading(false);
      setSuccess(true);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'An error occurred');
      console.error(err);
    }
  };

  const handleChange = (_, newValue) => {
    setDocsRequired(newValue);
    setFormState((prev) => ({
      ...prev,
      dlRequired: newValue.includes('DL'),
      passportRequired: newValue.includes('Passport'),
      idRequired: newValue.includes('ID'),
    }));
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
          select
        >
          {willayas.map((willaya) => (
            <MenuItem key={willaya.id} value={willaya.name}>
              {willaya.name}
            </MenuItem>
          ))}
        </TextField>
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
        <Autocomplete
          multiple
          sx={{ mt: 3 }}
          id="docs-required"
          options={options}
          getOptionLabel={(option) => option}
          value={docsRequired}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Required Identity Documents"
              placeholder="Select documents"
            />
          )}
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
