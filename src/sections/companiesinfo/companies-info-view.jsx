// import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { Carousel } from 'react-carousel-minimal';

import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

// import { Gallery } from 'src/components/Gallery';

export default function CompaniesInfo() {
  const router = useRouter();
  const handleRejectId = () => {
    // Implement reject Id functionality here
  };

  // eslint-disable-next-line no-unused-vars
  const handleAskToReupload = () => {
    // Implement ask to reupload selfie functionality here
  };

  const handleApprove = () => {
    // Implement approve functionality here
  };

  return (
    <>
      <Box sx={{ display: 'flex', my: 1 }}>
        <Button onClick={() => router.back()}>⬅ Back</Button>{' '}
      </Box>
      <Card>
        <CardContent sx={{ my: 2, mx: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">User details:</Typography>
              <Grid container sx={{ my: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="body1" component="p">
                    First name:
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    Hunt
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" component="p">
                    Last name:
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    David
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ my: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="body1" component="p">
                    Phone Number:
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    +21355554855
                  </Typography>
                </Grid>
                <Grid item xs={6}>
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

              <Divider sx={{ my: 2 }} variant="middle" />

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

              <Divider sx={{ my: 2 }} variant="middle" />
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
            </Grid>

            <Grid item xs={12} sm={6} sx={{}}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  sx={{ my: 2, mx: 1 }}
                  variant="outlined"
                  color="error"
                  onClick={handleRejectId}
                >
                  Reject
                </Button>
                <Button
                  sx={{ my: 2, mx: 1 }}
                  variant="contained"
                  color="success"
                  onClick={handleApprove}
                >
                  Approve
                </Button>
              </Box>
              {/* <Container>
                <Gallery />
  </Container> */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
