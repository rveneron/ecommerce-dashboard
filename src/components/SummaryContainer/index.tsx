import { useTranslation } from 'react-i18next';
import { ClassnameProps } from 'types/classname-props';
import { useData } from '../../context/DataContext';
import MetricCard from 'components/MetricCard';
import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import { IntervalSelector } from 'components/IntervalSelector';
import { useCallback } from 'react';
import { OPERATOR } from 'constants/operator.enum';
import { OperatorSelect } from 'components/OperatorSelector';

type Props = ClassnameProps;

export const SummaryContainer = ({ className }: Props) => {
  const { t } = useTranslation('common');

  const { data, operator, setOperator, metrics } = useData();

  const handleOperatorChange = useCallback(
    (operator: OPERATOR) => {
      setOperator?.(operator);
    },
    [setOperator],
  );

  return (
    <Paper className={clsx('flex flex-col gap-4 p-8', className)}>
      <Box className={'flex flex-col md:flex-row items-center justify-center lg:justify-between gap-4'}>
        <Typography className={'text-3xl font-semibold'}>{t('realtimeSummary')}</Typography>
        <OperatorSelect value={operator} onChange={handleOperatorChange} />
      </Box>
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
