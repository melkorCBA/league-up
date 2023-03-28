import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { ErrorProvider } from "../contexts/errorContext";
import Toaster from "../components/toaster";
import { useEffect } from "react";
import { StoreProvider } from "../contexts/storeContext";
import Container from "../components/Container";
import Navbar from "../components/NavigationBar";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <div>
      <StoreProvider>
        <Container>
          <ErrorProvider>
            <Toaster />
            <Navbar />
            <Component {...pageProps} />
          </ErrorProvider>
        </Container>
      </StoreProvider>
    </div>
  );
}

export default MyApp;
