import { Toaster } from 'react-hot-toast';
import { CssBaseline, ThemeProvider } from '@mui/material';
import QueryProvider from 'context/QueryContext';
import { ChildrenProps } from '../types/children-props';
import { toasterOptions } from 'constants/toasterOptions';
import { theme } from 'constants/theme';

type AppContentProps = {
  children: any;
};

const AppContent = ({ children }: AppContentProps) => {
  return (
    <>
      {children}
      <CssBaseline />
      <Toaster toastOptions={toasterOptions} />
    </>
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
