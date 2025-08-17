import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { OPERATOR, OPERATOR_VALUES } from 'constants/operator.enum';
import { useTranslation } from 'react-i18next';

type Props = {
  value: OPERATOR;
  onChange: (operator: OPERATOR) => void;
};

export const OperatorSelect = ({ value = OPERATOR.AVG, onChange }: Props) => {
  const { t } = useTranslation('common');

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const value = event.target.value as OPERATOR;
      onChange?.(value);
    },
    [onChange],
  );

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size={'small'}>
        <InputLabel id='operator-label'>{t('operator.title')}</InputLabel>
        <Select
          labelId='operator-label'
          id='operator'
          value={value}
          label={t('operator.title')}
          onChange={handleChange}
        >
          {OPERATOR_VALUES.map((op) => (
            <MenuItem value={op} key={op}>
              {t(`operator.${op}`)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
