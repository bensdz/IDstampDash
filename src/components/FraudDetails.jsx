import { Typography, Grid } from '@mui/material';

function FraudDetails() {
  return (
    <>
      <Typography variant="h5">Fraud Index:</Typography>
      <Grid container sx={{ my: 3 }}>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            Face Match:
          </Typography>
          <Typography variant="subtitle1" component="p">
            80%
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            MRZ Match:
          </Typography>
          <Typography variant="subtitle1" component="p">
            Matched (100%)
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            Age Match:
          </Typography>
          <Typography variant="subtitle1" component="p">
            Matched (80%)
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ my: 3 }}>
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
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            Mac address Check:
          </Typography>
          <Typography variant="subtitle1" component="p">
            Clean
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default FraudDetails;
