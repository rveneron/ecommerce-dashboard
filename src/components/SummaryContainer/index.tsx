import { useTranslation } from 'react-i18next';
import { ClassnameProps } from 'types/classname-props';
import { useData } from '../../context/DataContext';
import MetricCard from 'components/MetricCard';
import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';

type Props = ClassnameProps;

export const SummaryContainer = ({ className }: Props) => {
  const { t } = useTranslation('common');

  const { data, metrics } = useData();

  return (
    <Paper className={'flex flex-col gap-4 p-8'}>
      <Typography className={'text-3xl font-semibold'}>{t('realtimeSummary')}</Typography>
      {metrics?.length ? (
        <Box className={'grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'}>
          {metrics?.map((metric) => (
            <MetricCard key={metric} metric={metric} value={data?.[metric]} />
          ))}
        </Box>
      ) : (
        <Box className={'w-full min-h-[200px] flex items-center justify-center'}>
          <Typography className={'text-3xl font-semibold text-gray-500'}>{t('messages.noMetrics')}</Typography>
        </Box>
      )}
    </Paper>
  );
};
