/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-extraneous-dependencies */

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
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
import { useEffect, useState } from 'react';
import axios from 'axios';

function UserInfo() {
  const router = useRouter();

  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const userid = useParams()?.id;
  const comp = useAuthUser();

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(`http://localhost:3000/api/users/details/${userid}`, {
        token: comp?.token,
      })
      .then((res) => {
        setInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [comp?.token, userid]);

  const { submissions, ...userinfo } = info;

  const latestSubmission =
    submissions &&
    submissions.slice().sort((a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted))[0];

  console.log(latestSubmission);

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
      <Card sx={{ minHeight: '75%' }}>
        {isLoading ? (
          'Loading...'
        ) : (
          <CardContent sx={{ my: 2, mx: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} sx={{ my: 3 }}>
                <UserDetails userinfo={userinfo} />

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
                    // color="common"
                    onClick={handleApprove}
                  >
                    Ask to resubmit
                  </Button>
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
              <Typography variant="h5">History</Typography>
              <List>
                <HistoryItem status="Declined" date="Jan 9, 2024" />
                <HistoryItem status="Accepted" date="Jan 31, 2024" />
                <HistoryItem status="Resubmit" date="Jan 31, 2024" />
              </List>
            </Box>
          </CardContent>
        )}
      </Card>
    </>
  );
}

export default UserInfo;
