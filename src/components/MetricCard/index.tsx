import { VALUES_KEY_LABELS } from 'constants/values_key';
import { MetricType } from 'types/metric';
import { ClassnameProps } from 'types/classname-props';
import { useTranslation } from 'react-i18next';
import { memo, useEffect, useRef, useState } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

type Props = ClassnameProps & {
  metric: MetricType;
  value?: number;
};

const MetricCard = ({ value, metric }: Props) => {
  const { t } = useTranslation('common');
  const [currentValue, setCurrentValue] = useState<number | undefined>(undefined);
  const colorRef = useRef<string>('#000');
  const iconRef = useRef<any>(undefined);
  const diffRef = useRef<string>('');

  useEffect(() => {
    setCurrentValue((prevState) => {
      if (!!prevState && !!value) {
        if (prevState < value) {
          colorRef.current = '#008000';
          diffRef.current = `+${(value - prevState).toFixed(3)}`;
          iconRef.current = <TrendingUpIcon sx={{ color: '#008000', width: 20, height: 20 }} />;
        } else if (prevState > value) {
          colorRef.current = '#ff0000';
          diffRef.current = `${(value - prevState).toFixed(3)}`;
          iconRef.current = <TrendingUpIcon sx={{ color: '#ff0000', width: 20, height: 20 }} />;
        } else {
          diffRef.current = '';
          iconRef.current = undefined;
          colorRef.current = '#000';
        }
      } else {
        diffRef.current = '';
        iconRef.current = undefined;
        colorRef.current = '#000';
      }
      return value;
    });
  }, [currentValue, value]);

  return (
    <Box className={'p-4 rounded-lg shadow-lg flex flex-col gap-4 overflow-hidden'}>
      <Box className={'flex items-center justify-between flex-wrap gap-1'}>
        <Typography className={'text-xl'}>{VALUES_KEY_LABELS[metric].label}</Typography>
        <Box className={'flex items-center justify-end gap-0.5'}>
          {iconRef.current}
          <Typography
            sx={{
              color: colorRef.current,
              fontSize: '12px',
            }}
          >
            {diffRef.current}
          </Typography>
        </Box>
      </Box>
      <Box className={'flex items-center justify-center flex-1'}>
        <Typography
          className={'text-2xl font-semibold'}
          sx={{
            color: colorRef.current,
          }}
        >
          {value || t('noValue')}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(MetricCard);
