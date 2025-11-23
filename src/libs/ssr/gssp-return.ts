import { GetServerSidePropsResult } from "next";

export const GSSP_LOGIN_REDIRECT_RETURN = {
  redirect: { destination: "/login", permanent: false },
} as const;

export const GSSP_NOT_FOUND_RETURN = {
  notFound: true,
} as const;

export function gsspPropsWithTokenReturn<Props>(
  props: Props,
  accessToken: string
): GetServerSidePropsResult<Props & { accessToken: string }> {
  return {
    props: { ...props, accessToken },
  } as const;
}
