import "./App.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
// import AnimatedRoutes from "./router/AnimatedRoutes";
import { Provider } from "react-redux";
import { store } from "./store";
import "./services/translations";

import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";

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
        <HelmetProvider context={helmetContext}>
          <RouterProvider router={router} />
        </HelmetProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
