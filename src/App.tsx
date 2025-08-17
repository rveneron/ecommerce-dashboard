import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppProvider } from './context/AppProvider';
import { MainLayout } from './layout';

function App () {
  return (
    <AppProvider>
      <MainLayout>Contenido</MainLayout>
    </AppProvider>
  );
}

export default App;
