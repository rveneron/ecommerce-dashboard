import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppProvider } from './context/AppProvider';
import { MainLayout } from './layout';
import Dashboard from 'components/Dashboard';

const App = () => {
  return (
    <AppProvider>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </AppProvider>
  );
};

export default App;
