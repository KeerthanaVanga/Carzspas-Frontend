import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Campaign as CampaignIcon,
  BookOnline as BookOnlineIcon,
  MiscellaneousServices as MiscellaneousServicesIcon,
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material";
import { ROUTES } from "../routes/path.route";

export const sideNavLinks = [
  { label: "Dashboard", icon: DashboardIcon, path: ROUTES.DASHBOARD },
  { label: "Users", icon: PeopleIcon, path: ROUTES.USERS },
  { label: "Campaign Leads", icon: CampaignIcon, path: ROUTES.CAMPAIGN_LEADS },
  { label: "Bookings", icon: BookOnlineIcon, path: ROUTES.BOOKINGS },
  { label: "Services", icon: MiscellaneousServicesIcon, path: ROUTES.SERVICES },
  { label: "WhatsApp Chatbot", icon: WhatsAppIcon, path: ROUTES.CHATBOT },
];
