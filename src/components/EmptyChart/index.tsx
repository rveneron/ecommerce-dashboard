import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import Box from '@mui/material/Box';

type Props = {
  className?: string;
  titleKey?: string;
};

const EmptyChart = ({ className, titleKey = 'common:noInfo' }: Props) => {
  const { t } = useTranslation('common');

  return (
    <Box className={clsx('w-full p-3 flex flex-col items-center justify-center gap-2', className)}>
      <img alt={t(titleKey)} src={'/images/empty-chart.png'} width={250} height={250} />
      <Typography className={'font-semibold text-lg text-primary'}>{t(titleKey)}</Typography>
    </Box>
  );
};

export default memo(EmptyChart);
