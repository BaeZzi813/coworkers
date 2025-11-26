import { DehydratedState } from "@tanstack/react-query";
import { GetServerSidePropsResult } from "next";

export const GSSP_LOGIN_REDIRECT_RETURN = {
  redirect: { destination: "/login", permanent: false },
} as const;

export const GSSP_NOT_FOUND_RETURN = {
  notFound: true,
} as const;

interface GSSPPropsWithTokenReturnProps<Props> {
  props?: Props;
  accessToken: string;
  dehydratedState?: DehydratedState | null;
}

type GSSPPropsWithTokenReturnResult<Props> = GetServerSidePropsResult<
  Props & { accessToken: string }
>;

export function gsspPropsWithTokenReturn<Props>({
  props = {} as Props,
  accessToken,
  dehydratedState = null,
}: GSSPPropsWithTokenReturnProps<Props>): GSSPPropsWithTokenReturnResult<Props> {
  return {
    props: { ...props, accessToken, dehydratedState },
  } as const;
}
