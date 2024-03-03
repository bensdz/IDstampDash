/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

function HistoryItem({ status, date }) {
  return (
    <ListItem>
      <ListItemAvatar>
        {status === 'Declined' ? (
          <CancelIcon fontSize="large" sx={{ color: '#7C0A02' }} />
        ) : status === 'Accepted' ? (
          <CheckCircleIcon fontSize="large" sx={{ color: '#006400' }} />
        ) : (
          <ReplayCircleFilledIcon fontSize="large" sx={{ color: '#6699CC' }} />
        )}
      </ListItemAvatar>
      <ListItemText primary={status} secondary={date} />
    </ListItem>
  );
}

export default HistoryItem;

HistoryItem.propTypes = {
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
