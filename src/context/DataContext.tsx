import React, { createContext, useContext } from 'react';

// Data value of the provider context
type DateSettingsContextValue = {
  locale?: string
  defaultFormat: string
}
// default value of the context
const defaultValue: DateSettingsContextValue = { locale: undefined, defaultFormat: 'PP' }

// create context
const DateSettingsContext = createContext<DateSettingsContextValue>(defaultValue);

// Proptypes of Provider Component
type DateSettingsContextProps = {
  children: any
  defaultFormat?: string
  localeMap: Record<string, any>,
  locale: string
}

/**
 * Provider component
 * */
const DateSettingsProvider = ({ localeMap, locale, defaultFormat = 'PP', ...props }: DateSettingsContextProps) => {
  return (
    <DateSettingsContext.Provider
      value={{ locale: localeMap[locale], defaultFormat }}
      {...props}
    />
  );
}

const useDateSettings = () => {
  const context = useContext(DateSettingsContext);
  if (context === undefined) {
    return defaultValue;
  }
  return context;
}

export { DateSettingsProvider, useDateSettings };
