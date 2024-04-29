// import { faker } from '@faker-js/faker';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import Iconify from 'src/components/iconify';

// import AppTasks from '../app-tasks';
// import AppNewsUpdate from '../app-news-update';
// import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
// import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  const comp = useAuthUser();
  const [comps, setComps] = useState([]);
  const [months, setMonths] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [userCount, setUserCount] = useState({
    total: 0,
    verified: 0,
    rejected: 0,
    pending: 0,
    resubmit: 0,
    New: 0,
  });

  function getLastYearMonths() {
    const dates = [];
    const date = new Date();
    date.setMonth(date.getMonth() - 12);

    for (let i = 0; i < 12; i += 1) {
      date.setMonth(date.getMonth() + 1);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      dates.push(`${month}/31/${year}`);
    }

    return dates;
  }

  const fetchCategories = useCallback(async () => {
    axios
      .post('http://localhost:3000/api/users/count', {
        token: comp?.token,
        companyId: comp?.company?.companyId,
        role: comp?.role,
      })
      .then((response) => {
        setUserCount(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [comp]);

  const fetchComps = useCallback(async () => {
    axios
      .post('http://localhost:3000/api/companies', {
        token: comp?.token,
        role: comp?.role,
      })
      .then((res) => {
        setComps(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [comp?.token, comp?.role]);

  const getCountPerMonthLastYear = useCallback(async () => {
    // Get the current date and subtract 1 year
    const oneYearAgo = new Date();
    oneYearAgo.setMonth(oneYearAgo.getMonth() - 11);
    oneYearAgo.setDate(1);

    try {
      const response = await axios.post('http://localhost:3000/api/submissions/monthly', {
        token: comp?.token,
        companyId: comp?.company?.companyId,
        role: comp?.role,
      });

      // Filter the submissions to only include those from the last year
      const lastYearSubmissions = response.data.filter((submission) => {
        const submissionDate = new Date(submission.dateSubmitted);
        return submissionDate >= oneYearAgo;
      });

      // Initialize an array of 12 zeros
      const counts = Array(12).fill(0);

      // Count the submissions by month
      lastYearSubmissions.forEach((submission) => {
        const month = new Date(submission.dateSubmitted).getMonth(); // getMonth returns a zero-based month (0-11)
        const diffMonth = (new Date().getMonth() - month + 12) % 12; // calculate the difference in months
        counts[diffMonth] += 1;
      });

      // console.log(counts);
      counts.reverse();
      return counts;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [comp]);

  useEffect(() => {
    fetchCategories();
    getCountPerMonthLastYear().then(setMonths);
    if (comp?.role !== 'company') {
      fetchComps();
    }
  }, [comp?.role, fetchCategories, fetchComps, getCountPerMonthLastYear]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Welcome back {comp?.role !== 'company' ? 'Admin' : comp?.company?.companyName} 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={comp?.role === 'company' ? 4 : 3}>
          <AppWidgetSummary
            title="Total Users"
            total={userCount?.total || '0'}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/user.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={comp?.role === 'company' ? 4 : 3}>
          <AppWidgetSummary
            title="Total Verified Users"
            total={userCount?.verified || '0'}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/accepted.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={comp?.role === 'company' ? 4 : 3}>
          <AppWidgetSummary
            title="Total Rejected Users"
            total={userCount?.rejected || '0'}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/rejected.png" />}
          />
        </Grid>

        {comp?.role === 'admin' && (
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Companies"
              total={comps?.length || '0'}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/business.png" />}
            />
          </Grid>
        )}

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Users Submissions Per Month"
            // subheader="(+43%) than last year"
            chart={{
              labels: getLastYearMonths(),
              series: [
                {
                  name: 'Submissions',
                  type: 'area',
                  fill: 'gradient',
                  data: months,
                },

                /* {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: months,
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                }, */
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Users Status"
            chart={{
              series: [
                { label: 'Verified', value: userCount?.verified || 0 },
                { label: 'Rejected', value: userCount?.rejected || 0 },
                { label: 'Pending', value: userCount?.pending || 0 },
                { label: 'Resubmit', value: userCount?.resubmit || 0 },
                { label: 'New', value: userCount?.New || 0 },
              ],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
