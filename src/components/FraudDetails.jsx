/* eslint-disable no-unsafe-optional-chaining */
import { Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';

function FraudDetails({ verif }) {
  return (
    <>
      <Typography variant="h5">Fraud Index:</Typography>
      {verif ? (
        <>
          <Grid container sx={{ my: 3 }}>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Face Match:
              </Typography>
              <Typography variant="subtitle1" component="p">
                {verif?.compareFaces === 0
                  ? 'Not detected'
                  : `${Math.round(verif?.compareFaces * 100)}%`}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                MRZ Match:
              </Typography>
              <Typography variant="subtitle1" component="p">
                {Math.round(verif?.compareMRZ)}%
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Valid MRZ Code?
              </Typography>
              <Typography variant="subtitle1" component="p">
                {verif?.mRZValid ? 'Yes' : 'No'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ my: 3 }}>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Age Match:
              </Typography>
              <Typography variant="subtitle1" component="p">
                {Math.round(verif?.compareAge)}%
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                AML Compliance:
              </Typography>
              <Typography variant="subtitle1" component="p">
                Comply
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                IP Check:
              </Typography>
              <Typography variant="subtitle1" component="p">
                Clean
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="body1" component="p" sx={{ my: 2 }}>
          No data found
        </Typography>
      )}
    </>
  );
}

FraudDetails.propTypes = {
  verif: PropTypes.object,
};

export default FraudDetails;
