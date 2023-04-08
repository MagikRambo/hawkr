import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { QueryClientProvider, QueryClient } from 'react-query'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session, useUser } from '@supabase/auth-helpers-react'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps<{initialSession: Session}>) {
  
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  const MINUTE_MS =  15 * 60000;
  
  useEffect(() => {
    const interval = setInterval( () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        // Activate button when geolocation has finished
        // Call the callback function
        
        const userPosition = {lat: position.coords.latitude, lng: position.coords.longitude}

        //get user
        const res_user = await supabaseClient.auth.getUser()
        const userID = res_user.data.user?.id

        //update db only if vendor has active shop
        const {data:openTrackedShops, error:openShopsError} = await supabaseClient
        .from('shops')
        .select('*')
        .match(
        {
          vendorID: userID,
          open: true,
          liveTracking: true
        })

        //update locations db
        if(openTrackedShops && openTrackedShops["length"] > 0){

          const { data, error } = await supabaseClient
          .from('locations')
          .update({ UUID: userID, location: userPosition })      
          .match({UUID: userID})
        }

        // console.log('Logs every minute');
        // console.log(userPosition)
        // console.log(openShops)
        // // console.log(user)
        // console.log(res_user.data.user?.id)
      })

    }, MINUTE_MS);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])




  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}
