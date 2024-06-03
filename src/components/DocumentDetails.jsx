import { Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';
// import { useEffect } from 'react';

function DocumentDetails({ doc }) {
  const documentTypes = {
    ID: 'Identity Card',
    DL: 'Driver License',
  };

  // const onUpdateDocDetails = () => {
  //   console.log('update document details');
  // };

  return (
    <>
      <Typography variant="h5">Document details:</Typography>
      {!doc ? (
        <Typography variant="body1" component="p" sx={{ my: 2 }}>
          No document uploaded
        </Typography>
      ) : (
        <>
          {/* <Typography variant="body1" component="p" sx={{ my: 2 }}>
            Edit document details
          </Typography> */}
          <Grid container sx={{ my: 3 }}>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                First name:
              </Typography>
              <Typography variant="subtitle1" component="p">
                {doc?.firstname}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Last Name:
              </Typography>
              <Typography variant="subtitle1" component="p">
                {doc?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Identification Number
              </Typography>
              <Typography variant="subtitle1" component="p">
                {doc?.number_identification}
              </Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ my: 3 }}>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Date Of Birth:
              </Typography>
              <Typography variant="subtitle1" component="p">
                {doc?.dateOfBirth?.substring(0, 10)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Place Of Birth:
              </Typography>
              <Typography variant="subtitle1" component="p">
                {doc?.placeOfBirth}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Gender:
              </Typography>
              <Typography variant="subtitle1" component="p">
                {doc?.sex}
              </Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ my: 3 }}>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Type:
              </Typography>
              <Typography variant="subtitle1" component="p">
                {documentTypes[doc?.documentType] || 'Passport'}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Document ID:
              </Typography>
              <Typography variant="subtitle1" component="p">
                {doc?.documentId}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Authority:
              </Typography>
              <Typography variant="subtitle1" component="p">
                Algerian Republic
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ my: 3 }}>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Place of issue:
              </Typography>
              <Typography variant="subtitle1" component="p">
                {doc?.issuing_authority}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Issue Date:
              </Typography>
              <Typography variant="subtitle1" component="p">
                {doc?.release_date?.substring(0, 10)}
                <b style={{ color: 'red' }}>
                  {new Date(doc?.release_date) > new Date() && ' (In Future)'}
                </b>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Expiry:
              </Typography>
              <Typography variant="subtitle1" component="p">
                {doc?.expiry_date?.substring(0, 10)}
                <b style={{ color: 'red' }}>
                  {new Date(doc?.expiry_date) < new Date() && ' (Expired)'}
                </b>
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

DocumentDetails.propTypes = {
  doc: PropTypes.object,
};

export default DocumentDetails;
