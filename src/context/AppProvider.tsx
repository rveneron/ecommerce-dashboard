import { Toaster } from 'react-hot-toast';
import { CssBaseline, ThemeProvider } from '@mui/material';
import QueryProvider from 'context/QueryContext';
import { ChildrenProps } from 'types/children-props';
import { toasterOptions } from 'constants/toasterOptions';
import { theme } from 'constants/theme';
import { DataProvider } from './DataContext';

type AppContentProps = {
  children: any;
};

const AppContent = ({ children }: AppContentProps) => {
  return (
    <DataProvider>
      {children}
      <CssBaseline />
      <Toaster toastOptions={toasterOptions} />
    </DataProvider>
  );
};

export const AppProvider = ({ children }: ChildrenProps) => {
  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <AppContent>{children}</AppContent>
      </ThemeProvider>
    </QueryProvider>
  );
};
