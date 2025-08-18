import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { OPERATOR, OPERATOR_VALUES } from 'constants/operator.enum';
import { useTranslation } from 'react-i18next';
import { INTERVALS, INTERVALS_VALUES } from 'constants/intervals.enum';

type Props = {
  value: INTERVALS | 'automatic';
  onChange: (interval: INTERVALS | 'automatic') => void;
};

export const IntervalSelector = ({ value = 'automatic', onChange }: Props) => {
  const { t } = useTranslation('common');

  const handleChange = useCallback(
    (event: any) => {
      const value = event.target.value;
      onChange?.(value);
    },
    [onChange],
  );

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size={'small'}>
        <InputLabel id='interval-label'>{t('interval.title')}</InputLabel>
        <Select
          labelId='interval-label'
          id='interval'
          value={value}
          renderValue={(selected) => t(`interval.${selected}`)}
          label={t('interval.title')}
          onChange={handleChange}
        >
          <MenuItem value={'automatic'} key={'automatic'}>
            {t('interval.automatic')}
          </MenuItem>
          {INTERVALS_VALUES.map((interval) => (
            <MenuItem value={interval} key={interval}>
              {t(`interval.${interval}`)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
