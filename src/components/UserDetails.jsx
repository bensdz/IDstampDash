import { Typography, Grid } from '@mui/material';

function UserDetails() {
  return (
    <>
      <Typography variant="h5">User details:</Typography>
      <Grid container sx={{ my: 2 }}>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            First name:
          </Typography>
          <Typography variant="subtitle1" component="p">
            Hunt
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            Last name:
          </Typography>
          <Typography variant="subtitle1" component="p">
            David
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            Email
          </Typography>
          <Typography variant="subtitle1" component="p">
            example@gmail.com
          </Typography>
        </Grid>
      </Grid>

      <Grid container sx={{ my: 3 }}>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            Date of Birth:
          </Typography>
          <Typography variant="subtitle1" component="p">
            22/04/2000
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            Place of Birth:
          </Typography>
          <Typography variant="subtitle1" component="p">
            nowhere
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" component="p">
            Sex:
          </Typography>
          <Typography variant="subtitle1" component="p">
            M
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default UserDetails;
