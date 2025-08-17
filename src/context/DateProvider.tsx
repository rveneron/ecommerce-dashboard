import { memo } from 'react';
import { ChildrenProps } from 'types/children-props';
import { useTranslation } from 'react-i18next';
import esLocale from 'date-fns/locale/es';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateSettingsProvider } from './DateSettingsContext';

type DateProviderProps = ChildrenProps;

export const localeMap = {
  es: esLocale,
};
const DateProvider = ({ children }: DateProviderProps) => {
  const { i18n } = useTranslation('locales');
  const locale = i18n?.language;
  return (
    <DateSettingsProvider localeMap={localeMap} locale={locale}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
    </DateSettingsProvider>
  );
};

export default memo(DateProvider);
