import { Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const DashboardHeader = () => {
  
  const { t } = useTranslation();
  return (
    <Paper className={'px-8 py-4 flex flex-col items-start justify-between'}>
      <Typography></Typography>
    </Paper>
  );
}

export default DashboardHeader;
