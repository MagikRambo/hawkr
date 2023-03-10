import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

export default function App({ Component, pageProps }: AppProps<{initialSession: Session}>) {
  
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  
  return (
    <SessionContextProvider
    supabaseClient={supabaseClient}
    initialSession={pageProps.initialSession}
    >
    <div>
      <Navbar/>
      <Component {...pageProps} />
      <Footer />
    </div>
    </SessionContextProvider>
  )
}
