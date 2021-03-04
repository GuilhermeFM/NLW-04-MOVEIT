import '../styles/global.css';

import AuthenticateProvider from '../contexts/AuthenticateContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthenticateProvider>
      <Component {...pageProps} />
    </AuthenticateProvider>
  );
}

export default MyApp;
