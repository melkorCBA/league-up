import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { ErrorProvider } from "../contexts/errorContext";
import Toaster from "../components/toaster";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useStore, StoreProvider, ACTIONS } from "../contexts/storeContext";
import useUser from "../hooks/useUser";
import { userService } from "../services/api-service";
import Container from "../components/Container";

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
