import { useState } from 'react';
import PropTypes from 'prop-types';

import { LoadingButton } from '@mui/lab';
import { Box, Modal, TextField, Typography } from '@mui/material';
import Iconify from './iconify';

function CompanyInfoEdit({ company, modalOpen, onModalChange }) {
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

  const [formState, setFormState] = useState({
    companyName: company?.companyName,
    companyEmail: company?.companyEmail,
    companyAddress: company?.companyAddress,
    companyWillaya: company?.companyWillaya,
    companyCommune: company?.companyCommune,
  });

  return (
    <Modal
      open={modalOpen}
      onClose={() => onModalChange(!modalOpen)}
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
          onClick={() => console.log('clicked')}
        >
          Update Details
        </LoadingButton>
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
