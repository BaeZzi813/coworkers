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
    <main className="min-h-screen w-full">
      {isMobile && <MobileLanding />}
      {isTablet && <TabletLanding />}
      {isDesktop && <DesktopLanding />}
    </main>
  );
}
