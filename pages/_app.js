import { StackProvider } from "@stackframe/stack";
import '../styles/globals.css'; // Assuming you have a global stylesheet

function MyApp({ Component, pageProps }) {
  return (
    <StackProvider>
      <Component {...pageProps} />
    </StackProvider>
  );
}

export default MyApp;