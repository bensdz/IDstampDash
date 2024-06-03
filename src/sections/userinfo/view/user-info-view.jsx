/* eslint-disable no-nested-ternary */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-extraneous-dependencies */

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  Modal,
  TextField,
  Typography,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { Gallery } from 'src/components/Gallery';
import HistoryItem from 'src/components/History-Item';
import UserDetails from 'src/components/UserDetails';
import DocumentDetails from 'src/components/DocumentDetails';
import FraudDetails from 'src/components/FraudDetails';
import { useParams } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { baseURL } from '../../../../apiconfig';

function UserInfo() {
  const router = useRouter();

  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userid = useParams()?.id;
  const comp = useAuthUser();

  const [reviewStatus, setReviewStatus] = useState('');
  const [note, setNote] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 520,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  const fetchUserDetails = useCallback(() => {
    setIsLoading(true);
    axios
      .post(`${baseURL}/users/details/${userid}`, {
        token: comp?.token,
        role: comp?.role,
        companyId: comp?.company?.companyId,
      })
      .then((res) => {
        setInfo(res.data);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
        setIsLoading(false);
      });
  }, [userid, comp?.token, comp?.role, comp?.company?.companyId]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const { submissions, ...userinfo } = info;

  const latestSubmission =
    submissions &&
    submissions.slice().sort((a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted))[0];

  const handleSetStatus = async (newStatus) => {
    try {
      await axios.post(`${baseURL}/users/update`, {
        token: comp?.token,
        role: comp?.role,
        submissionId: latestSubmission?.submissionId,
        userId: latestSubmission?.userId,
        status: newStatus,
        note,
        companyId: comp?.company?.companyId,
      });
      // console.log(res.data);
      fetchUserDetails();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', my: 1 }}>
        <Button onClick={() => router.back()}>⬅ Back</Button>{' '}
      </Box>
      <Card>
        {error ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="75vh">
            <Typography variant="h4" sx={{ my: 2 }}>
              404: User not found
            </Typography>
          </Box>
        ) : isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="75vh">
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <CardContent sx={{ my: 2, mx: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <UserDetails
                  userinfo={userinfo}
                  fraudScore={latestSubmission?.verif?.fraudIndex}
                  docinfo={{
                    firstname: latestSubmission?.document?.firstname,
                    lastName: latestSubmission?.document?.lastName,
                    dateOfBirth: latestSubmission?.document?.dateOfBirth?.substring(0, 10),
                  }}
                />

                <Divider sx={{ my: 2 }} variant="middle" />

                <DocumentDetails doc={latestSubmission?.document} />

                <Divider sx={{ my: 2 }} variant="middle" />

                <FraudDetails verif={latestSubmission?.verif} />
              </Grid>

              <Grid item xs={12} sm={6} sx={{}}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    sx={{ my: 2, mx: 1 }}
                    variant="outlined"
                    disabled={info?.status === 'New' || info?.status === 'Resubmit'}
                    // color="common"
                    onClick={() => {
                      setReviewStatus('Resubmit');
                      setModalOpen(true);
                    }}
                  >
                    Ask to resubmit
                  </Button>
                  <Button
                    sx={{ my: 2, mx: 1 }}
                    variant="outlined"
                    color="error"
                    disabled={
                      info?.status === 'New' ||
                      info?.status === 'Rejected' ||
                      info?.status === 'Resubmit'
                    }
                    onClick={() => {
                      setReviewStatus('Rejected');
                      setModalOpen(true);
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    sx={{ my: 2, mx: 1 }}
                    variant="contained"
                    color="success"
                    disabled={
                      info?.status === 'New' ||
                      info?.status === 'Verified' ||
                      info?.status === 'Resubmit'
                    }
                    onClick={() => {
                      setReviewStatus('Verified');
                      setModalOpen(true);
                    }}
                  >
                    Approve
                  </Button>
                </Box>
                <Modal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <Box sx={style}>
                    <Typography variant="h6">
                      Optional: Add a note for your decision ({reviewStatus})
                    </Typography>
                    <TextField
                      value={note}
                      label="Enter here a note for the user"
                      onChange={(e) => setNote(e.target.value)}
                      fullWidth
                      sx={{ my: 2 }}
                    />
                    <LoadingButton
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="inherit"
                      onClick={() => {
                        setModalOpen(false);
                        handleSetStatus(reviewStatus);
                      }}
                    >
                      Confirm
                    </LoadingButton>
                  </Box>
                </Modal>
                <Container>
                  <Gallery
                    imgs={[
                      latestSubmission?.frontImageLink,
                      latestSubmission?.backImageLink && latestSubmission?.backImageLink,
                      latestSubmission?.faceImageLink,
                    ]}
                  />
                </Container>
              </Grid>
            </Grid>

            <Box>
              <Typography variant="h5">Submissions History:</Typography>
              {submissions?.length === 0 ? (
                <Typography variant="body1" component="p" sx={{ my: 2 }}>
                  No data found
                </Typography>
              ) : (
                <List>
                  {submissions?.map((sub) => (
                    <HistoryItem
                      key={sub?.submissionId}
                      submission={sub}
                      current={sub?.submissionId === latestSubmission?.submissionId}
                    />
                  ))}
                </List>
              )}
            </Box>
          </CardContent>
        )}
      </Card>
    </>
  );
}

export default UserInfo;
