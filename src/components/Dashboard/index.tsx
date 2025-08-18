import Box from '@mui/material/Box';
import DashboardHeader from 'components/DashboardHeader';
import { SummaryContainer } from 'components/SummaryContainer';
import { COTimelineContainer } from 'components/COTimelineContainer';
import { TableContainer } from 'components/TableContainer';

const Dashboard = () => {
  return (
    <Box className={'px-4 flex flex-col gap-8'}>
      <DashboardHeader />
      <SummaryContainer />
      <COTimelineContainer />
      <TableContainer />
    </Box>
  );
};

export default Dashboard;
