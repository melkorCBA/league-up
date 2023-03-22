import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { ErrorProvider } from "../contexts/errorContext";
import Toaster from "../components/toaster";
import Navbar from "../components/navbar";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle");
  }, []);
  return (
    <div>
      <ErrorProvider>
        <Toaster />
        <Navbar />
        <Component {...pageProps} />
      </ErrorProvider>
    </div>
  );
}

export default MyApp;
