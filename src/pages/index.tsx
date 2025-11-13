import {
  DesktopLanding,
  MobileLanding,
  TabletLanding,
} from "@/features/landing-page";
import { useResponsive } from "@/hooks/use-responsive";

export default function Home() {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  if (!isMobile && !isTablet && !isDesktop) return null;

  return (
    <div className="w-full">
      {isMobile && <MobileLanding />}
      {isTablet && <TabletLanding />}
      {isDesktop && <DesktopLanding />}
    </div>
  );
}
