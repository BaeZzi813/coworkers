import { postRefreshToken } from "@/features/auth/apis";
import { GSSP_LOGIN_REDIRECT_RETURN } from "@/libs/ssr/gssp-return";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { JSX } from "react";
import { useUpdateAccessToken } from "./use-update-access-token";

type Props<Data> = Data & { accessToken: string };

export function gsspWithAuth<Data>(
  getServerSidePropsFunc: (
    context: GetServerSidePropsContext,
    accessToken: string
  ) =>
    | GetServerSidePropsResult<Props<Data>>
    | Promise<GetServerSidePropsResult<Props<Data>>>
) {
  return async (context: GetServerSidePropsContext) => {
    const refreshToken = context.req.cookies.refreshToken;
    if (!refreshToken) {
      return GSSP_LOGIN_REDIRECT_RETURN;
    }

    const accessToken = await postRefreshToken(refreshToken, { ssr: true });
    return getServerSidePropsFunc(context, accessToken);
  };
}

export function serverSideComponentWithAuth<Data>(
  Component: (props: Props<Data>) => JSX.Element
) {
  return (props: Props<Data>) => {
    const { accessToken } = props;
    useUpdateAccessToken(accessToken);
    return Component(props);
  };
}
