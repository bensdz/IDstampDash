import { Typography, Grid } from '@mui/material';

function DocumentDetails() {
  return (
    <>
      <Typography variant="h5">Document details:</Typography>
      <Grid container sx={{ my: 3 }}>
        <Grid item xs={6}>
          <Typography variant="body1" component="p">
            Type:
          </Typography>
          <Typography variant="subtitle1" component="p">
            ID card
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" component="p">
            Authority:
          </Typography>
          <Typography variant="subtitle1" component="p">
            Algeria
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ my: 3 }}>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            Place of issue:
          </Typography>
          <Typography variant="subtitle1" component="p">
            Medea
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            Issue Date:
          </Typography>
          <Typography variant="subtitle1" component="p">
            12-12-2012
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            Expiry:
          </Typography>
          <Typography variant="subtitle1" component="p">
            12-12-2022
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default DocumentDetails;
