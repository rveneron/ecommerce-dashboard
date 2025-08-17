import { memo } from 'react';
import { AppProvider } from 'context/AppProvider';
import { I18Provider } from 'context/I18Context';
import DateProvider from 'context/DateProvider';
import { ChildrenProps } from 'types/children-props';

const MainProvider = ({ children }: ChildrenProps) => {
  return (
    <I18Provider>
      <DateProvider>
        <AppProvider>{children}</AppProvider>
      </DateProvider>
    </I18Provider>
  );
};

export default memo(MainProvider);
