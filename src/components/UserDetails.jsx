import { Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import Label from './label';

function UserDetails({ userinfo }) {
  const statusColors = {
    Rejected: 'error',
    Pending: 'info',
    Resubmit: 'warning',
    Verified: 'success',
    default: 'default',
  };
  return (
    <>
      <Label color={statusColors[userinfo?.status] || statusColors.default} sx={{ my: 2 }}>
        {userinfo?.status}
      </Label>
      <Typography variant="h5">User details:</Typography>
      <Grid container sx={{ my: 2 }}>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            First name:
          </Typography>
          <Typography variant="subtitle1" component="p">
            {userinfo?.userFirstName}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            Last name:
          </Typography>
          <Typography variant="subtitle1" component="p">
            {userinfo?.userLastName}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            Email
          </Typography>
          <Typography variant="subtitle1" component="p">
            {userinfo?.email}
          </Typography>
        </Grid>
      </Grid>

      <Grid container sx={{ my: 3 }}>
        <Grid item xs={6}>
          <Typography variant="body1" component="p">
            Date of Birth:
          </Typography>
          <Typography variant="subtitle1" component="p">
            {userinfo?.userDateOfBirth?.substring(0, 10)}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body1" component="p">
            Gender:
          </Typography>
          <Typography variant="subtitle1" component="p">
            {userinfo?.userGender === 'M' ? 'Male' : 'Female'}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

UserDetails.propTypes = {
  userinfo: PropTypes.object,
};

export default UserDetails;
