import { Desktop, Mobile, Tablet } from "@/features/landing-page";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="mx-auto h-lvh max-w-[1920px]">
        {isMobile && <Mobile />}
        {isTablet && <Tablet />}
        {isDesktop && <Desktop />}
      </div>
    </>
  );
}
