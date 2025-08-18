import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getDateFromString } from 'utils/date';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { useDateSettings } from '../../context/DateSettingsContext';
import { Locale } from 'date-fns'; // theme css file

type Props = {
  value: [string, string];
  onChange: (dateRange: [string, string]) => void;
};

export const DateRange = ({ value = ['2004-03-01T04:00:00.000Z', '2004-05-01T04:00:00.000Z'], onChange }: Props) => {
  const { t } = useTranslation('common');

  const { locale } = useDateSettings();

  const handleChange = useCallback(
    (rangesByKey: RangeKeyDict) => {
      const val = rangesByKey?.selection;
      onChange?.([val?.startDate?.toISOString() || '', val?.endDate?.toISOString() || '']);
    },
    [onChange],
  );

  const range = useMemo(
    () => ({
      startDate: getDateFromString(value[0]?.substring(0, 10)),
      endDate: getDateFromString(value[1]?.substring(0, 10)),
      key: 'selection',
    }),
    [value],
  );

  return (
    <DateRangePicker
      ranges={[range]}
      onChange={handleChange}
      locale={locale as unknown as Locale}
      showMonthAndYearPickers={false}
      moveRangeOnFirstSelection={false}
      direction='horizontal'
      showDateDisplay={false}
    />
  );
};
