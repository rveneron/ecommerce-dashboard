import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import { VALUES_KEY_LABELS } from 'constants/values_key';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export type MetricKey = keyof typeof VALUES_KEY_LABELS;

type Props = {
  value?: MetricKey[];
  onChange: (value: MetricKey[]) => void;
};

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};

const options = Object.keys(VALUES_KEY_LABELS);

export const MetricSelector = ({ value = options, onChange }: Props) => {
  const { t } = useTranslation('common');
  const [metrics, setMetrics] = useState<string[]>(value);

  useEffect(() => {
    setMetrics(value);
  }, [value]);

  const handleChange = useCallback(
    (event: SelectChangeEvent<typeof metrics>) => {
      const value = event.target.value;
      const result = typeof value === 'string' ? value.split(',') : value;
      setMetrics(result);
      onChange(result);
    },
    [onChange],
  );

  const isChecked = useCallback((value: string) => metrics.includes(value), [metrics]);

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id='metrics-label'>{t('metrics')}</InputLabel>
      <Select
        size={'small'}
        labelId='metrics-label'
        id='metrics'
        multiple
        value={metrics}
        onChange={handleChange}
        input={<OutlinedInput label={t('metrics')} />}
        renderValue={(selected) => selected.map((metric) => VALUES_KEY_LABELS[metric].label).join(', ')}
        MenuProps={MenuProps}
      >
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            <Checkbox checked={isChecked(opt)} />
            <ListItemText primary={VALUES_KEY_LABELS[opt].label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
