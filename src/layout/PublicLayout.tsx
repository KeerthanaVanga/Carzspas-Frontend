import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../hooks/useAuth";
import { ROUTES } from "../routes/path.route";
import FullScreenLoader from "../components/ui/FullScreenLoader";
import logo from "../assets/carzspas.png";

const PublicLayout = () => {
  const { data, isLoading } = useMe();

  if (isLoading) return <FullScreenLoader imageSrc={logo} />;

  if (data?.isLoggedIn === true) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return <Outlet />;
};

export default PublicLayout;
