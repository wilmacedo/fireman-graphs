import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/global';
import Router from './routes';
import { CarProvider } from './contexts/Car';

const App = () => {
  return (
    <CarProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </CarProvider>
  );
};

export default App;
