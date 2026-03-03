import { Suspense, type ReactNode } from "react";
import FullScreenLoader from "./FullScreenLoader";
import logo from "../../assets/carzspas.png";
interface Props {
  children: ReactNode;
}

export default function AppSuspense({ children }: Props) {
  return (
    <Suspense fallback={<FullScreenLoader imageSrc={logo} />}>
      {children}
    </Suspense>
  );
}
