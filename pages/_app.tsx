import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  Session,
  useUser,
} from "@supabase/auth-helpers-react";
import { useState } from "react";


export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const queryClient = new QueryClient();

  

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <div>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
      </SessionContextProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}