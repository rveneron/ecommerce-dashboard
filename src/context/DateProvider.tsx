import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ChildrenProps, DateSettingsProvider } from '@dfl/mui-react-common';
import enLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

type DateProviderProps = ChildrenProps;

export const localeMap = {
  es: esLocale,
  en: enLocale,
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
