import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import ExploreMenu from '../components/exploreMenu';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useUser, useSession, useSupabaseClient, SessionContextProvider, Session } from '@supabase/auth-helpers-react'

import TypesMenu from '../components/typesMenu'

export default function App({ Component, pageProps }: AppProps<{initialSession: Session}>) {
  
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  const [exploreOpen, setExploreOpen] = useState(false)
  const [typesOpen, setTypesOpen] = useState(false)
  const [currIdx, setCurIdx] = useState(0)

  const session = useSession()

  const setOpen = (o: boolean, idx:number) => {
    if(idx == 1){
      setExploreOpen(o)
      setCurIdx(idx)
    } 
    else if (idx == 2){
      setTypesOpen(o)
      setCurIdx(idx)
    }
    else{
      setExploreOpen(false)
      setTypesOpen(false)
      setCurIdx(0)
      }
    }

  return (
    <SessionContextProvider
    supabaseClient={supabaseClient}
    initialSession={pageProps.initialSession}
    >
    <div>
      <Navbar handleOpen={setOpen} curr_idx = {currIdx} session={session}/>
      <ExploreMenu handleOpen={setOpen} open={exploreOpen} />
      <TypesMenu handleOpen={setOpen} open={typesOpen} />
      <Component {...pageProps} />
      <Footer />
    </div>
    </SessionContextProvider>
  )
}
