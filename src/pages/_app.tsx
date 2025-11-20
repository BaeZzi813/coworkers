import RootLayout from "@/layouts/RootLayout";
import AuthProvider from "@/providers/AuthProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "@/styles/globals.css";
import "@/styles/tailwind.css";
import { DehydratedState } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { OverlayProvider } from "overlay-kit";
import { PropsWithChildren } from "react";

function Providers({
  reactQueryState,
  children,
}: PropsWithChildren<{ reactQueryState: DehydratedState }>) {
  return (
    <AuthProvider>
      <ReactQueryProvider dehydratedState={reactQueryState}>
        <OverlayProvider>{children}</OverlayProvider>
      </ReactQueryProvider>
    </AuthProvider>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers reactQueryState={pageProps.dehydratedState}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </Providers>
  );
}
