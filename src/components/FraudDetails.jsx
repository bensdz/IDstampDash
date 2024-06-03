/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unsafe-optional-chaining */
import { useState } from 'react';
import { Typography, Grid, Alert, Button } from '@mui/material';
import PropTypes from 'prop-types';

import GaugeChart from 'react-gauge-chart';
import FraudReport from './FraudReport';

function FraudDetails({ verif }) {
  const [modalOpen, setModalOpen] = useState(false);
  const sanctionsCheck = verif?.sanctionsCheck ? JSON.parse(verif?.sanctionsCheck) : null;
  const facesHaveAccountBefore = verif?.facesHaveAccountBefore
    ? JSON.parse(verif?.facesHaveAccountBefore)
    : null;

  return (
    <>
      <Typography variant="h5">Fraud Analysis:</Typography>
      {verif ? (
        <>
          <GaugeChart
            id="gauge-chart1"
            percent={verif?.fraudIndex || 0}
            style={{
              width: '40%',
              margin: 'auto',
              marginTop: '20px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
            textColor="#00000"
            nrOfLevels={3}
            arcsLength={[0.3, 0.3, 0.4]}
            colors={['#50C878', '#ff9f00', '#cf352e']}
          />
          {verif?.compareFaces <= 0.7 && (
            <Alert severity="error" sx={{ my: 2 }}>
              Face match is below 70%
            </Alert>
          )}
          {verif?.nbrFacesRejected > 0 && (
            <Alert severity="error" sx={{ my: 2 }}>
              Face Rejected {verif?.nbrFacesRejected} Times By Other Companies
            </Alert>
          )}

          {facesHaveAccountBefore?.length > 0 && (
            <Alert severity="error" sx={{ my: 2 }}>
              Face Detected in {facesHaveAccountBefore?.length} Previous Accounts In Your Company
            </Alert>
          )}

          {verif?.compareMRZ <= 70 && (
            <Alert severity="error" sx={{ my: 2 }}>
              MRZ information does not match
            </Alert>
          )}
          {verif?.compareAge <= 0.7 && (
            <Alert severity="error" sx={{ my: 2 }}>
              Age match is below 70%
            </Alert>
          )}
          {verif?.compareGender === false && (
            <Alert severity="error" sx={{ my: 2 }}>
              Gender does not match
            </Alert>
          )}
          {!verif?.mRZValid && (
            <Alert severity="error" sx={{ my: 2 }}>
              Invalid MRZ code
            </Alert>
          )}
          {sanctionsCheck?.results?.length > 0 && (
            <Alert severity="error" sx={{ my: 2 }}>
              {sanctionsCheck?.results?.length} Possible Sanctions Match Found
            </Alert>
          )}

          {/* {!verif?.infoMatch && (
            <Alert severity="error" sx={{ my: 2 }}>
              Given Information and document Information don&apos;t match
            </Alert>
          )} */}
          <Grid container sx={{ my: 3 }}>
            {/* <Grid item xs={4}>
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
                Face Age Match:
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
          <Grid container sx={{ my: 3 }}>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Face Gender Match:
              </Typography>
              <Typography variant="subtitle1" component="p">
                {verif?.compareGender ? 'Yes' : 'No'}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Face Found in DB?
              </Typography>
              <Typography variant="subtitle1" component="p">
                Clean
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" component="p">
                Informations match:
              </Typography>
              <Typography variant="subtitle1" component="p">
                Match
              </Typography>
            </Grid> */}
            <Button variant="contained" onClick={() => setModalOpen(true)} color="info">
              View Detailed Report
            </Button>
            <FraudReport verif={verif} open={modalOpen} onClose={setModalOpen} />
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
