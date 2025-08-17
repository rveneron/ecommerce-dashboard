import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ApiClientService, DefaultTokenService } from '@dfl/react-security';
import Routes from 'routes';

ApiClientService.setup({
  TokenService: DefaultTokenService,
});

function App () {
  return <Routes />;
}

export default App;
