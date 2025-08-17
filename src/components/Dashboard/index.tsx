import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import DashboardHeader from 'components/DashboardHeader';

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <Box className={'px-4 flex flex-col gap-8'}>
      <DashboardHeader />
    </Box>
  );
};

export default Dashboard;
