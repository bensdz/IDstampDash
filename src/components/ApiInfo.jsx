import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, TextField, Typography, Box, InputAdornment, IconButton } from '@mui/material';
import PropTypes from 'prop-types';

import Iconify from './iconify';

function ApiInfo({ modal, onModalChange, api, apikey }) {
  const [showKey, setShowKey] = useState(false);

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

  return (
    <Modal
      open={modal}
      onClose={() => {
        onModalChange(!modal);
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
          onClick={() => onModalChange(!modal)}
        />
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          Api Integration:
        </Typography>

        <Typography variant="body2" gutterBottom sx={{ textAlign: 'center' }}>
          Use the following APIs to integrate with your system. Read the documentation for more
          information. <NavLink to="/docs">Documentation</NavLink>
        </Typography>

        <TextField
          // id="outlined-basic"
          name="api1"
          label="POST: Get All Users Informations"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={api[0]}
        />

        <TextField
          name="api2"
          label="GET: Get User Details By ID"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={api[1]}
        />

        <TextField
          // id="outlined-basic"
          name="api3"
          label="POST: Add New User To Be Verified"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={api[2]}
        />

        <TextField
          // id="outlined-basic"
          name="api4"
          label="POST: Change User Status"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={api[3]}
        />

        <TextField
          id="outlined-basic"
          name="apikey"
          label="Your Api Key"
          type={showKey ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={apikey}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <Iconify icon="mingcute:copy-fill" />
                </IconButton>
                <IconButton onClick={() => setShowKey(!showKey)} edge="end">
                  <Iconify icon={showKey ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Modal>
  );
}

ApiInfo.propTypes = {
  modal: PropTypes.bool,
  onModalChange: PropTypes.func,
  api: PropTypes.array,
  apikey: PropTypes.string,
};

export default ApiInfo;
