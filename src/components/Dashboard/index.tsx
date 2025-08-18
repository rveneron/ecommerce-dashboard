import Box from '@mui/material/Box';
import DashboardHeader from 'components/DashboardHeader';
import { SummaryContainer } from 'components/SummaryContainer';
import { COTimelineContainer } from 'components/COTimelineContainer';

const Dashboard = () => {
  return (
    <Box className={'px-4 flex flex-col gap-8'}>
      <DashboardHeader />
      <SummaryContainer />
      <COTimelineContainer />
    </Box>
  );
};

export default Dashboard;
