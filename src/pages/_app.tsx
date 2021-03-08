import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  colors: {
    brand: {
      background: '#f2f3f5',
      grayLine: '#dcdde0',
      text: '#666666',
      textHighlight: '#b3b9ff',
      title: '#2e384d',

      red: '#e83f5b',
      green: '#4cd62b',
      blue100: '#b3b9ff',
      blue200: '#5965e0',
      blue300: '#4953b8',
      gray100: '#f0f1f3',
      white: '#ffffff',
    },
  },
  styles: {
    global: {
      'html, body': {
        margin: '0',
        padding: '0',
        width: '100vw',
        height: '100vh',
      },
    },
  },
  breakpoints: createBreakpoints({
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }),
});

// import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
