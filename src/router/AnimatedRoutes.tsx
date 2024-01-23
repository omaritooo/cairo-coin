import { useLocation, Routes, Route, BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HomeView } from "src/views/HomeView";
import { ConversionView } from "src/views/ConversionView";

import { MainLayout } from "src/layouts/MainLayout";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <BrowserRouter>
        <Routes key={location.pathname} location={location}>
          <Route element={<MainLayout />}>
            <Route element={<HomeView />} path="/" />
            <Route element={<ConversionView />} path="conversion" />
          </Route>
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
