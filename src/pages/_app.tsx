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
    <ReactQueryProvider dehydratedState={reactQueryState}>
      <OverlayProvider>{children}</OverlayProvider>
    </ReactQueryProvider>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers reactQueryState={pageProps.dehydratedState}>
      <Component {...pageProps} />
    </Providers>
  );
}
