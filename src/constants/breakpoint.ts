export const BREAKPOINT = {
  mobile: 375,
  tablet: 745,
  desktop: 1024,
} as const;

export const BREAKPOINT_QUERY_STRING = {
  mobile: `(max-width: ${BREAKPOINT.tablet - 1}px)`,
  tablet: `(min-width: ${BREAKPOINT.tablet}px) and (max-width: ${
    BREAKPOINT.desktop - 1
  }px)`,
  desktop: `(min-width: ${BREAKPOINT.desktop}px)`,
};
