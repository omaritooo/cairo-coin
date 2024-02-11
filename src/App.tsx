import "./App.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
// import AnimatedRoutes from "./router/AnimatedRoutes";
import { Provider } from "react-redux";
import "./services/translations";
import { persistor, store } from "./store";

import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";

const helmetContext = {};

const queryClient = new QueryClient();
const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider context={helmetContext}>
            <RouterProvider router={router} />
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
