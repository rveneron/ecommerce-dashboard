import { useTranslation } from 'react-i18next';
import { ClassnameProps } from 'types/classname-props';
import { useData } from '../../context/DataContext';
import { Paper, Typography } from '@mui/material';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { histogram, transformSeries } from 'utils/charts';
import Chart from 'react-apexcharts';
import EmptyChart from 'components/EmptyChart';
import { INTERVALS } from 'constants/intervals.enum';
import ChartSkeleton from 'components/ChartSkeleton';
import { IntervalSelector } from 'components/IntervalSelector';
import Box from '@mui/material/Box';
import { getInterval } from 'utils/date';

type Props = ClassnameProps;

export const COTimelineContainer = ({ className }: Props) => {
  const { t } = useTranslation('common');

  const { coData, coError, isLoadingCO, interval, setInterval } = useData();

  const handleInterval = useCallback(
    (value: INTERVALS | 'automatic') => {
      setInterval?.(value);
    },
    [setInterval],
  );

  const finalInterval = useMemo(() => {
    if (interval !== 'automatic') {
      return interval;
    }
    if (coData?.length) {
      return getInterval(coData?.[0]?.interval as string, coData?.[coData?.length - 1]?.interval as string);
    }
  }, [coData, interval]);

  const histogramData = useMemo(() => {
    return histogram(
      coData || [],
      'interval',
      ['CO', 'count'],
      {
        name: '',
        interval: finalInterval as string,
        options: {
          colors: ['darkred', 'orange'],
        },
      },
      t,
    );
  }, [coData, t, finalInterval]);

  const options = useMemo(() => histogramData?.options || {}, [histogramData?.options]);
  const series: any = useMemo(() => transformSeries((histogramData?.series as any) || []), [histogramData]);

  if (isLoadingCO) {
    return (
      <Paper className={clsx('flex flex-col gap-4 p-8 overflow-hidden', className)}>
        <Typography className={'text-3xl font-semibold'}>{t('coTimeline.title')}</Typography>
        <ChartSkeleton />
      </Paper>
    );
  }

  return (
    <Paper className={clsx('flex flex-col gap-4 p-8', className)}>
      <Box className={'flex flex-col md:flex-row items-center justify-center lg:justify-between gap-4'}>
        <Typography className={'text-3xl font-semibold'}>{t('coTimeline.title')}</Typography>
        <IntervalSelector value={interval} onChange={handleInterval} />
      </Box>
      {(series?.length || 0) > 0 ? (
        <Chart options={options} series={series} type='line' width='100%' height={350} />
      ) : (
        <EmptyChart className={'h-full'} />
      )}
    </Paper>
  );
};
