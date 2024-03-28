/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { Collapse, ListItem, ListItemText, ListItemAvatar, Grid, Divider } from '@mui/material';
import { useState } from 'react';
import Iconify from './iconify';
import DocumentDetails from './DocumentDetails';
import FraudDetails from './FraudDetails';
import { Gallery } from './Gallery';

function HistoryItem({ submission, current }) {
  const { status, dateSubmitted } = submission;
  const [open, setOpen] = useState(false);

  const submissionIconsandColors = {
    Rejected: { icon: 'fluent:text-change-reject-20-filled', color: '#D24545' },
    Verified: { icon: 'solar:diploma-verified-bold', color: '#0D9276' },
    Pending: { icon: 'ic:twotone-pending-actions', color: '#3652AD' },
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemAvatar>
          <Iconify
            icon={submissionIconsandColors[status]?.icon || submissionIconsandColors.default.icon}
            color={
              submissionIconsandColors[status]?.color || submissionIconsandColors.default.color
            }
            width={38}
            height={38}
          />
        </ListItemAvatar>
        <ListItemText
          primary={`${status} ${current ? '(current)' : ''}`}
          secondary={`${dateSubmitted?.substring(0, 10)} ${submission?.note ? `Note: ${submission?.note}` : ''}`}
        />
      </ListItem>
      {current ? null : (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Grid container spacing={2} sx={{ p: 5 }}>
            <Grid item xs={12} sm={6}>
              <DocumentDetails doc={submission?.document} />

              <Divider sx={{ my: 2 }} variant="middle" />

              <FraudDetails verif={submission?.verif} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Gallery
                imgs={[
                  submission?.frontImageLink,
                  submission?.backImageLink && submission?.backImageLink,
                  submission?.faceImageLink,
                ]}
              />
            </Grid>
          </Grid>
        </Collapse>
      )}
    </>
  );
}

export default HistoryItem;

HistoryItem.propTypes = {
  submission: PropTypes.object.isRequired,
  current: PropTypes.bool.isRequired,
};
