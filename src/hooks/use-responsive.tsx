import { BREAKPOINT_QUERY_STRING } from "@/constants/breakpoint";
import { useIsClient } from "@uidotdev/usehooks";
import { useMediaQuery } from "react-responsive";

interface Props {
  onMobile?: (isMobile: boolean) => void;
  onTablet?: (isMobile: boolean) => void;
  onDesktop?: (isMobile: boolean) => void;
}

export function useResponsive({ onMobile, onTablet, onDesktop }: Props = {}) {
  const isMobile = useMediaQuery(
    { query: BREAKPOINT_QUERY_STRING.mobile },
    undefined,
    onMobile
  );
  const isTablet = useMediaQuery(
    { query: BREAKPOINT_QUERY_STRING.tablet },
    undefined,
    onTablet
  );
  const isDesktop = useMediaQuery(
    { query: BREAKPOINT_QUERY_STRING.desktop },
    undefined,
    onDesktop
  );

  const isClient = useIsClient();
  if (!isClient) {
    return { isMobile: false, isTablet: false, isDesktop: false };
  }

  return { isMobile, isTablet, isDesktop };
}
