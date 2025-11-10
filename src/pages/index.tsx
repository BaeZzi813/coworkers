import {
  DesktopLanding,
  MobileLanding,
  TabletLanding,
} from "@/features/landing-page";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 744 });
  const isTablet = useMediaQuery({ minWidth: 745, maxWidth: 1199 });
  const isDesktop = useMediaQuery({ minWidth: 1200 });

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="mx-auto h-lvh max-w-[1920px]">
        {isMobile && <MobileLanding />}
        {isTablet && <TabletLanding />}
        {isDesktop && <DesktopLanding />}
      </div>
    </>
  );
}
