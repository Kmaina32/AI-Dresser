import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css'; // Assuming you have a global stylesheet

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;