/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';

// import { CancelIcon as CancelIc } from '@mui/icons-material/Cancel';
// import { CheckCircleIcon as CheckCircleIc } from '@mui/icons-material/CheckCircle';
import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';
// import { ReplayCircleFilledIcon as ReplayCircleFilledIc } from '@mui/icons-material/ReplayCircleFilled';
import Iconify from 'src/components/iconify';

function HistoryItem({ status, date }) {
  return (
    <ListItem>
      <ListItemAvatar>
        {status === 'Declined' ? (
          <Iconify icon="zondicons:close-solid" width={35} height={35} color="#D24545" />
        ) : status === 'Accepted' ? (
          <Iconify icon="icon-park-solid:check-one" width={38} height={38} color="#0D9276" />
        ) : (
          <Iconify
            icon="pepicons-pop:repeat-circle-filled"
            width={35}
            height={35}
            color="#3652AD"
          />
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
