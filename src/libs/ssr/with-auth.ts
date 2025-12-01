import { postRefreshToken } from "@/features/auth/apis";
import { createExpiredCookie } from "@/features/auth/utils/cookie";
import { GSSP_LOGIN_REDIRECT_RETURN } from "@/libs/ssr/gssp-return";
import { DehydratedState } from "@tanstack/react-query";
import { AxiosError } from "axios";
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
    | Promise<GetServerSidePropsResult<DehydratedState>>
) {
  return async (context: GetServerSidePropsContext) => {
    const refreshToken = context.req.cookies.refreshToken;
    if (!refreshToken) {
      return GSSP_LOGIN_REDIRECT_RETURN;
    }

    try {
      const accessToken = await postRefreshToken(refreshToken, { ssr: true });
      return getServerSidePropsFunc(context, accessToken);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        const expiredCookie = createExpiredCookie({ name: "refreshToken" });
        context.res.setHeader("Set-Cookie", expiredCookie);
        return GSSP_LOGIN_REDIRECT_RETURN;
      }

      throw error;
    }
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
