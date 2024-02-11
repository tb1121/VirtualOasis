import { createGlobalStyle, ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import { AuthProvider } from '../../components/AuthContext';
import vaporTeal from 'react95/dist/themes/vaporTeal';

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={vaporTeal}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
