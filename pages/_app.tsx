import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

export default function App({ Component, pageProps }: AppProps<{ initialSession: Session }>) {

  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  const [timer, setTimer] = useState(0);

  const interval = 1000;

  const handleTimer = () => {
    // handle Timer is able to be called by every second
    console.log('Function called every second');
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        handleTimer();
        return prevTimer + interval;
      });
    }, interval);

    // clear timer
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
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
  )
}
