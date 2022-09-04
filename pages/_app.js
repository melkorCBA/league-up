import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { ErrorProvider } from "../contexts/errorContext";
import Toaster from "../components/toaster";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ErrorProvider>
        <Toaster />
        <Component {...pageProps} />
      </ErrorProvider>
    </div>
  );
}

export default MyApp;
