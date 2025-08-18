import { Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { useData } from '../../context/DataContext';
import { useCallback } from 'react';
import { DateRange } from 'components/DateRange';
import { MetricSelector } from 'components/MetricSelector';

const DashboardHeader = () => {
  const { t } = useTranslation();

  const { dateRange, setDateRange, metrics, setMetrics } = useData();

  const handleDateRangeChange = useCallback(
    (values: [string, string]) => {
      setDateRange?.(values);
    },
    [setDateRange],
  );

  const handleMetricsChange = useCallback(
    (metrics: string[]) => {
      setMetrics?.(metrics);
    },
    [setMetrics],
  );

  return (
    <Paper className={'p-8 flex flex-col items-stretch lg:items-end justify-between lg:flex-row gap-4'}>
      <Box className={'flex flex-col gap-1 flex-1 max-w-3xl'}>
        <Typography className={'text-3xl font-semibold'}>{t('dashboard')}</Typography>
        <Typography className={''}>{t('appDescription')}</Typography>
      </Box>
      <Box className={'flex flex-col gap-1'}>
        <Typography>{t('filterBy')}:</Typography>
        <Box className={'flex flex-row flex-wrap items-center gap-2'}>
          <DateRange value={dateRange as [string, string]} onChange={handleDateRangeChange} />
          <MetricSelector value={metrics} onChange={handleMetricsChange} className={'flex-1'} />
        </Box>
      </Box>
    </Paper>
  );
};

export default DashboardHeader;
