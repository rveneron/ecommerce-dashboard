import { memo } from 'react';
import { AppProvider } from 'contexts/AppProvider';
import SettingsProvider from 'contexts/SettingsProvider';
import { BrowserRouter } from 'react-router-dom';
import { ChildrenProps } from '@dfl/mui-react-common';
import { I18Provider } from 'contexts/I18Context';
import DateProvider from 'contexts/DateProvider';

const MainProvider = ({ children }: ChildrenProps) => {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <I18Provider>
          <DateProvider>
            <AppProvider>{children}</AppProvider>
          </DateProvider>
        </I18Provider>
      </BrowserRouter>
    </SettingsProvider>
  );
};

export default memo(MainProvider);
