import {
  Dashboard as DashboardIcon,
  Today as TodayIcon,
  CheckCircle as CheckCircleIcon,
  People as PeopleIcon,
  Campaign as CampaignIcon,
  BookOnline as BookOnlineIcon,
  MiscellaneousServices as MiscellaneousServicesIcon,
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material";
import { ROUTES } from "../routes/path.route";

export const topNavLinks = [
  { label: "Dashboard", icon: DashboardIcon, path: ROUTES.DASHBOARD },
  { label: "Today Bookings", icon: TodayIcon, path: ROUTES.TODAY_BOOKINGS },
  {
    label: "Completed",
    icon: CheckCircleIcon,
    path: ROUTES.COMPLETED_BOOKINGS,
  },
];

export const sideNavLinks = [
  { label: "Users", icon: PeopleIcon, path: ROUTES.USERS },
  { label: "Campaign Leads", icon: CampaignIcon, path: ROUTES.CAMPAIGN_LEADS },
  { label: "Bookings", icon: BookOnlineIcon, path: ROUTES.BOOKINGS },
  { label: "Services", icon: MiscellaneousServicesIcon, path: ROUTES.SERVICES },
  { label: "WhatsApp Chatbot", icon: WhatsAppIcon, path: ROUTES.CHATBOT },
];
