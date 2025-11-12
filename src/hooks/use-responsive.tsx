import { BREAKPOINT_QUERY_STRING } from "@/constants/breakpoint";
import { useIsClient } from "@uidotdev/usehooks";
import { useMediaQuery } from "react-responsive";

export function useResponsive() {
  const isMobile = useMediaQuery({ query: BREAKPOINT_QUERY_STRING.mobile });
  const isTablet = useMediaQuery({ query: BREAKPOINT_QUERY_STRING.tablet });
  const isDesktop = useMediaQuery({ query: BREAKPOINT_QUERY_STRING.desktop });

  const isClient = useIsClient();
  if (!isClient) {
    return { isMobile: false, isTablet: false, isDesktop: false };
  }

  return { isMobile, isTablet, isDesktop };
}
