import { createBrowserRouter } from "react-router-dom";
import { ErrorLayout } from "src/layouts/ErrorLayout";
import { MainLayout } from "src/layouts/MainLayout";
import { ConversionView } from "src/views/ConversionView";
import { HistoryView } from "src/views/HistoryView";
import { HomeView } from "src/views/HomeView";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "/conversion",
        element: <ConversionView />,
      },
      {
        path: "/history",
        element: <HistoryView />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorLayout />,
  },
]);
