import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/globals.css";
import { ErrorProvider } from "../contexts/errorContext";
import Toaster from "../components/toaster";
import { Suspense, useEffect } from "react";
import { StoreProvider } from "../contexts/storeContext";
import Container from "../components/Container";
import Navbar from "../components/NavigationBar";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";

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
            <AnimatePresence mode="wait" initial={false}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AnimatePresence>
          </ErrorProvider>
        </Container>
      </StoreProvider>
    </div>
  );
}

export default MyApp;
