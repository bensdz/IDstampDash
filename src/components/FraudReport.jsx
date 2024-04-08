/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
import { Alert, Box, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Iconify from './iconify';

function FraudReport({ open, onClose, verif }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 820,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={style}>
        <Iconify
          icon="mingcute:close-fill"
          width={20}
          height={20}
          sx={{ aligncontent: 'flex-end', cursor: 'pointer', float: 'right', mb: 2 }}
          onClick={() => onClose(false)}
        />
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          Fraud Report:
        </Typography>

        <Alert severity={verif?.compareFaces <= 0.7 ? 'error' : 'info'} sx={{ my: 2 }}>
          Face match:
          {verif?.compareFaces === 0
            ? ' No face detected'
            : verif?.compareFaces <= 0.7
              ? ` below 70% (${Math.round(verif?.compareFaces * 10000) / 100}%)`
              : ` ${Math.round(verif?.compareFaces * 100) / 100}%`}
        </Alert>

        <Alert severity={verif?.mRZValid ? 'info' : 'error'} sx={{ my: 2 }}>
          {verif?.mRZValid ? `MRZ code is valid` : `Invalid MRZ code`}
        </Alert>

        <Alert severity={verif?.compareMRZ <= 70 ? 'error' : 'info'} sx={{ my: 2 }}>
          MRZ information:
          {verif?.compareMRZ <= 70
            ? ` MRZ information does not match (${verif?.compareMRZ}%)`
            : ` MRZ information matches (${verif?.compareMRZ}%)`}
        </Alert>

        <Alert severity={verif?.compareAge <= 70 ? 'error' : 'info'} sx={{ my: 2 }}>
          Age match:
          {verif?.compareAge <= 70
            ? ` Age match is below 70% (${Math.round(verif?.compareAge * 10) / 10}%) \n Age guessed: ${Math.round(verif?.guessedAge * 10) / 10}`
            : ` Age match is above 70% (${verif?.compareAge}%)`}
        </Alert>

        <Alert severity={verif?.compareGender === false ? 'error' : 'info'} sx={{ my: 2 }}>
          {verif?.compareGender ? `Gender matches` : `Gender does not match`}
        </Alert>
      </Box>
    </Modal>
  );
}

FraudReport.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  verif: PropTypes.object,
};

export default FraudReport;
