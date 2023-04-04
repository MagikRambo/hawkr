import type { NextPage } from 'next'
import { Auth, ThemeSupa, ThemeMinimal } from '@supabase/auth-ui-react'
import { SupabaseClient, useSession, useSessionContext, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import styles from '../styles/supabasestyling.module.css'
import Image from 'next/image'
import hawkr from '../public/img/hawkr.png'
import hawkr_pic from '../public/img/hawkr_pic.svg'
import { useEffect, useState } from 'react'
import { stat } from 'fs'
// import {supabase} from '../utils/supabaseClient'
import { useRouter } from 'next/router'



const login: NextPage = () => {


    const { isLoading, session, error } = useSessionContext();
    const supabase = useSupabaseClient();
    console.log("isLoading: ", isLoading, "sessionTHING: ", session, "error: ", error)

    // const supabase = useSupabaseClient()
    const user = useUser()
    console.log("USER FROM AUTH UI: ", user)


    // const [asession, setCurSession] = useState(false);
    // const [dataV, setDataV] = useState<any>()
    
    // useEffect(() => {

    //   const getSession = async () => {
    //     const { data, error } = await supabase.auth.getSession()
        
    //     if(data){
    //       console.log("USE STATE DATA: ",data)
    //       setDataV(data.session)
    //       // setCurSession(true)
    //     }

    //   }
    //   getSession()
    // }, [])

    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [triggerStatus, setTriggerStatus] = useState(false);
    const router = useRouter()

    
    if (session){
      router.push('/profile')
    }

    // console.log(session)
    return (
      <>
        <div className='bg-sky-50' style={{ padding: '50px 0 100px 0' }}>
          {!session &&
            (
            <div className='sm:grid sm:grid-cols-2 '>
              {/*  GRID LAYOUT */}

              {/* Column 1 - Image*/}
                <div className='border-r border-r-slate-700 m-5 sm:block hidden'>
                  <div className='h-screen flex justify-center items-center'>
                    {/* <h2 className='text-black'> THIS IS LEFT</h2> */}
                    <Image width={800} height={800} alt="hawkr logo" src={hawkr_pic} className='p-5'/>
                  </div>
                </div>
              {/* Column 2 - Email form */}

              <div className=''>
                <div className="flex-col p-5 sm:p-5 sm:pt-44 md:w-full lg:w-[36rem] xl:w-[44rem] justify-start items-start text-black ">
                  {/* Sign up segment and text */}
                  <h2 className='text-black md:text-4xl pb-5'> Welcome!</h2>
                  <div className='flex md:text-xl pl-5 pb-8 text-slate-500'>
                  <p>You can reach us any time via  <span className='pl-1 text-sky-700'> help@hawkr.com</span></p>
                  </div>

                    <Auth
                    redirectTo="/explore"
                    // providers={['github', 'google', 'apple']} 
                    appearance={{ theme: ThemeSupa }}
                    supabaseClient={supabase} theme="dark" />
                </div>
                  
                </div>
            </div>)}
        </div>
      </>
    )
}

export default login