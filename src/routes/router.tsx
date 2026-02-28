import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { ROUTES } from "./path.route";
const PublicLayout = lazy(() => import("../layout/PublicLayout"));
const PrivateLayout = lazy(() => import("../layout/PrivateLayout"));
const RootLayout = lazy(() => import("../layout/RootLayout"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const TodayBookings = lazy(() => import("../pages/TodayBookings"));
const CompletedBookings = lazy(() => import("../pages/CompletedBookings"));
const UsersPage = lazy(() => import("../pages/UsersPage"));
const CampaignLeads = lazy(() => import("../pages/CampaignLeadsPage"));
const Bookings = lazy(() => import("../pages/BookingsPage"));
const ServicesPage = lazy(() => import("../pages/ServicesPage"));
const ServicesFormPage = lazy(() => import("../pages/ServiceFormPage"));
const WhatsappBot = lazy(() => import("../pages/WhatsappBotPage"));

const router = createBrowserRouter([
  {
    path: ROUTES.DASHBOARD,
    element: <RootLayout />,
    children: [
      {
        path: ROUTES.AUTHENTICATION,
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <AuthPage />,
          },
        ],
      },
      {
        path: ROUTES.DASHBOARD,
        element: <PrivateLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          { path: ROUTES.TODAY_BOOKINGS, element: <TodayBookings /> },
          { path: ROUTES.COMPLETED_BOOKINGS, element: <CompletedBookings /> },
          { path: ROUTES.USERS, element: <UsersPage /> },
          { path: ROUTES.CAMPAIGN_LEADS, element: <CampaignLeads /> },
          { path: ROUTES.BOOKINGS, element: <Bookings /> },
          {
            path: ROUTES.SERVICES,
            element: <ServicesPage />,
          },
          {
            path: ROUTES.SERVICESEDIT,
            element: <ServicesFormPage />,
          },
          {
            path: ROUTES.SERVICECREATE,
            element: <ServicesFormPage />,
          },

          { path: ROUTES.CHATBOT, element: <WhatsappBot /> },
        ],
      },
    ],
  },
]);

export default router;
