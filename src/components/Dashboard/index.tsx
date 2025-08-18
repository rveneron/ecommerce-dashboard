import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import DashboardHeader from 'components/DashboardHeader';
import { SummaryContainer } from 'components/SummaryContainer';

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <Box className={'px-4 flex flex-col gap-8'}>
      <DashboardHeader />
      <SummaryContainer />
    </Box>
  );
};

export default Dashboard;
