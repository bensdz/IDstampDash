/* eslint-disable no-nested-ternary */
// import { useState } from 'react';
import { Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import Label from './label';

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

  // const anchorRef = useRef(null);
  // const anchorRef1 = useRef(null);
  // const anchorRef3 = useRef(null);

  // // console.log(docinfo);
  // const [pop1Open, setPop1Open] = useState(false);
  // const [pop2Open, setPop2Open] = useState(false);
  // const [pop3Open, setPop3Open] = useState(false);

  // const debouncedSetPop2Open = debounce(setPop2Open, 300);
  // const debouncedSetPop1Open = debounce(setPop1Open, 300);
  // const debouncedSetPop3Open = debounce(setPop3Open, 300);

  return (
    <>
      <Label color={statusColors[userinfo?.status] || statusColors.default} sx={{ my: 2 }}>
        {userinfo?.status}
      </Label>
      {fraudScore && (
        <Label
          color={fraudScore > 0.6 ? 'error' : fraudScore > 0.3 ? 'warning' : 'info'}
          sx={{ my: 2, mx: 1 }}
        >
          {fraudScore > 0.6
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
          <Typography variant="subtitle1">
            {userinfo?.userFirstName}
            {/* {docinfo?.firstname?.toUpperCase().replace(' ', '') !==
              userinfo?.userFirstName?.toUpperCase().replace(' ', '') && (
              <>
                <Iconify
                  ref={anchorRef1}
                  icon="material-symbols:info-outline"
                  color="warning"
                  sx={{
                    ml: 1,
                    pt: 0,
                    color: '	#bb2124',
                    height: 15,
                    width: 15,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => debouncedSetPop1Open(true)}
                  onMouseLeave={(e) => debouncedSetPop1Open(false)}
                />
                <Popover
                  open={pop1Open}
                  anchorEl={anchorRef1.current}
                  onClose={() => setPop1Open(false)}
                >
                  <Typography variant="body2" sx={{ p: 2 }}>
                    Don&apos;t match with document first name: {docinfo?.firstname}
                  </Typography>
                </Popover>
              </>
            )} */}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            Last name:
          </Typography>
          <Typography variant="subtitle1">
            {userinfo?.userLastName}
            {/* {docinfo?.lastName?.toUpperCase().replace(' ', '') !==
              userinfo?.userLastName?.toUpperCase().replace(' ', '') && (
              <>
                <Iconify
                  ref={anchorRef}
                  icon="material-symbols:info-outline"
                  color="warning"
                  sx={{
                    ml: 1,
                    pt: 0,
                    color: '	#bb2124',
                    height: 15,
                    width: 15,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => debouncedSetPop2Open(true)}
                  onMouseLeave={(e) => debouncedSetPop2Open(false)}
                />
                <Popover
                  open={pop2Open}
                  anchorEl={anchorRef.current}
                  onClose={() => setPop2Open(false)}
                >
                  <Typography variant="body2" sx={{ p: 2 }}>
                    Don&apos;t match with document last name: {docinfo?.lastName}
                  </Typography>
                </Popover>
              </>
            )} */}
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
          <Typography variant="subtitle1">
            {bday?.substring(0, 10)}
            {/* {docinfo?.dateOfBirth?.replace(' ', '').substring(0, 10) !==
              bday?.replace(' ', '').substring(0, 10) && (
              <>
                <Iconify
                  icon="material-symbols:info-outline"
                  color="warning"
                  sx={{
                    ml: 1,
                    pt: 0,
                    color: '	#bb2124',
                    height: 15,
                    width: 15,
                    cursor: 'pointer',
                  }}
                  ref={anchorRef3}
                  onMouseEnter={(e) => debouncedSetPop3Open(true)}
                  onMouseLeave={(e) => debouncedSetPop3Open(false)}
                />
                <Popover
                  open={pop3Open}
                  anchorEl={anchorRef3.current}
                  onClose={() => setPop3Open(false)}
                >
                  <Typography variant="body2" sx={{ p: 2 }}>
                    Date of birth doesn&apos;t match with document date of birth:
                    {docinfo?.dateOfBirth}
                  </Typography>
                </Popover>
              </>
            )} */}
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
