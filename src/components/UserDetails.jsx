/* eslint-disable no-nested-ternary */
// import { useState } from 'react';
import { Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import Label from './label';
import Iconify from './iconify';

function UserDetails({ userinfo, fraudScore, docinfo }) {
  const statusColors = {
    Rejected: 'error',
    Pending: 'info',
    Resubmit: 'warning',
    Verified: 'success',
    default: 'default',
  };

  // add a day to the date to match the format
  let bday;
  const dob = userinfo?.userDateOfBirth;
  if (dob) {
    const date = new Date(dob);
    date.setUTCDate(date.getUTCDate() + 1);
    bday = date.toISOString();
  }
  // console.log(docinfo);
  // const [pop1Open, setPop1Open] = useState(false);
  // const [pop2Open, setPop2Open] = useState(false);
  // const [pop3Open, setPop3Open] = useState(false);

  return (
    <>
      <Label color={statusColors[userinfo?.status] || statusColors.default} sx={{ my: 2 }}>
        {userinfo?.status}
      </Label>
      {fraudScore && (
        <Label
          color={fraudScore > 0.8 ? 'error' : fraudScore > 0.3 ? 'warning' : 'info'}
          sx={{ my: 2, mx: 1 }}
        >
          {fraudScore >= 0.7
            ? 'High Risk User'
            : fraudScore > 0.3
              ? 'Medium Risk User'
              : 'Low Risk User'}
        </Label>
      )}
      <Typography variant="h5">User details:</Typography>
      <Grid container sx={{ my: 2 }}>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            First name:
          </Typography>
          <Typography variant="subtitle1" component="p">
            {userinfo?.userFirstName}
            {docinfo?.firstname &&
              docinfo?.firstname?.toUpperCase().replace(' ', '') !==
                userinfo?.userFirstName?.toUpperCase().replace(' ', '') && (
                <Iconify
                  icon="material-symbols:info-outline"
                  color="warning"
                  sx={{
                    ml: 1,
                    pt: 1.25,
                    color: '	#bb2124',
                    height: 25,
                    width: 25,
                    cursor: 'pointer',
                  }}
                />
              )}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            Last name:
          </Typography>
          <Typography variant="subtitle1" component="p">
            {userinfo?.userLastName}
            {docinfo?.lastname &&
              docinfo?.lastname?.toUpperCase().replace(' ', '') !==
                userinfo?.userLastName?.toUpperCase().replace(' ', '') && (
                <Iconify
                  icon="material-symbols:info-outline"
                  color="warning"
                  sx={{
                    ml: 1,
                    pt: 1.25,
                    color: '	#bb2124',
                    height: 25,
                    width: 25,
                    cursor: 'pointer',
                  }}
                />
              )}
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
            {bday?.substring(0, 10)}
            {docinfo?.dateOfBirth &&
              docinfo?.dateOfBirth?.replace(' ', '').substring(0, 10) !==
                bday?.replace(' ', '').substring(0, 10) && (
                <>
                  <Iconify
                    icon="material-symbols:info-outline"
                    color="warning"
                    sx={{
                      ml: 1,
                      pt: 1.25,
                      color: '	#bb2124',
                      height: 25,
                      width: 25,
                      cursor: 'pointer',
                    }}
                    // onMouseEnter={(e) => setPop1Open(e.currentTarget)}
                    // onMouseLeave={() => setPop1Open(null)}
                  />
                  {/* <Popover
                  // open={pop1Open}
                  // anchorEl={pop1Open}
                  // onClose={() => setPop1Open(null)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <Typography variant="body2" sx={{ p: 2 }}>
                    Document DOB: {docinfo?.dateOfBirth}
                  </Typography>
                </Popover> */}
                </>
              )}
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
  fraudScore: PropTypes.number,
  docinfo: PropTypes.object,
};

export default UserDetails;
