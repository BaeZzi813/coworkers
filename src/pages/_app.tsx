import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
      <Component {...pageProps} />
    </ReactQueryProvider>
  );
}
