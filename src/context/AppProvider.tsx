import { Toaster } from 'react-hot-toast';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ChildrenProps, toasterOptions } from '@dfl/mui-react-common';
import { useSettings } from 'contexts/SettingsProvider';
import QueryProvider from 'contexts/QueryContext';
import { AuthControl, SecurityProvider, useUser } from '@dfl/react-security';
// import { TourProviderCustom as TourProvider } from './TourProvider';

type AppContentProps = {
  children: any;
};

const AppContent = ({ children }: AppContentProps) => {
  return (
    <>
      <AuthControl />
      {children}

      <CssBaseline />
      <Toaster toastOptions={toasterOptions} />
    </>
  );
};

export const AppProvider = ({ children }: ChildrenProps) => {
  const { theme } = useSettings(); // App theme
  const { user } = useUser();

  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        {/*   <TourProvider> */}
        <SecurityProvider useMe={user}>
          <AppContent>{children}</AppContent>
        </SecurityProvider>
        {/* </TourProvider> */}
      </ThemeProvider>
    </QueryProvider>
  );
};
