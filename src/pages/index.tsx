import {
  DesktopLanding,
  MobileLanding,
  TabletLanding,
} from "@/features/landing-page";
import { useResponsive } from "@/hooks/use-responsive";

export default function Home() {
<<<<<<< HEAD
  return <h1 className="text-4xl text-red-500">Home</h1>;
=======
  const { isMobile, isTablet, isDesktop } = useResponsive();

  if (!isMobile && !isTablet && !isDesktop) return null;

  return (
    <div className="w-full">
      {isMobile && <MobileLanding />}
      {isTablet && <TabletLanding />}
      {isDesktop && <DesktopLanding />}
    </div>
  );
>>>>>>> 3e705de882c5385d87adc75bc127bd73d48a371e
}
